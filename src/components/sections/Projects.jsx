import React, { useState, useRef } from 'react';
import { PROJECTS_DATA } from '../../data/projects';

export function Projects({ onOpenModal }) {
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'grid'
  const scrollRef = useRef(null);

  // Filter projects list
  const projectsList = Object.values(PROJECTS_DATA);
  const filteredProjects = projectsList.filter(proj => {
    if (filter === 'all') return true;
    return proj.filterCategory === filter;
  });

  const totalProjects = filteredProjects.length;

  // Filter change handler
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Ultra-lightweight smooth scroll handlers (0 React state re-renders)
  const handleNext = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 15) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      scrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
    if (scrollLeft <= 10) {
      scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
    } else {
      scrollRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="section-padding projects-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">
            <i className="fa-solid fa-laptop-code"></i> Portfólio de Trabalhos
          </span>
          <h2 className="section-title">
            Projetos em <span className="gradient-text">Destaque</span>
          </h2>
          <p className="section-desc">
            Uma seleção de soluções desenvolvidas com foco em UX elegante, performance e impacto real.
          </p>
          <div className="section-line"></div>
        </div>

        {/* Filter Bar & View Mode Toggle */}
        <div className="projects-controls-wrapper">
          <div className="projects-filter-bar">
            <button
              className={`proj-filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              <i className="fa-solid fa-layer-group"></i> Todos
            </button>
            <button
              className={`proj-filter-btn ${filter === 'web' ? 'active' : ''}`}
              onClick={() => handleFilterChange('web')}
            >
              <i className="fa-solid fa-globe"></i> Aplicações Web
            </button>
            <button
              className={`proj-filter-btn ${filter === 'fullstack' ? 'active' : ''}`}
              onClick={() => handleFilterChange('fullstack')}
            >
              <i className="fa-solid fa-server"></i> Full Stack
            </button>
            <button
              className={`proj-filter-btn ${filter === 'ui' ? 'active' : ''}`}
              onClick={() => handleFilterChange('ui')}
            >
              <i className="fa-solid fa-mobile-screen-button"></i> UI/UX & Mobile
            </button>
          </div>

          <div className="view-mode-toggle">
            <button
              className={`view-btn ${viewMode === 'carousel' ? 'active' : ''}`}
              onClick={() => setViewMode('carousel')}
              title="Modo Carrossel"
              aria-label="Modo Carrossel"
            >
              <i className="fa-solid fa-sliders"></i>
              <span>Carrossel</span>
            </button>
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Modo Grade"
              aria-label="Modo Grade"
            >
              <i className="fa-solid fa-table-cells"></i>
              <span>Grade</span>
            </button>
          </div>
        </div>

        {/* PROJECTS CONTAINER */}
        {viewMode === 'carousel' ? (
          <div className="projects-carousel-container">
            {/* Left / Right Nav Arrows */}
            {totalProjects > 1 && (
              <>
                <button
                  className="carousel-arrow carousel-arrow-prev"
                  onClick={handlePrev}
                  aria-label="Projeto anterior"
                  title="Anterior"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button
                  className="carousel-arrow carousel-arrow-next"
                  onClick={handleNext}
                  aria-label="Próximo projeto"
                  title="Próximo"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </>
            )}

            {/* Zero-JS Overhead Native CSS Scroll Snap Viewport */}
            <div className="carousel-viewport-native" ref={scrollRef}>
              <div className="carousel-track-native">
                {filteredProjects.map((proj) => (
                  <div key={proj.id} className="carousel-item-snap">
                    <article className="project-card glass-panel">
                      <div className={`project-banner ${proj.bannerClass}`}>
                        <div className="banner-overlay">
                          <div className="banner-tags">
                            {proj.isFeatured && (
                              <span className="badge-featured">
                                <i className="fa-solid fa-fire"></i> Destaque
                              </span>
                            )}
                            <span className="badge-type">{proj.badgeType}</span>
                          </div>
                          <div className="banner-actions">
                            <button
                              className="preview-btn"
                              onClick={() => onOpenModal(proj)}
                              title="Ver Detalhes"
                            >
                              <i className="fa-solid fa-magnifying-glass-plus"></i>
                            </button>
                            <a
                              href={proj.repoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="preview-btn"
                              title="Código no GitHub"
                            >
                              <i className="fa-brands fa-github"></i>
                            </a>
                          </div>
                        </div>
                        <div className="banner-visual-art">
                          <i className={`fa-solid ${proj.artIcon} proj-art-icon`}></i>
                        </div>
                      </div>

                      <div className="project-body">
                        <h3 className="project-title">{proj.title}</h3>
                        <p className="project-description">
                          {proj.shortDescription}
                        </p>
                        <div className="project-tech-stack">
                          {proj.tags.slice(0, 5).map((t, idx) => (
                            <span key={idx} className="tech-tag">{t}</span>
                          ))}
                        </div>
                        <div className="project-footer">
                          <button
                            onClick={() => onOpenModal(proj)}
                            className="link-details"
                            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                          >
                            Ver Case Study & Detalhes <i className="fa-solid fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Grid View fallback */
          <div className="projects-grid" id="projects-grid">
            {filteredProjects.map((proj) => (
              <article key={proj.id} className="project-card glass-panel">
                <div className={`project-banner ${proj.bannerClass}`}>
                  <div className="banner-overlay">
                    <div className="banner-tags">
                      {proj.isFeatured && (
                        <span className="badge-featured">
                          <i className="fa-solid fa-fire"></i> Destaque
                        </span>
                      )}
                      <span className="badge-type">{proj.badgeType}</span>
                    </div>
                    <div className="banner-actions">
                      <button
                        className="preview-btn"
                        onClick={() => onOpenModal(proj)}
                        title="Ver Detalhes"
                      >
                        <i className="fa-solid fa-magnifying-glass-plus"></i>
                      </button>
                      <a
                        href={proj.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="preview-btn"
                        title="Código no GitHub"
                      >
                        <i className="fa-brands fa-github"></i>
                      </a>
                    </div>
                  </div>
                  <div className="banner-visual-art">
                    <i className={`fa-solid ${proj.artIcon} proj-art-icon`}></i>
                  </div>
                </div>

                <div className="project-body">
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-description">
                    {proj.shortDescription}
                  </p>
                  <div className="project-tech-stack">
                    {proj.tags.slice(0, 5).map((t, idx) => (
                      <span key={idx} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <div className="project-footer">
                    <button
                      onClick={() => onOpenModal(proj)}
                      className="link-details"
                      style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      Ver Case Study & Detalhes <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
