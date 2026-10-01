import React, { useState } from 'react';

const SKILLS_LIST = [
  // Languages & Front-End
  {
    name: 'Java (Spring Boot)',
    level: 'Back-end, Orientação a Objetos, APIs REST',
    progress: 90,
    category: 'backend',
    icon: 'fa-brands fa-java',
    accentColor: '#E76F00'
  },
  {
    name: 'JavaScript (ES6+) / React.js',
    level: 'Front-end, Componentização, Single Page Apps',
    progress: 92,
    category: 'frontend',
    icon: 'fa-brands fa-react',
    accentColor: '#61DAFB'
  },
  {
    name: 'Node.js & APIs RESTful',
    level: 'Rotas, CRUD, Microserviços, Express',
    progress: 88,
    category: 'backend',
    icon: 'fa-brands fa-node-js',
    accentColor: '#339933'
  },
  {
    name: 'HTML5 & CSS3 Moderno',
    level: 'Flexbox, Grid, Layouts Responsivos, Clean Code',
    progress: 94,
    category: 'frontend',
    icon: 'fa-brands fa-css3-alt',
    accentColor: '#264de4'
  },
  {
    name: 'PHP',
    level: 'Desenvolvimento Web, Backend & Scripts',
    progress: 82,
    category: 'backend',
    icon: 'fa-brands fa-php',
    accentColor: '#777BB4'
  },
  {
    name: 'Python & C#',
    level: 'Linguagens de Programação & Automação',
    progress: 80,
    category: 'backend',
    icon: 'fa-brands fa-python',
    accentColor: '#3776AB'
  },
  // Databases
  {
    name: 'MySQL & SQL',
    level: 'Modelagem Relacional, Consultas SQL, CRUD',
    progress: 88,
    category: 'backend',
    icon: 'fa-solid fa-database',
    accentColor: '#4479A1'
  },
  // Cloud, DevOps & Automation
  {
    name: 'AWS (EC2 & S3)',
    level: 'Computação em Nuvem, Armazenamento, Hosting',
    progress: 84,
    category: 'devops',
    icon: 'fa-brands fa-aws',
    accentColor: '#FF9900'
  },
  {
    name: 'Docker',
    level: 'Containers, Imagens & Ambientes Isolados',
    progress: 82,
    category: 'devops',
    icon: 'fa-brands fa-docker',
    accentColor: '#2496ED'
  },
  {
    name: 'n8n & Typebot',
    level: 'Automação de Processos & Fluxos Low-Code',
    progress: 90,
    category: 'devops',
    icon: 'fa-solid fa-robot',
    accentColor: '#FF6D5A'
  },
  {
    name: 'Git, GitHub & Maven',
    level: 'Versionamento de Código, Gerenciador de Builds',
    progress: 92,
    category: 'devops',
    icon: 'fa-brands fa-git-alt',
    accentColor: '#F05032'
  },
  {
    name: 'Clean Code, Scrum & Kanban',
    level: 'Boas Práticas, Metodologias Ágeis, POO',
    progress: 95,
    category: 'devops',
    icon: 'fa-solid fa-clipboard-check',
    accentColor: '#10b981'
  }
];

export function Skills() {
  const [filter, setFilter] = useState('all');

  const filteredSkills = SKILLS_LIST.filter(skill => {
    if (filter === 'all') return true;
    return skill.category === filter;
  });

  return (
    <section id="skills" className="section-padding skills-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-subtitle"><i className="fa-solid fa-microchip"></i> Habilidades Técnicas</span>
          <h2 className="section-title">Tecnologias & <span className="gradient-text">Competências</span></h2>
          <div className="section-line"></div>
        </div>

        {/* Skills Filter Tabs */}
        <div className="skills-filter-tabs">
          <button 
            className={`skill-tab ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            Todas as Competências
          </button>
          <button 
            className={`skill-tab ${filter === 'frontend' ? 'active' : ''}`} 
            onClick={() => setFilter('frontend')}
          >
            Front-End & UI
          </button>
          <button 
            className={`skill-tab ${filter === 'backend' ? 'active' : ''}`} 
            onClick={() => setFilter('backend')}
          >
            Back-End & Bancos
          </button>
          <button 
            className={`skill-tab ${filter === 'devops' ? 'active' : ''}`} 
            onClick={() => setFilter('devops')}
          >
            DevOps & Automação
          </button>
        </div>

        {/* Skill Cards Grid */}
        <div className="skills-grid" id="skills-grid">
          {filteredSkills.map((skill) => (
            <div 
              key={skill.name} 
              className="skill-card glass-panel"
            >
              <div 
                className="skill-icon-wrap" 
                style={{ '--accent-color': skill.accentColor }}
              >
                <i className={skill.icon}></i>
              </div>
              <div className="skill-info">
                <h4 className="skill-name">{skill.name}</h4>
                <span className="skill-level">{skill.level}</span>
                <div className="skill-bar">
                  <div className="skill-fill" style={{ width: `${skill.progress}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
