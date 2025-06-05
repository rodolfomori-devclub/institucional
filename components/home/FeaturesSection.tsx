'use client'

import { useEffect, useRef, useState } from 'react'

export default function FeaturesSection() {
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

  const features = [
    {
      title: 'Metodologia Prática',
      description: 'Aprenda construindo projetos reais desde a primeira aula. Nossa metodologia hands-on garante que você saia preparado para o mercado.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
      gradient: 'from-primary to-primary-light',
    },
    {
      title: 'Mentoria ao Vivo',
      description: 'Aulas ao vivo com profissionais do mercado. Tire suas dúvidas em tempo real e aprenda com quem trabalha nas maiores empresas de tecnologia.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      gradient: 'from-primary-light to-primary',
    },
    {
      title: 'Suporte Vitalício',
      description: 'Após concluir sua formação, continue tendo acesso ao conteúdo e suporte. Estamos aqui para apoiar sua jornada profissional sempre.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      gradient: 'from-primary to-primary-dark',
    },
    {
      title: 'Comunidade Ativa',
      description: 'Faça parte de uma comunidade com milhares de desenvolvedores. Networking, eventos exclusivos e oportunidades de emprego.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198a9.096 9.096 0 01-3.961.584m0 0a8.965 8.965 0 01-6.684-3.016 3.001 3.001 0 00-4.268 0m10.952 3.016a9.067 9.067 0 01-6.685-3.016m6.685 3.016c.275.02.55.03.827.03 6.075 0 11-2.954 11-6.599 0-3.644-4.925-6.599-11-6.599S1 8.155 1 11.8c0 2.048 1.555 3.88 4 5.09m11 3.91a8.96 8.96 0 01-2.352-.313M15 6.755a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      gradient: 'from-primary-dark to-primary',
    },
    {
      title: 'Certificado Reconhecido',
      description: 'Receba um certificado valorizado pelo mercado ao concluir sua formação. Destaque-se nas seleções e processos seletivos.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
      gradient: 'from-primary-light to-primary-dark',
    },
    {
      title: 'Projetos Reais',
      description: 'Construa um portfólio sólido com projetos que impressionam recrutadores. Saia do curso pronto para trabalhar em equipes reais.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
      ),
      gradient: 'from-primary to-primary-light',
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-secondary-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2337E359' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            Por que escolher o <span className="gradient-text">DevClub</span>?
          </h2>
          <p className={`text-lg text-text-muted-dark max-w-2xl mx-auto ${isVisible ? 'animate-slide-up animation-delay-200' : 'opacity-0'}`}>
            Nossa metodologia foi desenvolvida para garantir que você aprenda de verdade 
            e saia preparado para conquistar as melhores oportunidades do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <article
              key={index}
              className={`group relative ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{
                animationDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              <div className="glass rounded-2xl p-8 h-full hover:shadow-neon transition-all duration-300 hover:translate-y-[-5px]">
                {/* Icon background */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full bg-secondary-dark rounded-xl flex items-center justify-center">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-text-dark mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-text-muted-dark leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-fade-in animation-delay-800' : 'opacity-0'}`}>
          <p className="text-lg text-text-muted-dark mb-6">
            Pronto para começar sua jornada?
          </p>
          <a href="/formacoes" className="btn-glow shine text-lg">
            Conhecer formações
            <svg className="ml-2 h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}