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
            Disponível para novas oportunidades
          </span>
        </div>

        <h1 className="hero-title animate-slide-up">
          Olá, eu sou <span className="gradient-text hero-dynamic-text">Lucas Silva Pessoa</span>
        </h1>
        
        <h2 className="hero-role animate-slide-up delay-1">
          Desenvolvedor Full Stack
        </h2>

        <p className="hero-description animate-slide-up delay-1">
          Criando soluções web completas, automações inteligentes e infraestrutura em nuvem de alto desempenho.
        </p>

        {/* CTA Buttons */}
        <div className="hero-actions animate-slide-up delay-2">
          <a href="#projects" className="btn btn-primary">
            <span>Ver Projetos</span>
            <i className="fa-solid fa-arrow-right"></i>
          </a>
          <a 
            href="/curriculo/lucas-silva-pessoa.pdf" 
            download="Lucas_Silva_Pessoa_Curriculo.pdf"
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-cv"
            title="Baixar Currículo completo em PDF"
          >
            <i className="fa-solid fa-file-arrow-down"></i>
            <span>Baixar CV</span>
          </a>
          <a href="#contact" className="btn btn-glass">
            <i className="fa-solid fa-comments"></i>
            <span>Contato</span>
          </a>
          <a 
            href="https://linkedin.com/in/lucas-pessoa-dev/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-icon-only"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>

        {/* Minimalist Tech Stack Pills */}
        <div className="hero-tech-pills animate-slide-up delay-3">
          <div className="tech-pill glass-panel">
            <i className="fa-brands fa-java"></i>
            <span>Java & Spring</span>
          </div>
          <div className="tech-pill glass-panel">
            <i className="fa-brands fa-react"></i>
            <span>React & Node</span>
          </div>
          <div className="tech-pill glass-panel">
            <i className="fa-brands fa-aws"></i>
            <span>AWS & Docker</span>
          </div>
          <div className="tech-pill glass-panel">
            <i className="fa-solid fa-robot"></i>
            <span>n8n & Typebot</span>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="scroll-indicator">
          <a href="#about" aria-label="Rolar para baixo">
            <span className="mouse-wheel"></span>
            <span className="scroll-text">Explorar</span>
          </a>
        </div>
      </div>
    </section>
  );
}

