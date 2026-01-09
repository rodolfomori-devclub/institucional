'use client'

import { generateSEO } from '@/components/SEO'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function SobrePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-primary text-sm font-medium">Conheça nossa história</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Transformando vidas através da{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">tecnologia</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Desde 2020, o DevClub tem como missão democratizar o acesso à educação
              em tecnologia e formar os melhores profissionais do mercado.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`max-w-4xl mx-auto mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="glass rounded-3xl p-8 lg:p-12 border border-gray-700/50 hover:border-primary/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  A ESCOLA ONLINE QUE MAIS COLOCA PROGRAMADORES NO MERCADO DE TECNOLOGIA NO BRASIL
                </h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  O DevClub é a maior escola online de formação em programação, reconhecida por ser a que mais coloca programadores no mercado de tecnologia no Brasil.
                </p>
                <p>
                  Fundada por Rodolfo Mori, o DevClub nasceu com a missão de democratizar o acesso à carreira de tecnologia, oferecendo uma formação prática, direta ao ponto e conectada com o que o mercado realmente exige.
                </p>
                <p>
                  Mais do que ensinar a programar, o DevClub prepara seus alunos para serem contratados, com trilhas completas de estudo, acompanhamento próximo, suporte humano e estratégias de posicionamento profissional que vão muito além do código.
                </p>
                <p>
                  Com mais de 12 mil alunos ativos e centenas de histórias reais de transformação, o DevClub é hoje referência em empregabilidade e desenvolvimento tech no país.
                </p>
              </div>
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              {
                title: 'Nossa Missão',
                description: 'Democratizar o acesso à educação em tecnologia e formar profissionais capacitados para transformar o mercado e a sociedade.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                title: 'Nossa Visão',
                description: 'Ser a principal referência em formação tecnológica do Brasil, reconhecida pela qualidade do ensino e pelo impacto na vida dos alunos.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
              },
              {
                title: 'Nossos Valores',
                description: 'Excelência no ensino, inovação constante, comunidade colaborativa, transparência e compromisso com o sucesso de cada aluno.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group glass rounded-2xl p-6 border border-gray-700/50 hover:border-primary/50 transition-all duration-500 hover:shadow-neon hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-primary">{item.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Founder Section */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="glass rounded-3xl p-8 lg:p-12 border border-gray-700/50 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
                      <span className="text-primary text-sm font-medium">Fundador</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                      CONHEÇA O RODOLFO MORI
                    </h2>
                    <p className="text-primary font-medium mb-6">(FUNDADOR DEVCLUB)</p>
                    <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 mb-6">
                      De eletricista no metrô a referência nacional na formação de programadores.
                    </p>
                    <div className="space-y-4 text-gray-300 leading-relaxed">
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
                    <div className="relative inline-block mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                      <div className="relative w-56 h-56 mx-auto rounded-full overflow-hidden ring-4 ring-primary/50 shadow-2xl">
                        <Image
                          src="https://github.com/rodolfomori.png"
                          alt="Rodolfo Mori - Fundador do DevClub"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="glass rounded-2xl p-6 border border-gray-700/50">
                      <h3 className="text-lg font-bold text-white mb-3">
                        SIGA O RODOLFO MORI NAS REDES SOCIAIS
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        E receba sacadas práticas sobre carreira, tecnologia e programação no dia a dia
                      </p>
                      <div className="flex justify-center gap-4 mb-4">
                        <a
                          href="https://www.instagram.com/rodolfomorii"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-gray-900 transition-all duration-300 hover:scale-110"
                          aria-label="Instagram do Rodolfo Mori"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </a>
                        <a
                          href="https://linkedin.com/in/rodolfomori"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-gray-900 transition-all duration-300 hover:scale-110"
                          aria-label="LinkedIn do Rodolfo Mori"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      </div>
                      <p className="text-xs text-gray-500">
                        Já são mais de 200 mil pessoas acompanhando os bastidores, dicas e conteúdos exclusivos do fundador do DevClub.
                      </p>
                    </div>
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
