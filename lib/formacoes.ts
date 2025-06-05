export interface Formacao {
  slug: string
  title: string
  description: string
  duration: string
  level: string
  technologies: string[]
  image: string
  price: string
  features: string[]
  curriculum: {
    module: string
    topics: string[]
  }[]
}

export const formacoes: Formacao[] = [
  {
    slug: 'fullstack-javascript',
    title: 'Formação Fullstack JavaScript',
    description: 'Domine o desenvolvimento web completo com JavaScript. Aprenda desde o front-end com React até o back-end com Node.js, incluindo bancos de dados e deploy.',
    duration: '8 meses',
    level: 'Iniciante a Avançado',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL'],
    image: '/formacoes/fullstack-js.jpg',
    price: 'R$ 397/mês',
    features: [
      'Mais de 400 horas de conteúdo',
      'Projetos práticos do mundo real',
      'Mentoria ao vivo semanal',
      'Certificado reconhecido',
      'Acesso vitalício ao conteúdo',
      'Comunidade exclusiva',
    ],
    curriculum: [
      {
        module: 'Fundamentos Web',
        topics: ['HTML5 Semântico', 'CSS3 Avançado', 'JavaScript ES6+', 'Git e GitHub'],
      },
      {
        module: 'Front-end com React',
        topics: ['React Fundamentals', 'Hooks e Context API', 'Redux', 'Next.js e SSR'],
      },
      {
        module: 'Back-end com Node.js',
        topics: ['Node.js e Express', 'APIs RESTful', 'Autenticação JWT', 'Testes automatizados'],
      },
      {
        module: 'Bancos de Dados',
        topics: ['MongoDB', 'PostgreSQL', 'Prisma ORM', 'Redis'],
      },
    ],
  },
  {
    slug: 'frontend-react',
    title: 'Formação Front-end React',
    description: 'Especialize-se em desenvolvimento front-end moderno com React. Crie interfaces incríveis e aplicações web performáticas.',
    duration: '6 meses',
    level: 'Iniciante a Intermediário',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS'],
    image: '/formacoes/frontend-react.jpg',
    price: 'R$ 297/mês',
    features: [
      'Mais de 300 horas de conteúdo',
      'Foco em projetos práticos',
      'Mentoria especializada',
      'Portfolio profissional',
      'Preparação para entrevistas',
      'Suporte da comunidade',
    ],
    curriculum: [
      {
        module: 'Base Sólida',
        topics: ['HTML5 e Acessibilidade', 'CSS3 e Responsividade', 'JavaScript Moderno', 'Versionamento com Git'],
      },
      {
        module: 'React do Zero ao Avançado',
        topics: ['Componentes e Props', 'Estado e Ciclo de Vida', 'Hooks Avançados', 'Performance e Otimização'],
      },
      {
        module: 'Ecossistema React',
        topics: ['React Router', 'Gerenciamento de Estado', 'Styled Components', 'Testes com Jest'],
      },
      {
        module: 'Projetos Profissionais',
        topics: ['E-commerce completo', 'Dashboard administrativo', 'App de streaming', 'PWA'],
      },
    ],
  },
  {
    slug: 'backend-nodejs',
    title: 'Formação Back-end Node.js',
    description: 'Torne-se um especialista em desenvolvimento back-end com Node.js. Construa APIs robustas e escaláveis.',
    duration: '6 meses',
    level: 'Intermediário',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
    image: '/formacoes/backend-node.jpg',
    price: 'R$ 347/mês',
    features: [
      'Mais de 350 horas de conteúdo',
      'Arquitetura de microsserviços',
      'DevOps e deploy',
      'Segurança em APIs',
      'Projetos empresariais',
      'Mentoria com experts',
    ],
    curriculum: [
      {
        module: 'Node.js Fundamentals',
        topics: ['JavaScript assíncrono', 'Event Loop', 'Streams e Buffers', 'NPM e módulos'],
      },
      {
        module: 'APIs RESTful',
        topics: ['Express.js', 'Middlewares', 'Autenticação e Autorização', 'Documentação com Swagger'],
      },
      {
        module: 'Bancos de Dados',
        topics: ['SQL com PostgreSQL', 'NoSQL com MongoDB', 'ORMs e ODMs', 'Migrations e Seeds'],
      },
      {
        module: 'Deploy e DevOps',
        topics: ['Docker', 'CI/CD', 'AWS Services', 'Monitoramento e Logs'],
      },
    ],
  },
  {
    slug: 'mobile-react-native',
    title: 'Formação Mobile React Native',
    description: 'Desenvolva aplicativos móveis nativos para iOS e Android usando React Native.',
    duration: '5 meses',
    level: 'Intermediário',
    technologies: ['React Native', 'JavaScript', 'TypeScript', 'Expo', 'Firebase'],
    image: '/formacoes/mobile-rn.jpg',
    price: 'R$ 347/mês',
    features: [
      'Mais de 280 horas de conteúdo',
      'Apps para iOS e Android',
      'Integração com APIs nativas',
      'Publicação nas lojas',
      'Monetização de apps',
      'Projetos comerciais',
    ],
    curriculum: [
      {
        module: 'Fundamentos Mobile',
        topics: ['React Native basics', 'Componentes nativos', 'Navegação', 'Expo workflow'],
      },
      {
        module: 'Interface e UX',
        topics: ['Animações', 'Gestos', 'Design responsivo', 'Temas e estilos'],
      },
      {
        module: 'Funcionalidades Nativas',
        topics: ['Câmera e galeria', 'Geolocalização', 'Push notifications', 'Armazenamento local'],
      },
      {
        module: 'Publicação e Distribuição',
        topics: ['Build e deploy', 'App Store', 'Google Play', 'Updates OTA'],
      },
    ],
  },
]

export function getFormacaoBySlug(slug: string): Formacao | undefined {
  return formacoes.find(f => f.slug === slug)
}