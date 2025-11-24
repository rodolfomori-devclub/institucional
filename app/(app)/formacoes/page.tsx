import { generateSEO } from '@/components/SEO'
import { formacoes } from '@/lib/formacoes'
import Link from 'next/link'
import TechIcon from '@/components/TechIcon'

// Mapeamento de tecnologias para ícones do Devicon
function getTechIcon(tech: string): string {
  const iconMap: { [key: string]: string } = {
    'HTML': 'html5/html5-original.svg',
    'CSS': 'css3/css3-original.svg',
    'JavaScript': 'javascript/javascript-original.svg',
    'React': 'react/react-original.svg',
    'Next.js': 'nextjs/nextjs-original.svg',
    'Node.js': 'nodejs/nodejs-original.svg',
    'MongoDB': 'mongodb/mongodb-original.svg',
    'PostgreSQL': 'postgresql/postgresql-original.svg',
    'TypeScript': 'typescript/typescript-original.svg',
    'Tailwind CSS': 'tailwindcss/tailwindcss-original.svg',
    'Express': 'express/express-original.svg',
    'Docker': 'docker/docker-original.svg',
    'AWS': 'amazonwebservices/amazonwebservices-original-wordmark.svg',
    'React Native': 'react/react-original.svg',
    'Expo': 'expo/expo-original.svg',
    'Firebase': 'firebase/firebase-plain.svg',
  }

  return iconMap[tech] || 'devicon/devicon-original.svg'
}

export const metadata = generateSEO({
  title: 'Formações em Programação - DevClub',
  description: 'Escolha sua formação em tecnologia: Fullstack, Front-end, Back-end ou Mobile. Aprenda com mentoria ao vivo e projetos práticos.',
  url: 'https://devclub.com.br/formacoes',
  keywords: [
    'formação fullstack',
    'curso react',
    'curso node.js',
    'formação front-end',
    'formação back-end',
    'curso react native',
    'formação em programação',
  ],
})

export default function FormacoesPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Escolha sua formação em tecnologia
            </h1>
            <p className="text-lg sm:text-xl text-gray-200">
              Trilhas completas de aprendizado com mentoria ao vivo, projetos práticos 
              e certificado reconhecido pelo mercado.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formacoes.map((formacao) => (
              <article
                key={formacao.slug}
                className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700 cursor-pointer"
              >
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {formacao.title}
                  </h2>
                  <p className="text-gray-300 mb-6">
                    {formacao.description}
                  </p>
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-400 mb-2">Tecnologias:</p>
                    <div className="flex flex-wrap gap-3">
                      {formacao.technologies.slice(0, 5).map((tech) => (
                        <TechIcon key={tech} tech={tech} iconPath={getTechIcon(tech)} />
                      ))}
                      {formacao.technologies.length > 5 && (
                        <div className="flex items-center px-3 py-2 bg-gray-700 text-gray-200 text-sm rounded-lg border border-gray-600">
                          +{formacao.technologies.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Link
                      href={`/formacoes/${formacao.slug}`}
                      className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200 cursor-pointer"
                    >
                      Ver detalhes
                      <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                    <a
                      href="https://rodolfomori.typeform.com/to/rQb1MBt5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors duration-200 border border-gray-600 cursor-pointer"
                    >
                      Falar com especialista
                      <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 bg-gray-800 rounded-2xl p-8 text-center border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              Não sabe qual formação escolher?
            </h2>
            <p className="text-gray-300 mb-6">
              Converse com nossos consultores e descubra o melhor caminho para sua carreira
            </p>
            <a
              href="https://rodolfomori.typeform.com/to/rQb1MBt5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200 cursor-pointer"
            >
              Falar com especialista
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}