import React from 'react';

export function Hero({ theme, phaseName, formattedTime }) {
  const skyIconClass = theme === 'night' ? 'fa-moon' : (theme === 'sunset' ? 'fa-cloud-sun' : 'fa-sun');

  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        {/* Floating Live Status Badge */}
        <div className="hero-badge animate-fade-in" data-parallax-speed="0.14">
          <span className="badge-beacon"></span>
          <span className="badge-text" id="hero-status-message">
            <i className={`fa-solid ${skyIconClass}`}></i> Lucas Silva Pessoa • {phaseName} ({formattedTime}) • Disponível para Oportunidades
          </span>
        </div>

        <h1 className="hero-title animate-slide-up">
          Olá, sou <span className="gradient-text hero-dynamic-text">Lucas Silva Pessoa</span>
          <br />
          Desenvolvedor Full Stack
        </h1>

        <p className="hero-description animate-slide-up delay-1">
          Desenvolvedor Full Stack focado em criar soluções completas (Java/Spring, React, Node), automações de processos e infraestrutura Cloud (AWS & Docker).
        </p>

        {/* CTA Buttons */}
        <div className="hero-actions animate-slide-up delay-2">
          <a href="#projects" className="btn btn-primary">
            <span>Ver Meus Projetos</span>
            <i className="fa-solid fa-arrow-right"></i>
          </a>
          <a href="#contact" className="btn btn-glass">
            <i className="fa-solid fa-comments"></i>
            <span>Entrar em Contato</span>
          </a>
          <a 
            href="https://linkedin.com/in/lucas-pessoa-dev/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline"
          >
            <i className="fa-brands fa-linkedin"></i>
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Dynamic Quick Stats Grid */}
        <div className="hero-stats-grid animate-slide-up delay-3">
          <div className="stat-card glass-panel" data-parallax-speed="0.06">
            <div className="stat-icon"><i className="fa-brands fa-java"></i></div>
            <div className="stat-details">
              <span className="stat-number">Java & Spring</span>
              <span className="stat-label">Back-End & APIs REST</span>
            </div>
          </div>
          <div className="stat-card glass-panel" data-parallax-speed="0.12">
            <div className="stat-icon"><i className="fa-brands fa-react"></i></div>
            <div className="stat-details">
              <span className="stat-number">React & Node</span>
              <span className="stat-label">Front-End & JS (ES6+)</span>
            </div>
          </div>
          <div className="stat-card glass-panel" data-parallax-speed="0.08">
            <div className="stat-icon"><i className="fa-brands fa-aws"></i></div>
            <div className="stat-details">
              <span className="stat-number">AWS & Docker</span>
              <span className="stat-label">Cloud & Containerização</span>
            </div>
          </div>
          <div className="stat-card glass-panel" data-parallax-speed="0.14">
            <div className="stat-icon"><i className="fa-solid fa-robot"></i></div>
            <div className="stat-details">
              <span className="stat-number">n8n & Typebot</span>
              <span className="stat-label">Automação & Low-Code</span>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="scroll-indicator">
          <a href="#about" aria-label="Rolar para baixo">
            <span className="mouse-wheel"></span>
            <span className="scroll-text">Conhecer Perfil</span>
          </a>
        </div>
      </div>
    </section>
  );
}
