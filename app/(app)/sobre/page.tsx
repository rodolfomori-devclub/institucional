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
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
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
              <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mb-6">
                Nossa História
              </h2>
              <p className="text-text-muted-dark mb-4">
                O DevClub nasceu de um sonho: tornar a programação acessível para todos.
                Começamos com uma pequena turma de 10 alunos e hoje já impactamos mais
                de 10.000 vidas em todo o Brasil.
              </p>
              <p className="text-text-muted-dark mb-4">
                Nossa metodologia única combina teoria e prática de forma equilibrada,
                garantindo que nossos alunos não apenas aprendam a programar, mas também
                desenvolvam as habilidades necessárias para se destacar no mercado de trabalho.
              </p>
              <p className="text-text-muted-dark">
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
              <h3 className="text-2xl font-bold text-text-dark mb-2">Nossa Missão</h3>
              <p className="text-text-muted-dark">
                Democratizar o acesso à educação em tecnologia e formar profissionais
                capacitados para transformar o mercado e a sociedade.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-text-dark mb-2">Nossa Visão</h3>
              <p className="text-text-muted-dark">
                Ser a principal referência em formação tecnológica do Brasil,
                reconhecida pela qualidade do ensino e pelo impacto na vida dos alunos.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-text-dark mb-2">Nossos Valores</h3>
              <p className="text-text-muted-dark">
                Excelência no ensino, inovação constante, comunidade colaborativa,
                transparência e compromisso com o sucesso de cada aluno.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mb-8">
                Conheça nosso fundador
              </h2>
              <div className="mb-8">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                  <Image
                    src="https://github.com/rodolfomori.png"
                    alt="Fundador do DevClub"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Rodolfo Mori</h3>
                <p className="text-primary-600 font-medium">Fundador & CEO</p>
              </div>
              <blockquote className="text-lg text-gray-700 italic">
                "Acredito que a programação é a habilidade mais importante do século XXI.
                No DevClub, não apenas ensinamos código, mas preparamos pessoas para
                construir o futuro. Cada aluno que passa por aqui carrega consigo o
                potencial de mudar o mundo através da tecnologia."
              </blockquote>
              <div className="mt-6 flex justify-center gap-4">
                <a
                  href="https://www.instagram.com/rodolfomorii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                  aria-label="Instagram do fundador"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/rodolfomori"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                  aria-label="LinkedIn do fundador"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/rodolfomori"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                  aria-label="GitHub do fundador"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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