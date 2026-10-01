import { useState, useEffect, useRef, useCallback } from 'react';

export function useSkyEngine() {
  const [mode, setModeState] = useState('auto');
  const [customMinute, setCustomMinute] = useState(720);
  const [currentMinute, setCurrentMinute] = useState(720);
  const [theme, setTheme] = useState('day');
  const [phaseName, setPhaseName] = useState('Dia Ensolarado');
  const [iconClass, setIconClass] = useState('fa-sun');
  const [sunPos, setSunPos] = useState({ left: '50%', top: '150%', opacity: 0, transform: 'translate(-50%, -50%) rotate(0deg)' });
  const [moonPos, setMoonPos] = useState({ left: '50%', top: '150%', opacity: 0, transform: 'translate(-50%, -50%) rotate(0deg)' });

  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, lastMove: 0 });
  const animFrameRef = useRef(null);
  const themeRef = useRef(theme);
  const starRotationRef = useRef(0);
  const isScrollingRef = useRef(false);

  themeRef.current = theme;

  const getEffectiveMinute = useCallback((mMode, mCustomMin) => {
    if (mMode === 'auto') {
      const now = new Date();
      return now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    } else if (mMode === 'day') {
      return 720;
    } else if (mMode === 'night') {
      return 0;
    }
    return mCustomMin;
  }, []);

  const updateSkyState = useCallback((effectiveMin, currentMode) => {
    let newTheme = 'day';
    let newPhaseName = 'Dia Pleno';
    let newIcon = 'fa-sun';

    if (effectiveMin >= 300 && effectiveMin < 420) {
      newTheme = 'sunrise';
      newPhaseName = 'Amanhecer Radiante';
      newIcon = 'fa-cloud-sun';
    } else if (effectiveMin >= 420 && effectiveMin < 1050) {
      newTheme = 'day';
      newPhaseName = 'Dia Ensolarado';
      newIcon = 'fa-sun';
    } else if (effectiveMin >= 1050 && effectiveMin < 1170) {
      newTheme = 'sunset';
      newPhaseName = 'Pôr do Sol Dourado';
      newIcon = 'fa-cloud-sun';
    } else {
      newTheme = 'night';
      newPhaseName = 'Noite Estrelada';
      newIcon = 'fa-moon';
    }

    setTheme(newTheme);
    setPhaseName(newPhaseName);
    setIconClass(newIcon);
    setCurrentMinute(effectiveMin);

    document.body.classList.remove('theme-day', 'theme-sunset', 'theme-night', 'theme-sunrise');
    document.body.classList.add(`theme-${newTheme}`);

    const width = window.innerWidth || 1200;
    const height = window.innerHeight || 800;

    // Clockwise parabolic Sun trajectory
    const sunStart = 330;
    const sunEnd = 1110;
    const sunSpan = sunEnd - sunStart;

    if (effectiveMin >= sunStart && effectiveMin <= sunEnd) {
      const sunProgress = (effectiveMin - sunStart) / sunSpan; // 0 to 1
      const sunX = width * (0.08 + 0.84 * sunProgress);
      const arcFactor = Math.sin(sunProgress * Math.PI);
      const sunY = (height * 0.85) - (arcFactor * (height * 0.65));
      const rotDeg = (sunProgress - 0.5) * 60; // Smooth clockwise rotation as sun travels

      setSunPos({
        left: `${sunX}px`,
        top: `${sunY}px`,
        opacity: Math.min(1, arcFactor * 2.5),
        transform: `translate(-50%, -50%) rotate(${rotDeg}deg)`
      });
    } else {
      setSunPos({ left: '50%', top: `${height + 150}px`, opacity: 0, transform: 'translate(-50%, -50%) rotate(0deg)' });
    }

    // Clockwise parabolic Moon trajectory
    let moonProgress = -1;
    if (effectiveMin >= 1050) {
      moonProgress = (effectiveMin - 1050) / 780;
    } else if (effectiveMin <= 390) {
      moonProgress = (effectiveMin + (1440 - 1050)) / 780;
    }

    if (moonProgress >= 0 && moonProgress <= 1) {
      const moonX = width * (0.08 + 0.84 * moonProgress);
      const arcFactor = Math.sin(moonProgress * Math.PI);
      const moonY = (height * 0.85) - (arcFactor * (height * 0.65));
      const rotDeg = (moonProgress - 0.5) * 60;

      setMoonPos({
        left: `${moonX}px`,
        top: `${moonY}px`,
        opacity: Math.min(1, arcFactor * 2.2),
        transform: `translate(-50%, -50%) rotate(${rotDeg}deg)`
      });
    } else {
      setMoonPos({ left: '50%', top: `${height + 150}px`, opacity: 0, transform: 'translate(-50%, -50%) rotate(0deg)' });
    }
  }, []);

  const createStars = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    const stars = [];

    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.85,
        radius: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.7 + 0.3,
        alpha: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: Math.random() > 0.8 ? '#93c5fd' : (Math.random() > 0.6 ? '#fef08a' : '#ffffff'),
        layer: Math.random() * 0.3 + 0.1
      });
    }
    starsRef.current = stars;
  }, []);

  const spawnShootingStar = useCallback(() => {
    const canvas = canvasRef.current;
    const currentT = themeRef.current;
    if (!canvas || (currentT !== 'night' && currentT !== 'sunset')) return;
    if (shootingStarsRef.current.length >= 1) return;

    const startX = Math.random() * (canvas.width * 0.8) + (canvas.width * 0.1);
    const startY = Math.random() * (canvas.height * 0.35);
    const angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1);
    const speed = Math.random() * 6 + 10;

    shootingStarsRef.current.push({
      x: startX,
      y: startY,
      speed,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      opacity: 1,
      decay: 0.025
    });
  }, []);

  useEffect(() => {
    let resizeTimer = null;
    let scrollTimer = null;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
          createStars();
        }
      }, 250);
    };

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - mouseRef.current.lastMove < 40) return;
      mouseRef.current.lastMove = now;
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 14;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 14;
    };

    const handleScroll = () => {
      isScrollingRef.current = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    createStars();

    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.5) spawnShootingStar();
    }, 6000);

    const loop = () => {
      if (!isScrollingRef.current) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

        starRotationRef.current += 0.00015;

        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const isDarkSky = themeRef.current === 'night' || themeRef.current === 'sunset' || themeRef.current === 'sunrise';

          if (!isDarkSky && shootingStarsRef.current.length === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(starRotationRef.current);
            ctx.translate(-cx, -cy);

            const groups = { '#ffffff': [], '#93c5fd': [], '#fef08a': [] };
            starsRef.current.forEach(star => {
              star.alpha += star.twinkleSpeed;
              if (star.alpha > 1 || star.alpha < 0.2) star.twinkleSpeed = -star.twinkleSpeed;
              if (groups[star.color]) groups[star.color].push(star);
            });

            for (const [color, list] of Object.entries(groups)) {
              if (!list.length) continue;
              ctx.fillStyle = color;
              list.forEach(star => {
                const alpha = Math.max(0.15, Math.min(1, star.alpha * star.baseAlpha));
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(
                  star.x + mouseRef.current.x * star.layer,
                  star.y + mouseRef.current.y * star.layer,
                  star.radius, 0, Math.PI * 2
                );
                ctx.fill();
              });
            }

            ctx.restore();

            for (let j = shootingStarsRef.current.length - 1; j >= 0; j--) {
              const s = shootingStarsRef.current[j];
              ctx.save();
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity})`;
              ctx.lineWidth = 1.8;
              ctx.moveTo(s.x, s.y);
              ctx.lineTo(s.x - s.dx * 2.5, s.y - s.dy * 2.5);
              ctx.stroke();
              ctx.restore();

              s.x += s.dx;
              s.y += s.dy;
              s.opacity -= s.decay;

              if (s.opacity <= 0 || s.x > canvas.width || s.y > canvas.height) {
                shootingStarsRef.current.splice(j, 1);
              }
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    loop();

    const handleVisibility = () => {
      if (document.hidden) {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      } else {
        loop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      clearInterval(shootingStarInterval);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [createStars, spawnShootingStar]);

  useEffect(() => {
    const minute = getEffectiveMinute(mode, customMinute);
    updateSkyState(minute, mode);

    const timer = setInterval(() => {
      if (mode === 'auto') {
        const m = getEffectiveMinute('auto', customMinute);
        updateSkyState(m, 'auto');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, customMinute, getEffectiveMinute, updateSkyState]);

  const setMode = useCallback((newMode, minuteVal = null) => {
    setModeState(newMode);
    if (minuteVal !== null) {
      setCustomMinute(minuteVal);
    }
    const m = getEffectiveMinute(newMode, minuteVal !== null ? minuteVal : customMinute);
    updateSkyState(m, newMode);
  }, [customMinute, getEffectiveMinute, updateSkyState]);

  const formattedTime = `${String(Math.floor(currentMinute / 60)).padStart(2, '0')}:${String(Math.floor(currentMinute % 60)).padStart(2, '0')}`;

  return {
    mode,
    setMode,
    theme,
    phaseName,
    iconClass,
    currentMinute,
    formattedTime,
    sunPos,
    moonPos,
    canvasRef
  };
}
