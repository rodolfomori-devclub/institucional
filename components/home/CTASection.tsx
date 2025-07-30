'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="matricule-se" ref={sectionRef} className="py-20 bg-gradient-to-br from-secondary via-secondary-dark to-secondary relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 animate-gradient"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-light/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            Pronto para <span className="gradient-text text-shadow-glow">transformar</span> sua carreira?
          </h2>
          <p className={`text-xl sm:text-2xl text-text-muted-dark mb-12 ${isVisible ? 'animate-slide-up animation-delay-200' : 'opacity-0'}`}>
            Junte-se a milhares de alunos que já mudaram suas vidas através da programação. 
            Vagas limitadas para a próxima turma!
          </p>

          {/* CTA buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-12 ${isVisible ? 'animate-slide-up animation-delay-400' : 'opacity-0'}`}>
            <Link
              href="/formacoes"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-secondary bg-primary rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center">
                Escolher minha formação
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
            <a
              href="https://rodolfomori.typeform.com/to/rQb1MBt5"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-primary border-2 border-primary rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 neon-border"
            >
              <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center group-hover:text-secondary transition-colors duration-300">
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                Falar com consultor
              </span>
            </a>
          </div>

          {/* Trust badges */}
          <div className={`flex flex-wrap justify-center gap-8 mb-8 ${isVisible ? 'animate-fade-in animation-delay-600' : 'opacity-0'}`}>
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-text-muted-dark">Certificado reconhecido</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-text-muted-dark">Suporte vitalício</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-text-muted-dark">Projetos práticos</span>
            </div>
          </div>

          <p className={`text-sm text-primary animate-pulse ${isVisible ? 'animate-fade-in animation-delay-800' : 'opacity-0'}`}>
            ⚡ Ofertas especiais para matrículas antecipadas. Consulte condições.
          </p>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </section>
  )
}