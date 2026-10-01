/**
 * ============================================================================
 * PORTFOLIO MAIN JAVASCRIPT
 * Interactive controls, Filtering, Modals, Toasts, and UI Orchestration
 * ============================================================================
 */

// Project Data for detailed modal views
const PROJECTS_DATA = {
  proj1: {
    title: "Nexus Cloud SaaS Platform",
    category: "Full Stack & Cloud Architecture",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "AWS S3", "NextAuth"],
    description: `
      O Nexus Cloud é uma plataforma SaaS empresarial de alta performance projetada para monitoramento de métricas e analytics em tempo real.
      O sistema oferece dashboards modulares customizáveis por drag-and-drop, exportação automatizada de relatórios em PDF/Excel com background jobs, e sumarização preditiva assistida por IA.
    `,
    features: [
      "Autenticação corporativa com OAuth2, MFA e RBAC (Role-Based Access Control)",
      "Processamento de streams de telemetria em tempo real com WebSockets",
      "Arquitetura serverless com Next.js Server Actions e Edge Functions",
      "Otimização de consultas em PostgreSQL com índices particionados e Redis Cache"
    ],
    demoLink: "https://exemplo.com/nexus",
    repoLink: "https://github.com/exemplo/nexus-cloud"
  },
  proj2: {
    title: "FinPulse Financial Tracker & Analytics",
    category: "Web Application & Data Visualization",
    tags: ["React", "Chart.js", "Node.js", "Fastify", "Redis", "TypeScript"],
    description: `
      O FinPulse é um ecossistema financeiro focado em clareza e agilidade. Ele consolida extratos bancários de múltiplas fontes, realiza categorização automática através de regras de machine learning e simula o impacto de diferentes investimentos no patrimônio ao longo do tempo.
    `,
    features: [
      "Gráficos interativos renderizados em Canvas com 60 FPS e suporte a zoom/pan",
      "API backend ultra rápida construída com Fastify e tipagem estrita",
      "Exportação de dados criptografados e proteção ponta-a-ponta",
      "Cálculo automatizado de juros compostos e projeção de metas financeiras"
    ],
    demoLink: "https://exemplo.com/finpulse",
    repoLink: "https://github.com/exemplo/finpulse"
  },
  proj3: {
    title: "Aura Luxury 3D Marketplace",
    category: "UI/UX & E-Commerce",
    tags: ["Vue 3", "Three.js", "Pinia", "Stripe API", "GSAP", "Tailwind CSS"],
    description: `
      Experiência de comércio eletrônico premium voltada a produtos de luxo e colecionáveis. Apresenta visualizador 3D em tempo real com renderização PBR (Physically Based Rendering), permitindo que o cliente inspecione detalhes materiais, reflexos e texturas em qualquer ângulo.
    `,
    features: [
      "Carregamento progressivo de modelos GLTF/GLB com compressão Draco",
      "Integração de checkout universal (Cartão, Apple Pay, Google Pay e PIX)",
      "Transições de página com GSAP sem flash de recarregamento",
      "Pontuação Lighthouse 98 em Performance e Acessibilidade"
    ],
    demoLink: "https://exemplo.com/aura",
    repoLink: "https://github.com/exemplo/aura-luxury"
  },
  proj4: {
    title: "Sphere Chat & Collab Workspace",
    category: "Full Stack & Real-Time Communication",
    tags: ["React", "Socket.io", "WebRTC", "Node.js", "MongoDB", "Docker"],
    description: `
      Ambiente colaborativo moderno que une canais de voz com baixa latência via WebRTC, mensagens instantâneas com reações e anexos, além de transcrição automática de áudio com integração a modelos de linguagem.
    `,
    features: [
      "Comunicação de áudio P2P e SFU otimizada para conexões instáveis",
      "Sincronização de estado global em milissegundos via WebSockets",
      "Estrutura conteinerizada com Docker Compose pronta para deploy",
      "Busca full-text indexada em mensagens e conversas arquivadas"
    ],
    demoLink: "https://exemplo.com/sphere",
    repoLink: "https://github.com/exemplo/sphere-chat"
  }
};

