import React, { useEffect } from 'react';

export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className={`modal-overlay ${project ? 'active' : ''}`} 
      id="project-modal" 
      aria-hidden={!project}
      onClick={(e) => {
        if (e.target.id === 'project-modal') onClose();
      }}
    >
      <div className="modal-content glass-panel" role="dialog" aria-modal="true">
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Fechar Janela"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div id="modal-body-content">
          <div style={{ marginBottom: '20px' }}>
            <span className="badge-type" style={{ background: 'var(--accent-primary)', color: '#fff' }}>
              {project.category}
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', margin: '12px 0 6px' }}>
              {project.title}
            </h2>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '24px' }}>
            {project.description}
          </p>

          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '12px', color: 'var(--text-primary)' }}>
            <i className="fa-solid fa-circle-check" style={{ color: 'var(--accent-primary)' }}></i> Principais Diferenciais:
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {project.features && project.features.map((feature, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <i className="fa-solid fa-chevron-right" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem' }}></i>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
              Stack Utilizada:
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tags && project.tags.map((t, idx) => (
                <span key={idx} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', borderTop: '1px solid var(--bg-card-border)', paddingTop: '20px' }}>
            <a 
              href={project.demoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary" 
              style={{ flexGrow: 1 }}
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i> Ver Demo Online
            </a>
            <a 
              href={project.repoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-glass" 
              style={{ flexGrow: 1 }}
            >
              <i className="fa-brands fa-github"></i> Ver Código no GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
