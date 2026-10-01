/**
 * ============================================================================
 * CELESTIAL SKY ENGINE - JAVASCRIPT
 * Real-time Day/Night calculation, Sun & Moon orbit trajectory,
 * Canvas Starfield with Twinkle Physics, and Shooting Stars.
 * ============================================================================
 */

class SkyEngine {
  constructor() {
    this.body = document.body;
    this.sunEl = document.getElementById('sun-body');
    this.moonEl = document.getElementById('moon-body');
    this.statusIcon = document.getElementById('status-icon');
    this.statusText = document.getElementById('status-text');
    this.heroStatusMessage = document.getElementById('hero-status-message');
    this.footerSkyBadge = document.getElementById('footer-sky-badge');
    
    // Canvas setup for night stars & shooting stars
    this.canvas = document.getElementById('stars-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.stars = [];
    this.shootingStars = [];
    this.starCount = 120; // reduced from 180 for performance
    this.animationFrameId = null;
    this._resizeTimer = null;
    this._lastMouseMove = 0;

    // Mode state: 'auto' (real-time), 'day' (manual day), 'night' (manual night), 'custom' (slider)
    this.mode = 'auto';
    this.currentMinute = 0; // 0 to 1439 minutes in 24h
    
    // Parallax mouse offsets
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    this.init();
  }

  init() {
    this.setupCanvas();
    this.createStars();
    this.bindEvents();
    this.update();
    this.startLoop();
  }

  setupCanvas() {
    if (!this.canvas) return;
    this.resizeCanvas();
    // Debounced resize — avoid thrashing on every pixel
    window.addEventListener('resize', () => {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(() => {
        this.resizeCanvas();
        this.createStars();
      }, 200);
    });
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createStars() {
    if (!this.canvas) return;
    this.stars = [];
    const w = this.canvas.width;
    const h = this.canvas.height;

    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.85, // mostly upper 85% of sky
        radius: Math.random() * 1.6 + 0.4,
        baseAlpha: Math.random() * 0.7 + 0.3,
        alpha: Math.random(),
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        color: Math.random() > 0.8 ? '#93c5fd' : (Math.random() > 0.6 ? '#fef08a' : '#ffffff'),
        layer: Math.random() * 0.4 + 0.1 // parallax depth
      });
    }
  }

  spawnShootingStar() {
    if (!this.canvas || (this.currentTheme !== 'night' && this.currentTheme !== 'sunset')) return;
    
    // Limit active shooting stars to 2
    if (this.shootingStars.length >= 2) return;

    const startX = Math.random() * (this.canvas.width * 0.8) + (this.canvas.width * 0.1);
    const startY = Math.random() * (this.canvas.height * 0.35);
    const length = Math.random() * 80 + 70;
    const angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1); // ~45 degrees diagonal
    const speed = Math.random() * 8 + 12;

    this.shootingStars.push({
      x: startX,
      y: startY,
      length: length,
      speed: speed,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      opacity: 1,
      decay: Math.random() * 0.02 + 0.015
    });
  }

  bindEvents() {
    // Throttled mouse parallax — max 30 updates/sec
    window.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - this._lastMouseMove < 33) return;
      this._lastMouseMove = now;
      this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    }, { passive: true });

    // Real-time interval ticker
    setInterval(() => {
      if (this.mode === 'auto') {
        this.update();
      }
    }, 1000);

    // Random shooting star interval
    setInterval(() => {
      if (Math.random() > 0.4) {
        this.spawnShootingStar();
      }
    }, 4500);

    // Pause rAF loop when tab is hidden to save CPU
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }
      } else {
        if (!this.animationFrameId) this.startLoop();
      }
    });
  }

  /**
   * Calculate Real-world time or Manual time
   */
  getEffectiveMinute() {
    if (this.mode === 'auto') {
      const now = new Date();
      return now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    } else if (this.mode === 'day') {
      return 12 * 60; // 12:00 PM (Midday Sun)
    } else if (this.mode === 'night') {
      return 0; // 00:00 AM (Midnight Moon)
    }
    return this.currentMinute;
  }

  /**
   * Main update function to adjust Sun/Moon position, colors & status
   */
  update() {
    this.currentMinute = this.getEffectiveMinute();
    const minutes = this.currentMinute;
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    const timeFormatted = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;

    // Determine current theme phase:
    // 05:00 - 07:00 -> Sunrise (Amanhecer)
    // 07:00 - 17:30 -> Day (Dia)
    // 17:30 - 19:30 -> Sunset (Entardecer / Pôr do Sol)
    // 19:30 - 05:00 -> Night (Noite)
    let theme = 'day';
    let phaseName = 'Dia Pleno';
    let iconHtml = '<i class="fa-solid fa-sun"></i>';

    if (minutes >= 300 && minutes < 420) { // 05:00 - 07:00
      theme = 'sunrise';
      phaseName = 'Amanhecer Radiante';
      iconHtml = '<i class="fa-solid fa-cloud-sun"></i>';
    } else if (minutes >= 420 && minutes < 1050) { // 07:00 - 17:30
      theme = 'day';
      phaseName = 'Dia Ensolarado';
      iconHtml = '<i class="fa-solid fa-sun"></i>';
    } else if (minutes >= 1050 && minutes < 1170) { // 17:30 - 19:30
      theme = 'sunset';
      phaseName = 'Pôr do Sol Dourado';
      iconHtml = '<i class="fa-solid fa-cloud-sun"></i>';
    } else { // 19:30 - 05:00
      theme = 'night';
      phaseName = 'Noite Estrelada';
      iconHtml = '<i class="fa-solid fa-moon"></i>';
    }

    this.currentTheme = theme;

    // Update body theme classes
    this.body.classList.remove('theme-day', 'theme-sunset', 'theme-night', 'theme-sunrise');
    this.body.classList.add(`theme-${theme}`);

    // Update Sun & Moon Trajectory
    this.calculateCelestialPositions(minutes);

    // Update Header Pill & Badges
    if (this.statusIcon) this.statusIcon.innerHTML = iconHtml;
    
    let modeTextPrefix = this.mode === 'auto' ? 'Horário Real' : (this.mode === 'custom' ? 'Simulação' : 'Modo Fixo');
    if (this.statusText) {
      this.statusText.textContent = `${modeTextPrefix}: ${timeFormatted}`;
    }

    if (this.heroStatusMessage) {
      let heroIcon = theme === 'night' ? '<i class="fa-solid fa-moon"></i>' : (theme === 'sunset' ? '<i class="fa-solid fa-cloud-sun"></i>' : '<i class="fa-solid fa-sun"></i>');
      this.heroStatusMessage.innerHTML = `${heroIcon} Céu: ${phaseName} (${timeFormatted}) • Disponível para Projetos`;
    }

    if (this.footerSkyBadge) {
      this.footerSkyBadge.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> ${phaseName} • Sincronizado às ${timeFormatted}`;
    }

    // Dispatch event for other modules
    window.dispatchEvent(new CustomEvent('skyChange', {
      detail: { minutes, hours, mins, theme, phaseName, mode: this.mode }
    }));
  }

  /**
   * Position the Sun and Moon in a smooth parabolic arc across the viewport.
   * Sun is active from 06:00 (left horizon) to 18:00 (right horizon), zenith at 12:00.
   * Moon is active from 18:00 (left horizon) to 06:00 (right horizon), zenith at 00:00 (midnight).
   */
  calculateCelestialPositions(minutes) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. SUN TRAJECTORY (Between 05:30 and 18:30)
    // 330 mins to 1110 mins (total span: 780 mins)
    const sunStart = 330; // 05:30
    const sunEnd = 1110;  // 18:30
    const sunSpan = sunEnd - sunStart;

    if (minutes >= sunStart && minutes <= sunEnd) {
      const sunProgress = (minutes - sunStart) / sunSpan; // 0 (rise) to 1 (set)
      // Horizontal path: from 5% to 95% of screen width
      const sunX = width * (0.08 + 0.84 * sunProgress);
      // Vertical parabolic path: highest at progress = 0.5 (zenith)
      // y = baseHeight - sin(progress * PI) * arcHeight
      const arcFactor = Math.sin(sunProgress * Math.PI);
      const sunY = (height * 0.85) - (arcFactor * (height * 0.65));

      if (this.sunEl) {
        this.sunEl.style.left = `${sunX}px`;
        this.sunEl.style.top = `${sunY}px`;
        this.sunEl.style.opacity = Math.min(1, arcFactor * 2.5);
      }
    } else {
      if (this.sunEl) {
        this.sunEl.style.top = `${height + 150}px`;
        this.sunEl.style.opacity = '0';
      }
    }

    // 2. MOON TRAJECTORY (Between 17:30 and 06:30 next day)
    // Night span: 1050 mins (17:30) to 1440, then 0 to 390 (06:30) -> total 780 mins
    let moonProgress = -1;
    if (minutes >= 1050) { // 17:30 to 23:59
      moonProgress = (minutes - 1050) / 780;
    } else if (minutes <= 390) { // 00:00 to 06:30
      moonProgress = (minutes + (1440 - 1050)) / 780;
    }

    if (moonProgress >= 0 && moonProgress <= 1) {
      const moonX = width * (0.08 + 0.84 * moonProgress);
      const arcFactor = Math.sin(moonProgress * Math.PI);
      const moonY = (height * 0.85) - (arcFactor * (height * 0.65));

      if (this.moonEl) {
        this.moonEl.style.left = `${moonX}px`;
        this.moonEl.style.top = `${moonY}px`;
        this.moonEl.style.opacity = Math.min(1, arcFactor * 2.2);
      }
    } else {
      if (this.moonEl) {
        this.moonEl.style.top = `${height + 150}px`;
        this.moonEl.style.opacity = '0';
      }
    }
  }

  /**
   * Animation Loop for Stars Canvas & Smooth Parallax
   */
  startLoop() {
    const loop = () => {
      // Smooth lerp for mouse parallax
      this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
      this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

      this.renderStars();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  renderStars() {
    if (!this.ctx || !this.canvas) return;

    // Only draw stars if sky is dark — skip entirely during day
    const isDarkSky = this.currentTheme === 'night' || this.currentTheme === 'sunset' || this.currentTheme === 'sunrise';
    if (!isDarkSky) {
      // Clear canvas if transitioning out of dark sky
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Batch stars by color to minimize context state changes
    // Group: white, blue, yellow
    const groups = { '#ffffff': [], '#93c5fd': [], '#fef08a': [] };

    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.alpha += star.twinkleSpeed;
      if (star.alpha > 1 || star.alpha < 0.2) star.twinkleSpeed = -star.twinkleSpeed;
      groups[star.color].push(star);
    }

    // Draw each color group with a single shadowBlur state set
    for (const [color, starList] of Object.entries(groups)) {
      if (!starList.length) continue;
      this.ctx.save();
      this.ctx.fillStyle = color;
      this.ctx.shadowColor = color;
      this.ctx.shadowBlur = 4; // single value for all stars — GPU-friendly
      for (const star of starList) {
        const alpha = Math.max(0.1, Math.min(1, star.alpha * star.baseAlpha));
        this.ctx.globalAlpha = alpha;
        this.ctx.beginPath();
        this.ctx.arc(
          star.x + this.mouseX * star.layer,
          star.y + this.mouseY * star.layer,
          star.radius, 0, Math.PI * 2
        );
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    // Draw and update shooting stars
    for (let j = this.shootingStars.length - 1; j >= 0; j--) {
      const s = this.shootingStars[j];

      this.ctx.save();
      this.ctx.beginPath();
      const grad = this.ctx.createLinearGradient(s.x, s.y, s.x - s.dx * 3, s.y - s.dy * 3);
      grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
      grad.addColorStop(0.3, `rgba(165, 180, 252, ${s.opacity * 0.7})`);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';
      this.ctx.moveTo(s.x, s.y);
      this.ctx.lineTo(s.x - s.dx * 3, s.y - s.dy * 3);
      this.ctx.stroke();
      this.ctx.restore();

      s.x += s.dx;
      s.y += s.dy;
      s.opacity -= s.decay;

      if (s.opacity <= 0 || s.x > this.canvas.width || s.y > this.canvas.height) {
        this.shootingStars.splice(j, 1);
      }
    }
  }

  /**
   * Set Mode (Auto, Day, Night, or Custom Minute)
   */
  setMode(mode, customMinute = null) {
    this.mode = mode;
    if (customMinute !== null) {
      this.currentMinute = customMinute;
    }
    this.update();
  }
}

// Instantiate global sky engine when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.skyEngine = new SkyEngine();
});
