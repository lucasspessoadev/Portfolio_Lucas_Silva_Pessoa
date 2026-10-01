import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    // =========================================================================
    // 1. INTERSECTION OBSERVER FOR SMOOTH ENTRANCE ANIMATIONS
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
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Target sections, cards, timelines, headers for reveal on scroll
    const elementsToObserve = document.querySelectorAll(
      '.section-padding, .glass-panel, .section-header, .stat-card, .skill-card, .timeline-item, .contact-info-card, .project-card, .highlight-item, .section-divider-glow'
    );

    elementsToObserve.forEach((el, index) => {
      el.classList.add('reveal-on-scroll');
      
      // Auto-assign staggered delays to card siblings within grids
      const parentGrid = el.parentElement;
      if (parentGrid && (parentGrid.classList.contains('hero-stats-grid') || 
                         parentGrid.classList.contains('highlights-grid') || 
                         parentGrid.classList.contains('skills-grid') ||
                         parentGrid.classList.contains('projects-grid'))) {
        const childIndex = Array.from(parentGrid.children).indexOf(el);
        if (childIndex > 0) {
          el.style.transitionDelay = `${(childIndex % 4) * 0.12}s`;
        }
      }

      observer.observe(el);
    });

    // =========================================================================
    // 2. PARALLAX SCROLL ENGINE (GPU ACCELERATED VIA RAF & CSS CUSTOM PROPS)
    // =========================================================================
    let ticking = false;
    const docEl = document.documentElement;

    const updateParallax = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = Math.max(
        document.body.scrollHeight,
        docEl.scrollHeight,
        document.body.offsetHeight,
        docEl.offsetHeight
      );
      const winHeight = window.innerHeight || 800;
      const maxScroll = Math.max(1, docHeight - winHeight);
      const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // Global Root CSS Variables for Parallax Layers
      docEl.style.setProperty('--scroll-y', `${scrollY}px`);
      docEl.style.setProperty('--scroll-progress', `${scrollProgress}`);

      // Multi-layer Sky & Background Parallax Offsets
      docEl.style.setProperty('--parallax-clouds-back', `${(scrollY * -0.15).toFixed(2)}px`);
      docEl.style.setProperty('--parallax-clouds-mid', `${(scrollY * -0.32).toFixed(2)}px`);
      docEl.style.setProperty('--parallax-clouds-front', `${(scrollY * -0.52).toFixed(2)}px`);
      docEl.style.setProperty('--parallax-mountains-back', `${(scrollY * -0.08).toFixed(2)}px`);
      docEl.style.setProperty('--parallax-mountains-front', `${(scrollY * -0.18).toFixed(2)}px`);
      docEl.style.setProperty('--parallax-celestial', `${(scrollY * -0.12).toFixed(2)}px`);

      // Hero Content Parallax & Fade-out effect
      docEl.style.setProperty('--parallax-hero', `${(scrollY * 0.25).toFixed(1)}px`);
      const heroOpacity = Math.max(0, 1 - (scrollY / (winHeight * 0.75)));
      docEl.style.setProperty('--parallax-hero-opacity', `${heroOpacity.toFixed(2)}`);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Initial update & listener
    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}

