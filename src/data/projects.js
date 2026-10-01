export const PROJECTS_DATA = {
  proj1: {
    id: "proj1",
    title: "Sistema Integrado de Automação & Workflows",
    category: "Full Stack & Automação de Processos",
    badgeType: "Full Stack",
    isFeatured: true,
    bannerClass: "project-banner-1",
    artIcon: "fa-diagram-project",
    shortDescription: "Plataforma de orquestração de fluxos automatizados integrando APIs RESTful, n8n, Typebot e banco de dados MySQL para gestão de leads e processos.",
    description: `
      Solução desenvolvida para otimizar o fluxo de atendimento e automação corporativa. O sistema combina Webhooks, integrações via n8n e Typebot com um painel administrativo em React para monitoramento de métricas e status de execuções em tempo real.
    `,
    features: [
      "Integração de serviços externos via APIs RESTful com segurança OAuth2",
      "Fluxos de automação n8n e chatbots inteligentes com Typebot",
      "Dashboard de acompanhamento desenvolvido em React.js e Node.js",
      "Estruturação de banco de dados MySQL com rotinas otimizadas CRUD"
    ],
    tags: ["n8n", "Typebot", "React.js", "Node.js", "MySQL", "APIs RESTful", "Docker"],
    demoLink: "https://github.com/lucasspessoadev",
    repoLink: "https://github.com/lucasspessoadev",
    filterCategory: "fullstack"
  },
  proj2: {
    id: "proj2",
    title: "Spring Boot Enterprise Banking API",
    category: "Back-End & Arquitetura Java",
    badgeType: "Back-End",
    isFeatured: true,
    bannerClass: "project-banner-2",
    artIcon: "fa-building-columns",
    shortDescription: "API RESTful financeira robusta construída em Java 17 e Spring Boot com autenticação JWT, controle transacional e arquitetura em camadas.",
    description: `
      API corporativa orientada ao segmento financeiro. Implementa operações bancárias (transferências, saldos, extratos), validação rigorosa de regras de negócio, tratamento centralizado de exceções e testes unitários.
    `,
    features: [
      "Arquitetura em camadas (Controller, Service, Repository, DTOs)",
      "Autenticação e autorização segura com Spring Security e JWT",
      "Persistência de dados em MySQL utilizando Spring Data JPA / Hibernate",
      "Deploy e conteinerização automatizada com Docker e AWS EC2"
    ],
    tags: ["Java", "Spring Boot", "Spring Security", "MySQL", "Maven", "Docker", "AWS"],
    demoLink: "https://github.com/lucasspessoadev",
    repoLink: "https://github.com/lucasspessoadev",
    filterCategory: "fullstack"
  },
  proj3: {
    id: "proj3",
    title: "FinDash - Gestão Financeira Inteligente",
    category: "Web Application & Analytics",
    badgeType: "Web App",
    isFeatured: false,
    bannerClass: "project-banner-3",
    artIcon: "fa-chart-pie",
    shortDescription: "Painel web interativo para controle de finanças pessoais e corporativas com relatórios gráficos, cálculo de metas e projeções de fluxo de caixa.",
    description: `
      Aplicação focada na gestão e clareza financeira. Oferece dashboards dinâmicos para lançamento de receitas/despesas, categorização automatizada, exportação de dados e análise de histórico orçamentário.
    `,
    features: [
      "Interface moderna e responsiva construída com React.js e CSS3",
      "Gráficos interativos para visualização de despesas por categoria",
      "Backend RESTful em Node.js com rotas CRUD e tratamento de erros",
      "Armazenamento e modelagem de dados relacionais em MySQL"
    ],
    tags: ["React.js", "Node.js", "JavaScript (ES6+)", "MySQL", "CSS3", "HTML5"],
    demoLink: "https://github.com/lucasspessoadev",
    repoLink: "https://github.com/lucasspessoadev",
    filterCategory: "web"
  },
  proj4: {
    id: "proj4",
    title: "EcoStore Full Stack E-Commerce",
    category: "Web App & E-Commerce",
    badgeType: "Full Stack",
    isFeatured: false,
    bannerClass: "project-banner-4",
    artIcon: "fa-cart-shopping",
    shortDescription: "Plataforma completa de comércio eletrônico com catálogo dinâmico de produtos, carrinho de compras, cálculo de frete e integração de checkout.",
    description: `
      Sistema e-commerce funcional cobrindo todo o ciclo de compra: navegação por categorias, busca com filtros dinâmicos, gerenciamento de carrinho e painel administrativo para gestão de estoque.
    `,
    features: [
      "Catálogo dinâmico renderizado com React.js e componentização modular",
      "API backend em PHP / Node.js com persistência em MySQL",
      "Gerenciamento de estado e sessão do usuário",
      "Layout 100% responsivo para mobile, tablet e desktop"
    ],
    tags: ["React.js", "PHP", "Node.js", "MySQL", "HTML5", "CSS3"],
    demoLink: "https://github.com/lucasspessoadev",
    repoLink: "https://github.com/lucasspessoadev",
    filterCategory: "web"
  },
  proj5: {
    id: "proj5",
    title: "ServiceDesk TI & Chamados",
    category: "Automação & Gestão de TI",
    badgeType: "UI & Mobile",
    isFeatured: false,
    bannerClass: "project-banner-5",
    artIcon: "fa-headset",
    shortDescription: "Sistema interno de abertura e gerenciamento de tickets de suporte de TI com triagem automática via chatbot e painel Kanban.",
    description: `
      Solução desenvolvida para otimizar o atendimento de equipes de TI. Utiliza Typebot para triagem inicial do usuário e direciona chamados para um quadro Kanban de atendimento em tempo real.
    `,
    features: [
      "Triagem e pré-atendimento inteligente com Typebot",
      "Quadro Kanban interativo para acompanhamento de chamados",
      "Notificações automáticas via automação n8n",
      "Relatórios de tempo médio de atendimento (SLA)"
    ],
    tags: ["n8n", "Typebot", "JavaScript", "HTML5", "CSS3", "Kanban"],
    demoLink: "https://github.com/lucasspessoadev",
    repoLink: "https://github.com/lucasspessoadev",
    filterCategory: "ui"
  },
  proj6: {
    id: "proj6",
    title: "AWS & Docker Microservices Hub",
    category: "Cloud, DevOps & Microserviços",
    badgeType: "DevOps",
    isFeatured: false,
    bannerClass: "project-banner-6",
    artIcon: "fa-cloud-arrow-up",
    shortDescription: "Arquitetura de microsserviços conteinerizados com Docker Compose e deploy em nuvem AWS (EC2 e S3) com versionamento via Git/GitHub.",
    description: `
      Projeto prático de infraestrutura e Cloud. Demonstra o empacotamento de aplicações Java e Node.js em containers Docker isolados, orquestração e hospedagem segura na nuvem AWS.
    `,
    features: [
      "Criação e otimização de Dockerfiles multi-stage build",
      "Orquestração de ambiente completo com Docker Compose",
      "Configuração de instâncias AWS EC2 e buckets S3 para arquivos",
      "Pipelines de versionamento e boas práticas com Git/Maven"
    ],
    tags: ["AWS", "Docker", "Java", "Node.js", "Git", "Maven", "Linux"],
    demoLink: "https://github.com/lucasspessoadev",
    repoLink: "https://github.com/lucasspessoadev",
    filterCategory: "fullstack"
  }
};
