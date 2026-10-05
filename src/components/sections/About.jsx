import React, { useState } from 'react';

export function About() {
  const [isProjectExpanded, setIsProjectExpanded] = useState(false);

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

            {/* PDF CV Download Button */}
            <a 
              href="/curriculo/lucas-silva-pessoa.pdf" 
              download="Lucas_Silva_Pessoa_Curriculo.pdf"
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-cv btn-profile-cv"
              title="Baixar Currículo completo em PDF"
            >
              <i className="fa-solid fa-file-pdf"></i>
              <span>Download Currículo (PDF)</span>
            </a>
          </div>

          {/* Detailed Bio & Value Proposition */}
          <div className="about-card-content glass-panel" data-parallax-speed="0.08">
            <h3 className="content-heading">
              Desenvolvendo <span className="gradient-text">soluções completas</span> do front-end ao back-end com foco em eficiência e usabilidade.
            </h3>

            <p className="content-paragraph">
              Olá! Sou o <strong>Lucas Silva Pessoa</strong>, Desenvolvedor Full Stack em formação em Análise e Desenvolvimento de Sistemas 
              pelo <strong>Senac EAD</strong>. Possuo experiência prática na construção de aplicações completas, 
              integração de APIs RESTful, desenvolvimento back-end e front-end, além de automação de processos corporativos.
            </p>

            <p className="content-paragraph">
              Minha atuação abrange linguagens como <strong>Java (Spring Boot), PHP, JavaScript (React.js, Node.js), C# e Python</strong>, 
              bancos de dados relacionais (MySQL/SQL), ambiente em nuvem com <strong>AWS (EC2, S3) e Docker</strong>, além de ferramentas de automação e Low-Code como <strong>n8n e Typebot</strong>. 
              Trabalho sob metodologias ágeis (Scrum e Kanban), unindo rigor em Clean Code e arquitetura orientada a objetos à vivência na área financeira e ao desenvolvimento de soluções tecnológicas para a área médica e da saúde.
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
                  className="about-showcase-video"
                />
              </div>
              <div className="video-caption-container">
                <p className="video-caption">
                  <i className="fa-solid fa-users"></i> Apresentação do pitch da startup <strong>Entrennection</strong> em 2023 para um público de mais de 300 pessoas.
                </p>
                <button 
                  className="project-expand-btn"
                  onClick={() => setIsProjectExpanded(!isProjectExpanded)}
                  aria-expanded={isProjectExpanded}
                >
                  Ver resumo do projeto <i className={`fa-solid fa-chevron-${isProjectExpanded ? 'up' : 'down'}`}></i>
                </button>
              </div>

              <div className={`project-expanded-details ${isProjectExpanded ? 'open' : ''}`}>
                <div className="project-details-inner">
                  <h4 className="project-detail-title">Sobre o projeto</h4>
                  <p className="project-detail-text">
                    Este é um projeto de uma plataforma voltada para auxiliar os microempreendedores a superarem suas dificuldades e alcançarem o sucesso em seus negócios. A plataforma visa fornecer suporte financeiro, gestão orçamentária, gestão de pessoas, implementação de novas ferramentas e tecnologias, negociação e muito mais. A ideia central é criar um ambiente onde os microempreendedores possam se cadastrar, escolher suas áreas de interesse e estabelecer parcerias com outros empreendedores, visando o crescimento e o desenvolvimento conjunto.
                  </p>

                  <h4 className="project-detail-title">Objetivo</h4>
                  <p className="project-detail-text">
                    A plataforma busca estabelecer uma ponte entre os microempreendedores, proporcionando-lhes oportunidades de aprendizado, crescimento e conexão com outros usuários. O impacto esperado na comunidade é o fortalecimento dos negócios dos microempreendedores, permitindo-lhes superar dificuldades e alcançar o sucesso de forma conjunta.
                  </p>

                  <h4 className="project-detail-title">Funcionalidades</h4>
                  <ul className="project-detail-list">
                    <li><strong>Cadastro de microempreendedores:</strong> Os usuários poderão se cadastrar na plataforma, fornecendo as informações necessárias sobre seus negócios e áreas de atuação.</li>
                    <li><strong>Parcerias comerciais:</strong> Dentro da plataforma, os microempreendedores poderão buscar por possíveis parcerias comerciais com outros usuários, visando criar novas empresas, estabelecer um novo CNPJ ou desenvolver produtos mais completos.</li>
                    <li><strong>Plano "Plus":</strong> Os usuários poderão aderir ao plano "Plus", que oferece acesso a aulas, mentorias e consultorias em parceria com organizações renomadas, como Sebrae e SENAC. Esse plano tem como objetivo fornecer suporte adicional aos microempreendedores, ajudando-os a impulsionar seus negócios.</li>
                    <li><strong>Redes sociais e interação:</strong> A plataforma contará com recursos de rede social, como postagens, noticias e conexões, onde os usuários podem disponibilizar suas empresas para possíveis parcerias.</li>
                  </ul>

                  <h4 className="project-detail-title">Minha Atuação</h4>
                  <p className="project-detail-text">
                    Neste projeto, atuei como <strong>Desenvolvedor Full-Stack</strong>, sendo responsável por toda a arquitetura, modelagem de dados, back-end e front-end da plataforma. Além da liderança técnica, também atuei como responsável <strong>Financeiro</strong> da startup, gerenciando o planejamento orçamentário, precificação e estruturação de custos do negócio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
