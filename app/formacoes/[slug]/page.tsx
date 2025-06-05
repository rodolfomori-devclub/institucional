import { generateSEO } from '@/components/SEO'
import { formacoes, getFormacaoBySlug } from '@/lib/formacoes'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
  return formacoes.map((formacao) => ({
    slug: formacao.slug,
  }))
}

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
      <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-sm text-primary-600 mb-4">
                <Link href="/formacoes" className="hover:underline">
                  Formações
                </Link>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <span>{formacao.title}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                {formacao.title}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {formacao.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">Duração</p>
                  <p className="text-lg font-semibold text-gray-900">{formacao.duration}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">Nível</p>
                  <p className="text-lg font-semibold text-gray-900">{formacao.level}</p>
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
                  href="https://wa.me/5511999999999?text=Olá! Quero saber mais sobre a formação: {formacao.title}"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-600 bg-white border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                >
                  Falar com consultor
                </a>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={formacao.image}
                alt={formacao.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            O que você vai aprender
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {formacao.curriculum.map((module, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {module.module}
                </h3>
                <ul className="space-y-2">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start">
                      <svg className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-gray-700">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-primary-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              O que está incluído
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formacao.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center" id="matricula">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Invista no seu futuro
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Comece sua jornada na programação hoje mesmo
            </p>
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
              <p className="text-sm text-gray-500 mb-2">Investimento</p>
              <p className="text-4xl font-bold text-primary-600 mb-6">{formacao.price}</p>
              <ul className="text-left space-y-2 mb-8">
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Acesso imediato ao conteúdo
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Garantia de 7 dias
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Parcelamento em até 12x
                </li>
              </ul>
              <a
                href="#"
                className="block w-full bg-primary-600 text-white text-center py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
              >
                Matricular agora
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Vagas limitadas para a próxima turma
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}