class PortfolioApp {
  constructor() {
    this.initElements();
    this.bindEvents();
    this.initScrollSpy();
  }

  initElements() {
    // Mode Buttons
    this.btnAuto = document.getElementById('btn-mode-auto');
    this.btnDay = document.getElementById('btn-mode-day');
    this.btnNight = document.getElementById('btn-mode-night');
    this.btnResetAuto = document.getElementById('btn-reset-auto');

    // Scrubber Drawer & Slider
    this.sliderToggleBtn = document.getElementById('slider-toggle-btn');
    this.scrubberDrawer = document.getElementById('time-scrubber-drawer');
    this.timeSlider = document.getElementById('time-slider');
    this.scrubberValueDisplay = document.getElementById('scrubber-value-display');
    this.scrubberPeriodTag = document.getElementById('scrubber-period-tag');

    // Navigation & Mobile
    this.mobileToggle = document.getElementById('mobile-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');

    // Filter Buttons & Grids
    this.skillTabs = document.querySelectorAll('.skill-tab');
    this.skillCards = document.querySelectorAll('.skill-card');
    this.projFilterBtns = document.querySelectorAll('.proj-filter-btn');
    this.projectCards = document.querySelectorAll('.project-card');

    // Modal
    this.modal = document.getElementById('project-modal');
    this.modalBody = document.getElementById('modal-body-content');

    // Toast Container
    this.toastContainer = document.getElementById('toast-container');
  }

  bindEvents() {
    // Time Mode Controls
    if (this.btnAuto) {
      this.btnAuto.addEventListener('click', () => this.switchMode('auto'));
    }
    if (this.btnDay) {
      this.btnDay.addEventListener('click', () => this.switchMode('day'));
    }
    if (this.btnNight) {
      this.btnNight.addEventListener('click', () => this.switchMode('night'));
    }
    if (this.btnResetAuto) {
      this.btnResetAuto.addEventListener('click', () => this.switchMode('auto'));
    }

    // Time Scrubber Drawer Toggle
    if (this.sliderToggleBtn && this.scrubberDrawer) {
      this.sliderToggleBtn.addEventListener('click', () => {
        this.scrubberDrawer.classList.toggle('open');
        this.sliderToggleBtn.classList.toggle('active');
      });
    }

    // Time Slider Scrub Event
    if (this.timeSlider) {
      this.timeSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        this.handleSliderChange(val);
      });
    }

    // Mobile Menu Toggle
    if (this.mobileToggle && this.navMenu) {
      this.mobileToggle.addEventListener('click', () => {
        this.navMenu.classList.toggle('mobile-active');
      });

      this.navLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.navMenu.classList.remove('mobile-active');
        });
      });
    }

    // Skills Filter Tabs
    this.skillTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-filter');
        this.filterSkills(filter);
      });
    });

    // Projects Filter Tabs
    this.projFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.projFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        this.filterProjects(filter);
      });
    });

    // Close Modal on Escape Key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });

    // Listen to Sky Engine Events to update Scrubber label
    window.addEventListener('skyChange', (e) => {
      const { hours, mins, phaseName } = e.detail;
      const formatted = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
      if (this.scrubberValueDisplay) {
        this.scrubberValueDisplay.textContent = `${formatted}`;
      }
      if (this.scrubberPeriodTag) {
        this.scrubberPeriodTag.textContent = phaseName;
      }
      if (this.timeSlider && window.skyEngine && window.skyEngine.mode === 'auto') {
        this.timeSlider.value = hours * 60 + mins;
      }
    });
  }

  switchMode(mode) {
    if (!window.skyEngine) return;

    [this.btnAuto, this.btnDay, this.btnNight].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });

    if (mode === 'auto') {
      if (this.btnAuto) this.btnAuto.classList.add('active');
      window.skyEngine.setMode('auto');
      this.showToast('Sincronizado com Horário Real da sua região ⏰', 'info');
    } else if (mode === 'day') {
      if (this.btnDay) this.btnDay.classList.add('active');
      window.skyEngine.setMode('day');
      if (this.timeSlider) this.timeSlider.value = 720;
      this.showToast('Modo Dia ativado: Sol radiante e nuvens ☀️', 'info');
    } else if (mode === 'night') {
      if (this.btnNight) this.btnNight.classList.add('active');
      window.skyEngine.setMode('night');
      if (this.timeSlider) this.timeSlider.value = 0;
      this.showToast('Modo Noite ativado: Lua e céu estrelado 🌙', 'info');
    }
  }

  handleSliderChange(minuteValue) {
    if (!window.skyEngine) return;

    [this.btnAuto, this.btnDay, this.btnNight].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });

    window.skyEngine.setMode('custom', minuteValue);
  }

  filterSkills(filter) {
    this.skillCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'flex';
        card.style.animation = 'slide-in-toast 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterProjects(filter) {
    this.projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'flex';
        card.style.animation = 'slide-in-toast 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }

  openProjectModal(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data || !this.modal || !this.modalBody) return;

    this.modalBody.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span class="badge-type" style="background: var(--accent-primary); color: #fff;">${data.category}</span>
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin: 12px 0 6px;">${data.title}</h2>
      </div>

      <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 24px;">
        ${data.description}
      </p>

      <h4 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 12px; color: var(--text-primary);">
        <i class="fa-solid fa-circle-check" style="color: var(--accent-primary);"></i> Principais Diferenciais:
      </h4>
      <ul style="list-style: none; padding: 0; margin-bottom: 28px; display: flex; flex-direction: column; gap: 10px;">
        ${data.features.map(f => `
          <li style="display: flex; align-items: center; gap: 10px; color: var(--text-secondary); font-size: 0.95rem;">
            <i class="fa-solid fa-chevron-right" style="color: var(--accent-primary); font-size: 0.8rem;"></i>
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>

      <div style="margin-bottom: 28px;">
        <h4 style="font-family: var(--font-heading); font-size: 1rem; margin-bottom: 10px; color: var(--text-primary);">
          Stack Utilizada:
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${data.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div style="display: flex; gap: 14px; flex-wrap: wrap; border-top: 1px solid var(--bg-card-border); padding-top: 20px;">
        <a href="${data.demoLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex-grow: 1;">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Ver Demo Online
        </a>
        <a href="${data.repoLink}" target="_blank" rel="noopener noreferrer" class="btn btn-glass" style="flex-grow: 1;">
          <i class="fa-brands fa-github"></i> Ver Código no GitHub
        </a>
      </div>
    `;

    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  showToast(message, type = 'success') {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 4000);
  }

  initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 150;
          const sectionId = current.getAttribute('id');
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            this.navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
              }
            });
          }
        });
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }
}

