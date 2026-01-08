'use client'

import { generateSEO } from '@/components/SEO'
import Link from 'next/link'
import { useState } from 'react'

// Ícones para as tecnologias
const techIcons: { [key: string]: string } = {
  'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'Redux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'Prisma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
  'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'n8n': 'https://n8n.io/favicon.ico',
  'ChatGPT': 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
  'Claude': 'https://claude.ai/favicon.ico',
  'Gemini': 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
  'OpenAI': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
  'AI': 'https://cdn-icons-png.flaticon.com/512/8637/8637099.png',
}

const formacoes = [
  {
    id: 'fullstack',
    title: 'Formação Fullstack JavaScript',
    subtitle: 'DevClub',
    description: 'Domine o desenvolvimento web completo com JavaScript. Aprenda desde o front-end com React até o back-end com Node.js, incluindo bancos de dados e deploy.',
    level: 'Iniciante a Avançado',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: 'from-primary to-emerald-400',
    borderColor: 'border-primary/30',
    glowColor: 'shadow-primary/20',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Git', 'Redux', 'Prisma', 'Redis'],
    features: [
      'Mais de 400 horas de conteúdo',
      'Projetos práticos do mundo real',
      'Mentoria ao vivo semanal',
      'Certificado reconhecido',
      'Acesso vitalício ao conteúdo',
      'Comunidade exclusiva',
    ],
    curriculum: [
      { module: 'Fundamentos Web', topics: ['HTML5 Semântico', 'CSS3 Avançado', 'JavaScript ES6+', 'Git e GitHub'] },
      { module: 'Front-end com React', topics: ['React Fundamentals', 'Hooks e Context API', 'Redux', 'Next.js e SSR'] },
      { module: 'Back-end com Node.js', topics: ['Node.js e Express', 'APIs RESTful', 'Autenticação JWT', 'Testes automatizados'] },
      { module: 'Bancos de Dados', topics: ['MongoDB', 'PostgreSQL', 'Prisma ORM', 'Redis'] },
    ],
    cta: 'Matricular agora',
    link: 'https://go.rodolfomori.com.br/comercial',
  },
  {
    id: 'iaclub',
    title: 'Formação IAClub',
    subtitle: 'Inteligência Artificial',
    description: 'Domine automações com IA usando n8n, ChatGPT, Claude, Gemini e as principais IAs do mercado. Crie agentes inteligentes e automatize processos.',
    level: 'Iniciante a Avançado',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 0l2-2m-2 2l-2-2" />
      </svg>
    ),
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/30',
    glowColor: 'shadow-purple-500/20',
    technologies: ['n8n', 'ChatGPT', 'Claude', 'Gemini', 'OpenAI', 'AI'],
    features: [
      'Automações com n8n do zero',
      'Integração com ChatGPT e IAs',
      'Criação de Agentes Inteligentes',
      'Automação de processos',
      'Projetos práticos de mercado',
      'Comunidade IAClub',
    ],
    curriculum: [
      { module: 'Fundamentos de IA', topics: ['Introdução à IA', 'Prompt Engineering', 'APIs de IA', 'ChatGPT avançado'] },
      { module: 'Automação com n8n', topics: ['n8n do zero', 'Workflows avançados', 'Integrações', 'Triggers e webhooks'] },
      { module: 'Agentes Inteligentes', topics: ['Criação de agentes', 'Memória e contexto', 'Multi-agentes', 'Deploy'] },
      { module: 'Projetos Reais', topics: ['Automação de vendas', 'Atendimento com IA', 'Análise de dados', 'Integrações empresariais'] },
    ],
    cta: 'Quero dominar IA',
    link: 'https://go.rodolfomori.com.br/comercial',
  },
]

export default function FormacoesPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-sm font-medium">Transforme sua carreira</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Escolha sua{' '}
              <span className="relative">
                <span className="gradient-text">formação</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 2 150 2 198 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0">
                      <stop stopColor="#00FF88"/>
                      <stop offset="1" stopColor="#00D4FF"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              {' '}em tecnologia
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Trilhas completas de aprendizado com mentoria ao vivo, projetos práticos
              e certificado reconhecido pelo mercado.
            </p>
          </div>
        </div>
      </section>

      {/* Formações Cards */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
            {formacoes.map((formacao, index) => (
              <article
                key={formacao.id}
                className={`group relative rounded-3xl overflow-hidden transition-all duration-500 h-full ${
                  hoveredCard === formacao.id ? 'scale-[1.02]' : ''
                }`}
                onMouseEnter={() => setHoveredCard(formacao.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${formacao.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`absolute inset-0 bg-gray-900/95 backdrop-blur-xl`} />

                {/* Border Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl border-2 ${formacao.borderColor} group-hover:border-opacity-100 transition-all duration-500`} />
                <div className={`absolute inset-0 rounded-3xl shadow-2xl ${formacao.glowColor} group-hover:shadow-3xl transition-shadow duration-500`} />

                {/* Content */}
                <div className="relative p-8 lg:p-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${formacao.color} text-white shadow-lg`}>
                      {formacao.icon}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${formacao.color} text-white`}>
                        {formacao.subtitle}
                      </span>
                      <span className="text-xs text-gray-500">{formacao.level}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                    {formacao.title}
                  </h2>
                  <p className="text-gray-400 mb-6 leading-relaxed min-h-[72px]">
                    {formacao.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Tecnologias</p>
                    <div className="flex flex-wrap gap-2">
                      {formacao.technologies.slice(0, 6).map((tech) => (
                        <div
                          key={tech}
                          className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                        >
                          {techIcons[tech] && (
                            <img src={techIcons[tech]} alt={tech} className="w-4 h-4" />
                          )}
                          <span className="text-xs text-gray-300">{tech}</span>
                        </div>
                      ))}
                      {formacao.technologies.length > 6 && (
                        <div className="flex items-center px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
                          <span className="text-xs text-gray-400">+{formacao.technologies.length - 6}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8 flex-grow">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {formacao.features.slice(0, 6).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                          <svg className="w-4 h-4 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <a
                      href={formacao.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r ${formacao.color} text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1`}
                    >
                      {formacao.cta}
                      <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                    <a
                      href="https://rodolfomori.typeform.com/to/rQb1MBt5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-gray-800/50 text-white font-medium rounded-xl border border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300"
                    >
                      <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Falar com especialista
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10" />
              <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-xl" />
              <div className="absolute inset-0 rounded-3xl border border-gray-700/50" />

              <div className="relative p-8 lg:p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-500 text-white mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Não sabe qual formação escolher?
                </h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                  Converse com nossos consultores e descubra o melhor caminho para sua carreira.
                  Atendimento personalizado para entender seus objetivos.
                </p>

                <a
                  href="https://rodolfomori.typeform.com/to/rQb1MBt5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-emerald-400 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Falar com especialista
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
