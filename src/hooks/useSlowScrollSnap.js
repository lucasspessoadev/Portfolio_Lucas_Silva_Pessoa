import { useEffect } from 'react';

export function useSlowScrollSnap() {
  useEffect(() => {
    // Desativa em telas pequenas
    if (window.innerWidth < 768) return;

    let isScrolling = false;
    let scrollTimeout;
    const HEADER_OFFSET = 90;
    let sectionData = [];

    // Cacheia as alturas das seções para não travar o navegador recalculando no scroll
    const updateSectionData = () => {
      const sections = Array.from(document.querySelectorAll('section'));
      sectionData = sections.map(sec => ({
        top: sec.offsetTop - HEADER_OFFSET,
        bottom: sec.offsetTop + sec.offsetHeight,
        height: sec.offsetHeight
      }));
    };

    // Atualiza o cache automaticamente caso algo mude de tamanho (ex: expandir texto)
    const resizeObserver = new ResizeObserver(() => {
      updateSectionData();
    });
    
    // Pequeno atraso para garantir que o DOM foi montado
    setTimeout(() => {
      updateSectionData();
      const sections = document.querySelectorAll('section');
      sections.forEach(sec => resizeObserver.observe(sec));
    }, 500);

    // Ease-in-out Quad (Suave, acelera e desacelera gostoso)
    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const smoothScrollTo = (targetY, duration) => {
      const startYPos = window.scrollY;
      const difference = targetY - startYPos;
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        let progress = elapsed / duration;
        if (progress > 1) progress = 1;

        window.scrollTo(0, startYPos + difference * easeInOutQuad(progress));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          // Cooldown de 500ms para o trackpad não disparar duplo scroll logo em seguida
          scrollTimeout = setTimeout(() => {
            isScrolling = false;
          }, 500); 
        }
      };
      
      window.requestAnimationFrame(step);
    };

    const handleWheel = (e) => {
      // Permite scroll nativo dentro de modais
      if (document.querySelector('.project-modal-overlay.open')) return;
      
      // Permite scroll nativo dentro das caixas de texto expansíveis
      const isScrollableNode = e.target.closest('.project-expanded-details.open, .project-modal-body, .time-scrubber-drawer.open');
      if (isScrollableNode) {
        const atTop = isScrollableNode.scrollTop <= 0;
        const atBottom = Math.ceil(isScrollableNode.scrollTop + isScrollableNode.clientHeight) >= isScrollableNode.scrollHeight - 2;
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) return; 
      }

      // Se já estiver animando, ignora a roda do mouse (bloqueia o trackpad de bugar)
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      // Ignora tremidas pequenas de trackpad
      if (Math.abs(e.deltaY) < 10) return;

      if (!sectionData.length) return;

      const scrollY = window.scrollY;
      const viewportBottom = scrollY + window.innerHeight;

      // Descobre a seção atual usando os dados CACHEADOS (Zero Lag/Travamentos)
      let activeIndex = 0;
      for (let i = 0; i < sectionData.length; i++) {
        if (scrollY >= sectionData[i].top - 15 && scrollY <= sectionData[i].bottom) {
          activeIndex = i;
          break;
        }
      }

      const activeSection = sectionData[activeIndex];
      if (!activeSection) return;

      if (e.deltaY > 0) {
        // SCROLL PARA BAIXO
        // Se ainda tem texto pra ver nessa seção, deixa o scroll normal fluir
        if (viewportBottom < activeSection.bottom - 10) {
          return; 
        } else if (activeIndex < sectionData.length - 1) {
          // Chegou no fim da seção. Faz a animação cinematográfica de 900ms para a próxima!
          e.preventDefault();
          isScrolling = true;
          smoothScrollTo(sectionData[activeIndex + 1].top, 900);
        }
      } else if (e.deltaY < 0) {
        // SCROLL PARA CIMA
        if (scrollY > activeSection.top + 10) {
          return; 
        } else if (activeIndex > 0) {
          e.preventDefault();
          isScrolling = true;
          smoothScrollTo(sectionData[activeIndex - 1].top, 900);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      resizeObserver.disconnect();
      clearTimeout(scrollTimeout);
    };
  }, []);
}
