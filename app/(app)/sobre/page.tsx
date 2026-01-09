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
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mb-6 text-center">
              A ESCOLA ONLINE QUE MAIS COLOCA PROGRAMADORES NO MERCADO DE TECNOLOGIA NO BRASIL
            </h2>
            <p className="text-text-muted-dark mb-4">
              O DevClub é a maior escola online de formação em programação, reconhecida por ser a que mais coloca programadores no mercado de tecnologia no Brasil.
            </p>
            <p className="text-text-muted-dark mb-4">
              Fundada por Rodolfo Mori, o DevClub nasceu com a missão de democratizar o acesso à carreira de tecnologia, oferecendo uma formação prática, direta ao ponto e conectada com o que o mercado realmente exige.
            </p>
            <p className="text-text-muted-dark mb-4">
              Mais do que ensinar a programar, o DevClub prepara seus alunos para serem contratados, com trilhas completas de estudo, acompanhamento próximo, suporte humano e estratégias de posicionamento profissional que vão muito além do código.
            </p>
            <p className="text-text-muted-dark">
              Com mais de 12 mil alunos ativos e centenas de histórias reais de transformação, o DevClub é hoje referência em empregabilidade e desenvolvimento tech no país.
            </p>
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

          <div className="bg-gray-800 rounded-2xl p-12 border border-gray-700">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
                    <span className="block mb-2">CONHEÇA O RODOLFO MORI</span>
                    <span className="block text-primary text-lg sm:text-xl lg:text-2xl font-medium">(FUNDADOR DEVCLUB)</span>
                  </h2>
                  <p className="text-xl font-semibold text-primary mb-6">
                    De eletricista no metrô a referência nacional na formação de programadores.
                  </p>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Rodolfo Mori é a prova viva de que é possível mudar de vida com programação, mesmo sem faculdade, sem experiência e começando do zero.
                    </p>
                    <p>
                      Nascido e criado na periferia de São Paulo, estudou em escola pública e começou a trabalhar cedo como eletricista. Em um momento de crise familiar e com a esposa doente, viu na tecnologia uma chance real de reconstruir sua história.
                    </p>
                    <p>
                      Em apenas 6 meses de estudo autodidata, conquistou sua primeira vaga como programador em um grande banco. E não parou mais.
                    </p>
                    <p>
                      Depois de ser promovido, virar sócio de uma empresa de software e atingir a liberdade financeira, decidiu criar o DevClub, a escola que ele gostaria de ter tido quando começou.
                    </p>
                    <p>
                      Hoje, com mais de 12 mil alunos formados, Rodolfo é reconhecido como um dos principais educadores em tecnologia do país, ajudando milhares de pessoas comuns a conquistarem uma nova carreira, um novo salário e uma nova vida com programação.
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 shadow-xl">
                    <Image
                      src="https://github.com/rodolfomori.png"
                      alt="Rodolfo Mori - Fundador do DevClub"
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                                     <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                     <h3 className="text-xl font-bold text-white mb-4">
                       SIGA O RODOLFO MORI NAS REDES SOCIAIS
                     </h3>
                     <p className="text-gray-300 mb-4">
                       E receba sacadas práticas sobre carreira, tecnologia e programação no dia a dia
                     </p>
                     <div className="flex justify-center gap-6 mb-4">
                       <a
                         href="https://www.instagram.com/rodolfomorii"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-primary hover:text-primary-600 transition-colors hover:scale-110 transform"
                         aria-label="Instagram do Rodolfo Mori"
                       >
                         <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                         </svg>
                       </a>
                       <a
                         href="https://linkedin.com/in/rodolfomori"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-primary hover:text-primary-600 transition-colors hover:scale-110 transform"
                         aria-label="LinkedIn do Rodolfo Mori"
                       >
                         <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                         </svg>
                       </a>
                     </div>
                     <p className="text-sm text-gray-400">
                       Já são mais de 200 mil pessoas acompanhando os bastidores, dicas e conteúdos exclusivos do fundador do DevClub.
                     </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}