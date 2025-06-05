'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function PartnersSection() {
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

  const partners = [
    { name: 'Google', logo: '/partners/google.svg' },
    { name: 'Microsoft', logo: '/partners/microsoft.svg' },
    { name: 'Amazon', logo: '/partners/amazon.svg' },
    { name: 'Meta', logo: '/partners/meta.svg' },
    { name: 'Apple', logo: '/partners/apple.svg' },
    { name: 'Netflix', logo: '/partners/netflix.svg' },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-secondary-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            Nossos alunos <span className="gradient-text">trabalham em</span>
          </h2>
          <p className={`text-lg text-text-muted-dark ${isVisible ? 'animate-slide-up animation-delay-200' : 'opacity-0'}`}>
            Empresas líderes de mercado confiam nos profissionais formados pelo DevClub
          </p>
        </div>

        {/* Partners logos with infinite scroll */}
        <div className={`relative ${isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'}`}>
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-8 py-4"
                >
                  <div className="glass rounded-xl p-6 hover:shadow-neon transition-all duration-300 hover:scale-110 group">
                    <Image
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      width={120}
                      height={60}
                      className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 ${isVisible ? 'animate-slide-up animation-delay-600' : 'opacity-0'}`}>
          <div className="text-center">
            <p className="text-3xl font-black gradient-text mb-2">500+</p>
            <p className="text-text-muted-dark text-sm">Empresas parceiras</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black gradient-text mb-2">85%</p>
            <p className="text-text-muted-dark text-sm">Contratados em até 6 meses</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black gradient-text mb-2">R$ 5k</p>
            <p className="text-text-muted-dark text-sm">Salário médio inicial</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black gradient-text mb-2">30+</p>
            <p className="text-text-muted-dark text-sm">Países com alunos</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  )
}