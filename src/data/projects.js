export const PROJECTS_DATA = {
  proj1: {
    id: "proj1",
    title: "Entrennection — Plataforma para Microempreendedores",
    category: "Plataforma Web & Ecossistema Colaborativo",
    badgeType: "Full Stack",
    isFeatured: true,
    bannerClass: "project-banner-1",
    image: "/img/Entrennection.png",
    artIcon: "fa-handshake-angle",
    shortDescription: "Plataforma inovadora voltada a conectar microempreendedores, promover suporte financeiro, gestão de pessoas e parcerias estratégicas para o crescimento conjunto.",
    description: `
      O Entrennection é uma plataforma colaborativa desenvolvida para auxiliar microempreendedores a superarem desafios de gestão e alcançarem o sucesso em seus negócios. A solução fornece suporte financeiro, gestão orçamentária, gestão de pessoas, implementação de novas ferramentas e tecnologias, além de negociação. A ideia central é criar um ambiente dinâmico onde os empreendedores possam se cadastrar, selecionar suas áreas de interesse e estabelecer parcerias estratégicas, impulsionando o aprendizado, a inovação e o desenvolvimento em comunidade.
    `,
    features: [
      "Ambiente de matchmaking e parcerias estratégicas entre microempreendedores por áreas de interesse",
      "Módulos integrados para Gestão Orçamentária e Suporte Financeiro inteligente",
      "Hub de ferramentas para Gestão de Pessoas e implementação de novas tecnologias",
      "Oportunidades de aprendizado contínuo, negociação e fortalecimento comunitário",
      "Interface responsiva, moderna e otimizada para facilidade de uso em qualquer dispositivo"
    ],
    tags: ["React.js", "JavaScript (ES6+)", "Vercel", "Gestão Financeira", "HTML5", "CSS3", "UX/UI Design"],
    demoLink: "https://entrennection.vercel.app/",
    repoLink: "https://github.com/Entrennection/Entrennection",
    filterCategory: "fullstack"
  },
  proj2: {
    id: "proj2",
    title: "Weather API App — Previsão do Tempo Global",
    category: "Aplicações Web & APIs",
    badgeType: "Web App",
    isFeatured: true,
    bannerClass: "project-banner-2",
    image: "/img/wheather.png",
    artIcon: "fa-cloud-sun-rain",
    shortDescription: "Aplicativo web responsivo de previsão do tempo em tempo real para qualquer cidade do mundo, com métricas detalhadas e tema visual dinâmico por temperatura.",
    description: `
      O Weather API App é uma aplicação de previsão do tempo interativa e precisa que consome dados meteorológicos em tempo real. O aplicativo permite buscar qualquer cidade globalmente e fornece informações detalhadas como temperatura instantânea, umidade relativa do ar e velocidade do vento. Conta com ícones visuais inteligentes adaptados às condições climáticas atuais e um sistema exclusivo de Tema Dinâmico, onde as cores de fundo do cartão alteram-se automaticamente de acordo com a variação de temperatura.
    `,
    features: [
      "Busca instantânea de informações climáticas de qualquer cidade do mundo",
      "Exibição detalhada de métricas: Temperatura, Umidade do ar e Velocidade do Vento",
      "Ícones visuais dinâmicos correspondentes às condições meteorológicas atuais (sol, chuva, nuvens)",
      "Tema Dinâmico: alternância automática das cores do cartão com base no nível de temperatura",
      "Construção assíncrona ultra-rápida e layout responsivo adaptado para mobile e desktop"
    ],
    tags: ["JavaScript (ES6+)", "REST API", "Fetch API", "HTML5", "CSS3", "Git & GitHub Pages"],
    demoLink: "https://lucasspessoadev.github.io/Weather/",
    repoLink: "https://github.com/lucasspessoadev/Weather",
    filterCategory: "web"
  },
  proj3: {
    id: "proj3",
    title: "DoaStock – Gestão de Inventário e Doações",
    category: "Full Stack Serverless (Python & FastAPI)",
    badgeType: "Full Stack",
    isFeatured: true,
    bannerClass: "project-banner-3",
    image: "/img/doastock.png",
    artIcon: "fa-boxes-stacked",
    shortDescription: "Plataforma PWA serverless em Python (FastAPI) e Supabase (PostgreSQL) para controle de inventário social com alertas via Cron Jobs, SendGrid e leitor de código de barras.",
    description: `
      O DoaStock é uma solução PWA em arquitetura Serverless projetada para otimizar o inventário e a distribuição de doações em organizações sociais. Desenvolvida com backend em Python 3.12 (FastAPI) hospedado na Vercel e banco de dados PostgreSQL 16 via Supabase, a plataforma possui autenticação JWT + bcrypt, e-mails transacionais de alertas de validade via SendGrid com agendamento via Vercel Cron Jobs (diariamente às 6h), leitor de código de barras (EAN-13 / QR Code) via câmera do celular e módulo público para doadores.
      
      Responsabilidade no Projeto (Lucas Silva Pessoa): Desenvolvimento completo da Interface de Usuário (UI) & Design System em HTML5/CSS3 customizado.
    `,
    features: [
      "Arquitetura Serverless: Backend Python 3.12 + FastAPI e Banco de Dados PostgreSQL 16 via Supabase",
      "Interface & Design System: Desenvolvimento do layout e estilização customizada (HTML5, CSS3, JavaScript ES2024)",
      "Autenticação e Segurança: Controle de acesso seguro via JWT (PyJWT) + bcrypt",
      "E-mails Transacionais & Cron Jobs: Alertas diários de validade às 6h automatizados via SendGrid e Vercel Cron",
      "Leitor de Código de Barras / QR Code: Captura rápida de suprimentos diretamente pela câmera do dispositivo",
      "Módulo Público: Canal sem autenticação para doadores consultarem necessidades urgentes em tempo real",
      "Credenciais de Acesso (Demo): Email: vini@gmail.com | Senha: Vini1234"
    ],
    tags: ["Python 3.12", "FastAPI", "PostgreSQL", "Supabase", "Vercel Serverless", "SendGrid", "JWT", "CSS3 / Design"],
    demoLink: "https://doastock.vercel.app/",
    repoLink: "https://github.com/gui23x/doastock-inventory",
    filterCategory: "fullstack"
  },
  proj4: {
    id: "proj4",
    title: "Instagram Clone",
    category: "Front-End & UI Componentization",
    badgeType: "Web App",
    isFeatured: true,
    bannerClass: "project-banner-4",
    image: "/img/instagram.png",
    artIcon: "fa-camera-retro",
    shortDescription: "Aplicação web desenvolvida em React.js e Node.js reproduzindo fielmente a interface gráfica do Instagram, com feed de posts, fotos e área de comentários.",
    description: `
      O Instagram Clone é um projeto de desenvolvimento web front-end construído com React.js e Node.js com o objetivo de recriar a experiência e a estética visual da rede social Instagram. A aplicação simula o fluxo principal da plataforma, apresentando um feed de notícias dinâmico com fotos, perfil de usuário, contador de curtidas, legendas e funcionalidade para inclusão e exibição de comentários. O projeto demonstra domínio em arquitetura baseada em componentes, gerenciamento de estado e estilização moderna.
    `,
    features: [
      "Feed de publicações dinâmico com suporte a fotos, avatares e nomes de usuário",
      "Interface responsiva com alta fidelidade ao design original do Instagram",
      "Sistema de curtidas e seção interativa de comentários para cada postagem",
      "Componentização modular avançada com React.js para reutilização de elementos de UI",
      "Estrutura leve e de alta performance de renderização no navegador"
    ],
    tags: ["React.js", "Node.js", "JavaScript (ES6+)", "CSS3", "HTML5", "UI/UX Design"],
    demoLink: "https://instagram-drab-omega.vercel.app/",
    repoLink: "https://github.com/lucasspessoadev/Instagram-clone",
    filterCategory: "web"
  }
};