// Global functions for inline HTML calls
window.openProjectModal = function(id) {
  if (window.portfolio) {
    window.portfolio.openProjectModal(id);
  }
};

window.closeProjectModal = function() {
  if (window.portfolio) {
    window.portfolio.closeModal();
  }
};

window.closeProjectModalOnOverlay = function(e) {
  if (e.target.id === 'project-modal') {
    window.closeProjectModal();
  }
};

window.copyToClipboard = function(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    if (window.portfolio) {
      window.portfolio.showToast(`Copiado para a área de transferência! 📋`, 'success');
    }
    if (btnElement) {
      const originalHtml = btnElement.innerHTML;
      btnElement.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
      setTimeout(() => {
        btnElement.innerHTML = originalHtml;
      }, 2000);
    }
  });
};

window.handleFormSubmit = function(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = document.getElementById('btn-submit-form');
  const feedback = document.getElementById('form-feedback');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando Mensagem...';
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Mensagem Enviada!</span> <i class="fa-solid fa-check"></i>';
    }

    if (feedback) {
      feedback.className = 'form-feedback-message success';
      feedback.innerHTML = '✨ Sua mensagem foi enviada com sucesso! Responderei em breve.';
    }

    if (window.portfolio) {
      window.portfolio.showToast('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
    }

    form.reset();

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Enviar Mensagem</span> <i class="fa-solid fa-paper-plane"></i>';
      }
      if (feedback) {
        feedback.style.display = 'none';
      }
    }, 4000);
  }, 1200);
};

// Initialize on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  window.portfolio = new PortfolioApp();
});
