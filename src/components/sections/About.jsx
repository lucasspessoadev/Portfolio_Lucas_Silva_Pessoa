import React from 'react';

export function About() {
  return (
    <section id="about" className="section-padding about-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-subtitle"><i className="fa-solid fa-user-gear"></i> Sobre Mim</span>
          <h2 className="section-title">Engenharia de Software, Automação & <span className="gradient-text">Inovação</span></h2>
          <div className="section-line"></div>
        </div>

        <div className="about-grid">
          {/* Bio & Profile Card */}
          <div className="about-card-profile glass-panel" data-parallax-speed="0.04">
            <div className="profile-avatar-wrapper">
              <div className="avatar-glow-ring"></div>
              <div className="avatar-box profile-image-box">
                <img 
                  src="/img/9a5e7227-85e4-4202-96e7-9aafd1089e3c.png" 
                  alt="Lucas Silva Pessoa" 
                  className="profile-video-avatar"
                />
              </div>
              <span className="status-indicator-badge" title="Disponível para contratação e projetos">
                <span className="pulse-green"></span> Disponível
              </span>
            </div>

            <h3 className="profile-name">Lucas Silva Pessoa</h3>
            <p className="profile-role">Desenvolvedor Full Stack • ADS Senac EAD</p>

            <div className="profile-meta">
              <div className="meta-item">
                <i className="fa-solid fa-location-dot"></i>
                <span>Campo Limpo, São Paulo - SP</span>
              </div>
              <div className="meta-item">
                <i className="fa-solid fa-graduation-cap"></i>
                <span>Senac EAD (fev/2024 – jul/2026)</span>
              </div>
              <div className="meta-item">
                <i className="fa-solid fa-briefcase"></i>
                <span>Full Stack & Automações TI</span>
              </div>
              <div className="meta-item">
                <i className="fa-solid fa-rocket"></i>
                <span>Founder da Startup Entrennection</span>
              </div>
            </div>

            <div className="profile-socials">
              <a href="https://github.com/lucasspessoadev" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/lucas-pessoa-dev/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="mailto:lucasspessoadev@outlook.com" className="social-icon" aria-label="E-mail">
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a href="https://wa.me/5511945796098" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Detailed Bio & Value Proposition */}
          <div className="about-card-content glass-panel" data-parallax-speed="0.08">
            <h3 className="content-heading">
              Desenvolvendo <span className="gradient-text">soluções completas</span> do front-end ao back-end com foco em eficiência e usabilidade.
            </h3>

            <p className="content-paragraph">
              Olá! Sou o <strong>Lucas Silva Pessoa</strong>, Desenvolvedor Full Stack em formação em Análise e Desenvolvimento de Sistemas 
              pelo <strong>Senac EAD (2.016h)</strong>. Possuo experiência prática na construção de aplicações completas, 
              integração de APIs RESTful, desenvolvimento back-end e front-end, além de automação de processos corporativos.
            </p>

            <p className="content-paragraph">
              Minha atuação abrange linguagens como <strong>Java (Spring Boot), PHP, JavaScript (React.js, Node.js), C# e Python</strong>, 
              bancos de dados relacionais (MySQL/SQL), ambiente em nuvem com <strong>AWS (EC2, S3) e Docker</strong>, além de ferramentas de automação e Low-Code como <strong>n8n e Typebot</strong>. 
              Trabalho sob metodologias ágeis (Scrum e Kanban), unindo rigor em Clean Code e arquitetura orientada a objetos à vivência na área financeira.
            </p>

            {/* Entrennection Startup Presentation Video Frame */}
            <div className="about-video-showcase">
              <div className="video-showcase-header">
                <span className="video-badge">
                  <i className="fa-solid fa-rocket"></i> Pitch Startup Entrennection (2023)
                </span>
              </div>

              <div className="video-player-wrapper">
                <video 
                  src="/vid/YouCut_20231002_181705893.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  controls
                  className="about-showcase-video"
                />
              </div>
              <p className="video-caption">
                <i className="fa-solid fa-users"></i> Apresentação do pitch da startup <strong>Entrennection</strong> em 2023 para um público de mais de 300 pessoas.
              </p>
            </div>

            {/* Highlights Pill Grid */}
            <div className="highlights-grid">
              <div className="highlight-item">
                <div className="hl-icon"><i className="fa-brands fa-java"></i></div>
                <div className="hl-text">
                  <strong>Back-End Robust</strong>
                  <span>Java (Spring Boot), Node.js, PHP, C# e APIs RESTful</span>
                </div>
              </div>
              <div className="highlight-item">
                <div className="hl-icon"><i className="fa-brands fa-react"></i></div>
                <div className="hl-text">
                  <strong>Front-End Moderno</strong>
                  <span>React.js, HTML5, CSS3 e JavaScript ES6+</span>
                </div>
              </div>
              <div className="highlight-item">
                <div className="hl-icon"><i className="fa-solid fa-gears"></i></div>
                <div className="hl-text">
                  <strong>Automação & Low-Code</strong>
                  <span>Integrações inteligentes com n8n e Typebot</span>
                </div>
              </div>
              <div className="highlight-item">
                <div className="hl-icon"><i className="fa-brands fa-aws"></i></div>
                <div className="hl-text">
                  <strong>Cloud & DevOps</strong>
                  <span>AWS (EC2, S3), Docker, Git, GitHub e Maven</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
