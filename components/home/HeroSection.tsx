'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const toRotate = ['Front-end', 'Back-end', 'Full Stack', 'Mobile', 'IA']

  useEffect(() => {
    let ticker = setInterval(() => {
      tick()
    }, typingSpeed)

    return () => clearInterval(ticker)
  }, [text, typingSpeed])

  const tick = () => {
    let i = loopNum % toRotate.length
    let fullText = toRotate[i]
    let updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1)

    setText(updatedText)

    if (isDeleting) {
      setTypingSpeed(50)
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true)
      setTypingSpeed(1000)
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false)
      setLoopNum(loopNum + 1)
      setTypingSpeed(150)
    }
  }

  return (
    <section className="pb-24	relative min-h-screen flex items-center pt-20 overflow-hidden matrix-bg">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob blob-1 top-0 -left-4"></div>
        <div className="blob blob-2 bottom-0 right-0"></div>
        <div className="blob blob-3 top-1/2 left-1/2"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 animate-slide-down">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-sm text-primary font-medium">Esteja na Próxima Turma</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight animate-slide-up">
              <span className="text-text-dark">Transforme sua</span>
              <br />
              <span className="text-text-dark">carreira com</span>
              <br />
              <span className="gradient-text text-shadow-glow">
                {text}<span className="border-r-4 border-primary animate-pulse">|</span>
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-text-muted-dark leading-relaxed animate-fade-in animation-delay-300">
              Aprenda as tecnologias mais demandadas do mercado com metodologia prática, 
              direito ao ponto e de forma simples.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-500">
              <Link
                href="/formacoes"
                className="btn-glow group"
              >
                <span className="relative z-10">Ver Formações</span>
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/sobre"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-secondary transition-all duration-300 group neon-border"
              >
                <span className="relative z-10">Conhecer o DevClub</span>
              </Link>
            </div>

            <div className="flex items-center gap-8 animate-fade-in animation-delay-700">
              <div className="text-center">
                <p className="text-4xl font-black gradient-text">10k+</p>
                <p className="text-sm text-text-muted-dark">Alunos formados</p>
              </div>
              <div className="w-px h-12 bg-primary/30"></div>
              <div className="text-center">
                <p className="text-4xl font-black gradient-text">95%</p>
                <p className="text-sm text-text-muted-dark">Empregabilidade</p>
              </div>
              <div className="w-px h-12 bg-primary/30"></div>
              <div className="text-center">
                <p className="text-4xl font-black gradient-text">4.9</p>
                <p className="text-sm text-text-muted-dark">Avaliação</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative floating">
              {/* Code snippet animation */}
              <div className="glass rounded-2xl p-6 space-y-4 animate-fade-in">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <pre className="code-block">
{`function transformarCarreira() {
  const aluno = {
    nome: "Você",
    status: "Iniciante",
    sonho: "Dev Profissional"
  }
  
  return DevClub.formar(aluno)
    .then(dev => dev.conquistarMercado())
    .catch(err => console.log("Impossível!"))
}`}
                </pre>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-8 -right-8 glass rounded-lg p-4 animate-float animation-delay-100">
                <p className="text-sm font-medium text-primary">React.js</p>
              </div>
              <div className="absolute -bottom-6 -left-6 glass rounded-lg p-4 animate-float animation-delay-300">
                <p className="text-sm font-medium text-primary">Node.js</p>
              </div>
              <div className="absolute top-1/2 -right-12 glass rounded-lg p-4 animate-float animation-delay-500">
                <p className="text-sm font-medium text-primary">TypeScript</p>
              </div>
            </div>

            {/* Notification card */}
            <div className="absolute -bottom-12 -left-12 glass rounded-lg p-4 flex items-center space-x-3 animate-slide-up animation-delay-1000">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-text-dark">Próxima turma</p>
                <p className="text-2xl font-bold gradient-text">Em breve</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}