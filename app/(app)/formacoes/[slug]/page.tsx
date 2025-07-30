import { generateSEO } from '@/components/SEO'
import { formacoes, getFormacaoBySlug } from '@/lib/formacoes'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  return formacoes.map((formacao) => ({
    slug: formacao.slug,
  }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const formacao = getFormacaoBySlug(params.slug)
  
  if (!formacao) {
    return {}
  }

  return generateSEO({
    title: `${formacao.title} - Formação Completa`,
    description: formacao.description,
    url: `https://devclub.com.br/formacoes/${formacao.slug}`,
    keywords: [
      formacao.title.toLowerCase(),
      ...formacao.technologies.map(t => `curso ${t.toLowerCase()}`),
      'formação em programação',
      'curso de tecnologia',
    ],
  })
}

export default function FormacaoPage({ params }: { params: { slug: string } }) {
  const formacao = getFormacaoBySlug(params.slug)

  if (!formacao) {
    notFound()
  }

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-sm text-primary mb-4">
                <Link href="/formacoes" className="hover:underline">
                  Formações
                </Link>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <span className="text-gray-300">{formacao.title}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                {formacao.title}
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                {formacao.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400">Duração</p>
                  <p className="text-lg font-semibold text-white">{formacao.duration}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400">Nível</p>
                  <p className="text-lg font-semibold text-white">{formacao.level}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#matricula"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Matricular agora
                </a>
                <a
                  href="https://rodolfomori.typeform.com/to/rQb1MBt5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary bg-gray-800 border-2 border-primary rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Falar com especialista
                </a>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {formacao.title}
                </h3>
                <p className="text-gray-300">
                  Formação completa para transformar sua carreira
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            O que você vai aprender
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {formacao.curriculum.map((module, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">
                  {module.module}
                </h3>
                <ul className="space-y-2">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start">
                      <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-gray-300">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-2xl p-12 border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              O que está incluído
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formacao.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center" id="matricula">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pronto para transformar sua carreira?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Agende uma call gratuita com nossos especialistas e descubra o melhor caminho para você
            </p>
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md mx-auto border border-gray-700">
              <div className="mb-6">
                <svg className="h-16 w-16 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                <h3 className="text-xl font-bold text-white mb-2">Call Gratuita</h3>
                <p className="text-gray-300">15 minutos para entender suas necessidades</p>
              </div>
              <a
                href="https://rodolfomori.typeform.com/to/rQb1MBt5"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-primary text-white text-center py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
              >
                Falar com especialista
              </a>
              <p className="text-sm text-gray-400 mt-4">
                Sem compromisso • 100% gratuito
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}