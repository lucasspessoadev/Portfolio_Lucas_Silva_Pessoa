import React from 'react';

export function Experience() {
  return (
    <section id="experience" className="section-padding timeline-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-subtitle"><i className="fa-solid fa-timeline"></i> Minha Trajetória</span>
          <h2 className="section-title">Experiência & <span className="gradient-text">Formação Acadêmica</span></h2>
          <div className="section-line"></div>
        </div>

        <div className="timeline-container">
          {/* Timeline Item 1 - Experiência Profissional Recente */}
          <div className="timeline-item">
            <div className="timeline-dot">
              <i className="fa-solid fa-briefcase"></i>
            </div>
            <div className="timeline-card glass-panel">
              <span className="timeline-badge">out/2025 - out/2026</span>
              <h3 className="timeline-role">Desenvolvedor Trainee Full Stack</h3>
              <h4 className="timeline-company"><i className="fa-solid fa-building"></i> LHM IT Solutions (Híbrido)</h4>
              <p className="timeline-text">
                Desenvolvimento de soluções completas do front-end ao back-end, automação de processos corporativos, criação de fluxos de integração RESTful e Low-Code. Foco em qualidade de código, boas práticas e usabilidade trabalhando com metodologias ágeis (Scrum e Kanban).
              </p>
              <div className="timeline-tags">
                <span>Java (Spring Boot)</span>
                <span>PHP</span>
                <span>JavaScript (React)</span>
                <span>Node.js</span>
                <span>MySQL</span>
                <span>Scrum / Kanban</span>
              </div>
            </div>
          </div>

          {/* Timeline Item 2 - Graduação Acadêmica em Andamento */}
          <div className="timeline-item">
            <div className="timeline-dot">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="timeline-card glass-panel">
              <span className="timeline-badge">fev/2024 - jul/2026</span>
              <h3 className="timeline-role">Graduação em Análise e Desenvolvimento de Sistemas</h3>
              <h4 className="timeline-company"><i className="fa-solid fa-university"></i> Senac EAD (2.016 horas)</h4>
              <p className="timeline-text">
                Formação superior em andamento abrangendo engenharia de software, modelagem de bancos de dados, desenvolvimento de sistemas distribuídos, segurança da informação e arquitetura de software.
              </p>
              <div className="timeline-tags">
                <span>Engenharia de Software</span>
                <span>Bancos de Dados</span>
                <span>Arquitetura POO</span>
                <span>Clean Code</span>
              </div>
            </div>
          </div>

          {/* Timeline Item 3 - Experiência Profissional Inicial */}
          <div className="timeline-item">
            <div className="timeline-dot">
              <i className="fa-solid fa-laptop-code"></i>
            </div>
            <div className="timeline-card glass-panel">
              <span className="timeline-badge">dez/2024 - fev/2025</span>
              <h3 className="timeline-role">Jovem Aprendiz de TI</h3>
              <h4 className="timeline-company"><i className="fa-solid fa-building"></i> Smart Offers / Ericsson Inovação SA (Híbrido)</h4>
              <p className="timeline-text">
                Suporte e apoio em projetos de tecnologia da informação, auxílio na construção de automações de processos, manutenção de rotinas de código e acompanhamento de fluxos de trabalho com metodologias ágeis.
              </p>
              <div className="timeline-tags">
                <span>Suporte TI</span>
                <span>JavaScript</span>
                <span>Automação</span>
                <span>Low-Code</span>
                <span>Kanban</span>
              </div>
            </div>
          </div>

          {/* Timeline Item 4 - Certificações e Cursos de Base */}
          <div className="timeline-item">
            <div className="timeline-dot">
              <i className="fa-solid fa-certificate"></i>
            </div>
            <div className="timeline-card glass-panel">
              <span className="timeline-badge">2023</span>
              <h3 className="timeline-role">Formações & Certificações em Tecnologia</h3>
              <h4 className="timeline-company"><i className="fa-solid fa-award"></i> PROA, AWS & Especializações Java</h4>
              <p className="timeline-text">
                • <strong>Desenvolvedor Web Java FullStack</strong> (fev a jul/2023) - Java, Spring & Ágil.<br />
                • <strong>Instituto PROA</strong> (mar a jul/2023) - Profissão em Tecnologia.<br />
                • <strong>AWS Cloud & Redes</strong> (abr a jun/2023) - Fundamentos de redes e serviços AWS (EC2, S3).
              </p>
              <div className="timeline-tags">
                <span>Java FullStack</span>
                <span>Instituto PROA</span>
                <span>AWS Cloud (EC2, S3)</span>
                <span>Redes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
