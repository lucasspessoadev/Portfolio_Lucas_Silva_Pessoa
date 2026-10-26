import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    // =========================================================================
    // 1. LIGHTWEIGHT INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
    // =========================================================================
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Target individual content blocks cleanly (avoids nested animation & composite thrashing)
    const elementsToObserve = document.querySelectorAll(
      '.section-header, .stat-card, .skill-card, .timeline-item, .contact-info-card, .project-card, .about-card-profile, .about-card-content, .section-divider-glow'
    );

    elementsToObserve.forEach((el) => {
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });

    // =========================================================================
    // 2. ULTRA-OPTIMIZED SCROLL ENGINE (NO FORCED REFLOW, NO ROOT PROPERTY THRASHING)
    // =========================================================================
    let ticking = false;
    let winHeight = window.innerHeight || 800;

    const heroEl = document.querySelector('.hero-container');
    const celestialEl = document.getElementById('celestial-orbit');

    const handleResize = () => {
      winHeight = window.innerHeight || 800;
    };

    const updateParallax = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      // Only perform subtle hero fade & drift while hero is actually in view
      if (heroEl) {
        if (scrollY < winHeight * 1.1) {
          const heroOffset = (scrollY * 0.22).toFixed(1);
          const heroOpacity = Math.max(0, 1 - (scrollY / (winHeight * 0.72))).toFixed(2);
          heroEl.style.transform = `translate3d(0, ${heroOffset}px, 0)`;
          heroEl.style.opacity = heroOpacity;
        } else if (heroEl.style.opacity !== '0') {
          heroEl.style.opacity = '0';
        }
      }

      // Subtle celestial shift
      if (celestialEl && scrollY < winHeight * 1.5) {
        celestialEl.style.transform = `translate3d(0, ${(scrollY * -0.08).toFixed(1)}px, 0)`;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
}
