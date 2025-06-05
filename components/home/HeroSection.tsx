import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-white pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Transforme sua carreira com{' '}
              <span className="text-primary-600">programação</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
              Aprenda as tecnologias mais demandadas do mercado com metodologia prática, 
              mentoria ao vivo e suporte vitalício. Do zero ao profissional.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/formacoes"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                Ver Formações
              </Link>
              <Link
                href="/sobre"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-600 bg-white border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200"
              >
                Conhecer o DevClub
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-8">
              <div>
                <p className="text-3xl font-bold text-gray-900">10k+</p>
                <p className="text-sm text-gray-600">Alunos formados</p>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <p className="text-3xl font-bold text-gray-900">95%</p>
                <p className="text-sm text-gray-600">Taxa de empregabilidade</p>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <p className="text-3xl font-bold text-gray-900">4.9</p>
                <p className="text-sm text-gray-600">Avaliação média</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-image.jpg"
                alt="Alunos do DevClub programando"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-sm font-medium text-gray-600">Próxima turma</p>
              <p className="text-2xl font-bold text-primary-600">15 de Janeiro</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}