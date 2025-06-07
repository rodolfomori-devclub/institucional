import { generateSEO } from '@/components/SEO'
import Image from 'next/image'

export const metadata = generateSEO({
  title: 'Sobre o DevClub - Nossa História e Missão',
  description: 'Conheça a história do DevClub, nossa missão de democratizar o ensino de programação e como transformamos milhares de vidas através da tecnologia.',
  url: 'https://devclub.com.br/sobre',
  keywords: [
    'sobre DevClub',
    'história DevClub',
    'escola de programação',
    'missão DevClub',
    'ensino de tecnologia',
  ],
})

export default function SobrePage() {
  return (
    <>
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Transformando vidas através da tecnologia
            </h1>
            <p className="text-lg sm:text-xl text-gray-200">
              Desde 2020, o DevClub tem como missão democratizar o acesso à educação 
              em tecnologia e formar os melhores profissionais do mercado.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <p className="text-gray-600 mb-4">
                O DevClub nasceu de um sonho: tornar a programação acessível para todos. 
                Começamos com uma pequena turma de 10 alunos e hoje já impactamos mais 
                de 10.000 vidas em todo o Brasil.
              </p>
              <p className="text-gray-600 mb-4">
                Nossa metodologia única combina teoria e prática de forma equilibrada, 
                garantindo que nossos alunos não apenas aprendam a programar, mas também 
                desenvolvam as habilidades necessárias para se destacar no mercado de trabalho.
              </p>
              <p className="text-gray-600">
                Acreditamos que a tecnologia é a ferramenta mais poderosa para transformação 
                social e econômica, e por isso trabalhamos incansavelmente para formar 
                profissionais capacitados e preparados para os desafios do futuro.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/about-history.jpg"
                alt="História do DevClub"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Nossa Missão</h3>
              <p className="text-gray-600">
                Democratizar o acesso à educação em tecnologia e formar profissionais 
                capacitados para transformar o mercado e a sociedade.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Nossa Visão</h3>
              <p className="text-gray-600">
                Ser a principal referência em formação tecnológica do Brasil, 
                reconhecida pela qualidade do ensino e pelo impacto na vida dos alunos.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Nossos Valores</h3>
              <p className="text-gray-600">
                Excelência no ensino, inovação constante, comunidade colaborativa, 
                transparência e compromisso com o sucesso de cada aluno.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                Conheça nosso fundador
              </h2>
              <div className="mb-8">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                  <Image
                    src="/founder.jpg"
                    alt="Fundador do DevClub"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">João Silva</h3>
                <p className="text-primary-600 font-medium">Fundador & CEO</p>
              </div>
              <blockquote className="text-lg text-gray-600 italic">
                "Acredito que a programação é a habilidade mais importante do século XXI. 
                No DevClub, não apenas ensinamos código, mas preparamos pessoas para 
                construir o futuro. Cada aluno que passa por aqui carrega consigo o 
                potencial de mudar o mundo através da tecnologia."
              </blockquote>
              <div className="mt-6 flex justify-center gap-4">
                <a
                  href="https://linkedin.com/in/joaosilva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                  aria-label="LinkedIn do fundador"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://github.com/joaosilva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                  aria-label="GitHub do fundador"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}