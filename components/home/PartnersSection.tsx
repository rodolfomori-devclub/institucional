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
    { name: 'Accenture', logo: '/partners/accenture.svg' },
    { name: 'Afya', logo: '/partners/afya.png' },
    { name: 'Algar', logo: '/partners/algar.png' },
    { name: 'Avanade', logo: '/partners/avanade.png' },
    { name: 'Bradesco', logo: '/partners/bradesco.svg' },
    { name: 'BTG Pactual', logo: '/partners/btg_pactual.png' },
    { name: 'Burger King', logo: '/partners/burger-king.png' },
    { name: 'Capgemini', logo: '/partners/capgemini.svg' },
    { name: 'CCR', logo: '/partners/ccr.png' },
    { name: 'Cesta Básica Brasil', logo: '/partners/cesta_basica_brasil.png' },
    { name: 'Compass UOL', logo: '/partners/compass_uol.png' },
    { name: 'CVC', logo: '/partners/cvc.png' },
    { name: 'Ebanx', logo: '/partners/ebanx.png' },
    { name: 'Einstein', logo: '/partners/einstein.png' },
    { name: 'GFT', logo: '/partners/gft.png' },
    { name: 'Growth', logo: '/partners/growth.png' },
    { name: 'IBM', logo: '/partners/ibm.png' },
    { name: 'iFood', logo: '/partners/ifood.svg' },
    { name: 'Itaú', logo: '/partners/itau.svg' },
    { name: 'Microsoft', logo: '/partners/microsoft.svg' },
    { name: 'Octadesk', logo: '/partners/octadesk.png' },
    { name: 'Omella', logo: '/partners/omella.png' },
    { name: 'Omie', logo: '/partners/omie.png' },
    { name: 'Oracle', logo: '/partners/oracle.svg' },
    { name: 'PagBank', logo: '/partners/pagbank.png' },
    { name: 'PUC', logo: '/partners/puc.png' },
    { name: 'Raia Drogasil', logo: '/partners/raia_drogasil.png' },
    { name: 'Renner', logo: '/partners/renner.svg' },
    { name: 'Santander', logo: '/partners/santander.svg' },
    { name: 'Senac', logo: '/partners/senac.png' },
    { name: 'Sonda', logo: '/partners/sonda.png' },
    { name: 'Stefanini', logo: '/partners/stefanini.png' },
    { name: 'TOTVS', logo: '/partners/totvs.png' },
    { name: 'Unicesumar', logo: '/partners/unicesumar.png' },
    { name: 'Unimed', logo: '/partners/unimed.svg' },
    { name: 'Valeo', logo: '/partners/valeo.png' },
    { name: 'Vivo', logo: '/partners/vivo.png' },
    { name: 'Wipro', logo: '/partners/wipro.svg' },
    { name: 'Xgrow', logo: '/partners/xgrow.png' },
    { name: 'Zallpy', logo: '/partners/zallpy.png' },
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

      </div>

      {/* Partners logos with infinite scroll - full width */}
      <div className={`relative space-y-4 ${isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'}`}>
        {/* First carousel - scrolling left */}
        <div className="flex overflow-hidden py-2">
          <div className="flex animate-scroll">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 py-4"
              >
                <div className="glass rounded-2xl p-6 hover:shadow-neon transition-all duration-300 hover:scale-110 group overflow-hidden flex flex-col items-center">
                  <Image
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    width={120}
                    height={60}
                    className="h-12 w-auto object-contain rounded-xl group-hover:grayscale-0 transition-all duration-300 group-hover:brightness-100 group-hover:invert-0"
                  />
                  <p className="mt-3 text-sm text-text-muted-dark group-hover:text-text-dark transition-colors duration-300">{partner.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second carousel - scrolling right */}
        <div className="flex overflow-hidden py-2">
          <div className="flex animate-scroll-reverse">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 py-4"
              >
                <div className="glass rounded-2xl p-6 hover:shadow-neon transition-all duration-300 hover:scale-110 group overflow-hidden flex flex-col items-center">
                  <Image
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    width={120}
                    height={60}
                    className="h-12 w-auto object-contain rounded-xl group-hover:grayscale-0 transition-all duration-300 group-hover:brightness-100 group-hover:invert-0"
                  />
                  <p className="mt-3 text-sm text-text-muted-dark group-hover:text-text-dark transition-colors duration-300">{partner.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 ${isVisible ? 'animate-slide-up animation-delay-600' : 'opacity-0'}`}>
          <div className="text-center">
            <p className="text-3xl font-black gradient-text mb-2">250+</p>
            <p className="text-text-muted-dark text-sm">Empresas parceiras</p>
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

        @keyframes scroll-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll {
          animation: scroll 90s linear infinite;
        }

        .animate-scroll-reverse {
          animation: scroll-reverse 90s linear infinite;
        }
      `}</style>
    </section>
  )
}