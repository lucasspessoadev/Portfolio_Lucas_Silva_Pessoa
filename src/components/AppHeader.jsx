import React, { useState, useEffect } from 'react';

export function AppHeader({
  mode,
  setMode,
  formattedTime,
  phaseName,
  iconClass,
  currentMinute,
  isPlayingSound,
  toggleSound
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // High-Performance IntersectionObserver ScrollSpy (0 Layout Reflow / Refetch overhead)
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setMode('custom', val);
  };

  const navLinks = [
    { id: 'hero', label: 'Início', icon: 'fa-house' },
    { id: 'about', label: 'Sobre', icon: 'fa-user' },
    { id: 'skills', label: 'Habilidades', icon: 'fa-layer-group' },
    { id: 'projects', label: 'Projetos', icon: 'fa-briefcase' },
    { id: 'experience', label: 'Trajetória', icon: 'fa-graduation-cap' },
    { id: 'contact', label: 'Contato', icon: 'fa-paper-plane' },
  ];

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand Logo */}
        <a href="#hero" className="brand-logo">
          <span className="logo-icon"><i className="fa-solid fa-code"></i></span>
          <span className="logo-text">Lucas<span className="highlight">Pessoa</span></span>
        </a>

        {/* Navigation Links */}
        <nav className={`nav-menu ${isMobileNavOpen ? 'mobile-active' : ''}`} id="nav-menu">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => setIsMobileNavOpen(false)}
            >
              <i className={`fa-solid ${link.icon}`}></i>
              <span className="nav-label">{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Sky Time & Theme Controls */}
        <div className="sky-control-center">
          {/* Time Status Badge (Click to open time scrubber) */}
          <div
            className="time-status-pill"
            id="time-status-pill"
            title="Clique para abrir o ajustador de horário 24h"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <span className="pulse-dot"></span>
            <span className="status-icon">
              <i className={`fa-solid ${iconClass}`}></i>
            </span>
            <span className="status-time">{formattedTime}</span>
          </div>

          {/* Theme Mode Quick Toggle Buttons */}
          <div className="theme-mode-buttons">
            <button
              className={`mode-btn ${mode === 'auto' ? 'active' : ''}`}
              onClick={() => setMode('auto')}
              title="Sincronizar com Horário Real"
              aria-label="Modo Automático"
            >
              <i className="fa-solid fa-clock-rotate-left"></i>
              <span className="btn-label">Auto</span>
            </button>
            <button
              className={`mode-btn ${mode === 'day' ? 'active' : ''}`}
              onClick={() => setMode('day')}
              title="Modo Dia"
              aria-label="Modo Dia"
            >
              <i className="fa-solid fa-sun"></i>
              <span className="btn-label">Dia</span>
            </button>
            <button
              className={`mode-btn ${mode === 'night' ? 'active' : ''}`}
              onClick={() => setMode('night')}
              title="Modo Noite"
              aria-label="Modo Noite"
            >
              <i className="fa-solid fa-moon"></i>
              <span className="btn-label">Noite</span>
            </button>
            <button
              className={`mode-btn ${isPlayingSound ? 'active' : ''}`}
              onClick={toggleSound}
              title="Som Ambiente Dinâmico"
              aria-label="Som ambiente"
            >
              <i className={`fa-solid ${isPlayingSound ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
            </button>
          </div>

          {/* Time Slider Toggle Button */}
          <button
            className={`slider-toggle-btn ${isDrawerOpen ? 'active' : ''}`}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            title="Ajustar horário 24h manualmente"
            aria-label="Ajustar horário"
          >
            <i className="fa-solid fa-sliders"></i>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            aria-label="Abrir Menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {/* 24h Time Scrubber Drawer */}
      <div className={`time-scrubber-drawer ${isDrawerOpen ? 'open' : ''}`} id="time-scrubber-drawer">
        <div className="scrubber-inner">
          <div className="scrubber-info">
            <span className="scrubber-label"><i className="fa-solid fa-wand-magic-sparkles"></i> Simular Horário do Dia:</span>
            <span className="scrubber-value">{formattedTime}</span>
            <span className="scrubber-period">{phaseName}</span>
          </div>
          <div className="slider-container">
            <span className="slider-marker" style={{ left: '0%' }}>00:00 🌙</span>
            <span className="slider-marker" style={{ left: '25%' }}>06:00 🌅</span>
            <span className="slider-marker" style={{ left: '50%' }}>12:00 ☀️</span>
            <span className="slider-marker" style={{ left: '75%' }}>18:00 🌇</span>
            <span className="slider-marker" style={{ left: '100%' }}>23:59 🌌</span>
            <input
              type="range"
              id="time-slider"
              min="0"
              max="1439"
              step="5"
              value={currentMinute}
              onChange={handleSliderChange}
              className="time-range-input"
              aria-label="Seletor de Horário 24 horas"
            />
          </div>
          <button
            className="reset-auto-btn"
            onClick={() => setMode('auto')}
          >
            <i className="fa-solid fa-arrow-rotate-right"></i> Voltar ao Horário Real
          </button>
        </div>
      </div>
    </header>
  );
}
