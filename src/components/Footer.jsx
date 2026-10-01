import React from 'react';

export function Footer({ phaseName, formattedTime }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer glass-panel">
      <div className="footer-container">
        <div className="footer-left">
          <a href="#hero" className="brand-logo">
            <span className="logo-icon"><i className="fa-solid fa-code"></i></span>
            <span className="logo-text">Lucas<span className="highlight">Pessoa</span></span>
          </a>
          <p className="footer-copy">
            © <span id="current-year">{currentYear}</span> Lucas Silva Pessoa • Desenvolvedor Full Stack • Campo Limpo, SP.
          </p>
        </div>

        <div className="footer-center">
          <div className="footer-sky-indicator">
            <span id="footer-sky-badge">
              <i className="fa-solid fa-circle-notch fa-spin"></i> {phaseName} • Sincronizado às {formattedTime}
            </span>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-socials">
            <a href="https://github.com/lucasspessoadev" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
            <a href="https://linkedin.com/in/lucas-pessoa-dev/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="mailto:lucasspessoadev@outlook.com" aria-label="E-mail"><i className="fa-solid fa-envelope"></i></a>
          </div>
          <a href="#hero" className="back-to-top" title="Voltar ao Topo">
            <i className="fa-solid fa-chevron-up"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
