import { generateSEO } from '@/components/SEO'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = generateSEO({
  title: 'Comunidade DevClub - Conecte-se com Desenvolvedores',
  description: 'Faça parte da maior comunidade de desenvolvedores do Brasil. Participe de eventos, lives, projetos colaborativos e networking.',
  url: 'https://devclub.com.br/comunidade',
  keywords: [
    'comunidade de desenvolvedores',
    'networking tecnologia',
    'eventos de programação',
    'projetos open source',
    'DevClub comunidade',
  ],
})

export default function ComunidadePage() {
  const studentProjects = [
    {
      title: 'E-commerce Sustentável',
      author: 'Maria Oliveira',
      description: 'Marketplace de produtos sustentáveis com sistema de pontos por reciclagem',
      image: '/projects/ecommerce.jpg',
      github: 'https://github.com/mariaoliveira/eco-shop',
      demo: 'https://eco-shop.vercel.app',
    },
    {
      title: 'App de Saúde Mental',
      author: 'João Pedro',
      description: 'Aplicativo para monitoramento de humor e meditações guiadas',
      image: '/projects/mental-health.jpg',
      github: 'https://github.com/joaopedro/mindful-app',
      demo: 'https://mindful-app.vercel.app',
    },
    {
      title: 'Plataforma de Estudos',
      author: 'Ana Costa',
      description: 'Sistema de gestão de estudos com técnica Pomodoro integrada',
      image: '/projects/study-platform.jpg',
      github: 'https://github.com/anacosta/study-flow',
      demo: 'https://study-flow.vercel.app',
    },
  ]

  const communityStats = [
    { label: 'Membros ativos', value: '10.000+' },
    { label: 'Projetos criados', value: '5.000+' },
    { label: 'Eventos realizados', value: '200+' },
    { label: 'Horas de conteúdo', value: '1.000+' },
  ]

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Faça parte da comunidade DevClub
            </h1>
            <p className="text-lg sm:text-xl text-gray-200">
              Conecte-se com milhares de desenvolvedores, participe de eventos exclusivos 
              e construa projetos incríveis junto com a nossa comunidade.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Projetos da comunidade
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {studentProjects.map((project, index) => (
              <article key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-primary-600 mb-3">por {project.author}</p>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Código
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      Demo
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://github.com/devclub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              Ver todos os projetos no GitHub
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Onde você nos encontra
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <a
              href="https://discord.gg/devclub"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5865F2] text-white p-6 rounded-xl hover:shadow-lg transition-shadow text-center group"
            >
              <svg className="h-12 w-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
              </svg>
              <h3 className="text-xl font-bold mb-2">Discord</h3>
              <p className="text-white/80">+5.000 membros ativos</p>
              <p className="text-sm mt-2 group-hover:underline">Entrar no servidor →</p>
            </a>

            <a
              href="https://youtube.com/devclub"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF0000] text-white p-6 rounded-xl hover:shadow-lg transition-shadow text-center group"
            >
              <svg className="h-12 w-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <h3 className="text-xl font-bold mb-2">YouTube</h3>
              <p className="text-white/80">Lives toda semana</p>
              <p className="text-sm mt-2 group-hover:underline">Inscrever-se →</p>
            </a>

            <a
              href="https://github.com/devclub"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 text-white p-6 rounded-xl hover:shadow-lg transition-shadow text-center group"
            >
              <svg className="h-12 w-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <h3 className="text-xl font-bold mb-2">GitHub</h3>
              <p className="text-white/80">Projetos open source</p>
              <p className="text-sm mt-2 group-hover:underline">Contribuir →</p>
            </a>

            <a
              href="https://instagram.com/devclub"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white p-6 rounded-xl hover:shadow-lg transition-shadow text-center group"
            >
              <svg className="h-12 w-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
              </svg>
              <h3 className="text-xl font-bold mb-2">Instagram</h3>
              <p className="text-white/80">Conteúdo diário</p>
              <p className="text-sm mt-2 group-hover:underline">Seguir →</p>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Pronto para fazer parte?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Entre para a comunidade DevClub e acelere sua jornada na programação
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/formacoes"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-600 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Começar agora
              </Link>
              <a
                href="https://discord.gg/devclub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800 transition-colors duration-200"
              >
                Entrar no Discord
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}