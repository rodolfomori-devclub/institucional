'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const testimonials = [
    {
      name: 'Henrique Francisco de Souza',
      role: 'Vendedor De Peças',
      company: '',
      image: 'https://stars.devclub.com.br/images/henrique.jpg',
      content: 'De vendedor de motos a gestor de tráfego da maneira loja. Sou da Palmeira D\'Oeste e decidi entrar no curso porque queria ter uma profissão que me torne independente. Foi essencial participar do DevClub, não somente por aprender a programação de fato, mas também pelo networking.',
      rating: 5,
      employment: 'Primeiro Emprego como Programador em agosto de 2022',
    },
    {
      name: 'Pedro Santos',
      role: 'Ajudante De Pedreiro',
      company: '',
      image: 'https://stars.devclub.com.br/images/pedro.jpg',
      content: 'Eu trabalhava como ajudante de pedreiro e queria fazer algo diferente. A programação me ajudou a conquistar tudo, depois de 6 meses estudando o máximo que eu podia. DevClub foi divisor de águas em minha vida.',
      rating: 5,
      employment: 'Primeiro Emprego como Programador em julho de 2021',
    },
    {
      name: 'Mattheus Martins Nascimento',
      role: 'Uber E Vendedor De Seguros',
      company: '',
      image: 'https://stars.devclub.com.br/images/mattheus.jpg',
      content: 'Foram três etapas: as duas primeiras para preenchimento de formulário e estudo de videos em inglês. A última foi uma entrevista de duas horas. Mentoria com Bia, Mentoria do Rodolfo, Dúvidas da comunidade. É a parte técnica do curso.',
      rating: 5,
      employment: 'Primeiro Emprego como Programador em março de 2023',
    },
    {
      name: 'Ailton Peron Junior',
      role: 'Tepi',
      company: '',
      image: 'https://stars.devclub.com.br/images/ailton.jpg',
      content: 'Eu me formei como engenheiro de produção primeiramente e não estava me encontrando. Aí um dia surgir vídeos de como criar um site e eu me encontrei e vim tentando possibilidades, conseguindo chegar onde estou. Desde o começo me apaixonei, logo criei uma estratégia.',
      rating: 5,
      employment: 'Primeiro Emprego como Programador em setembro de 2023',
    },
    {
      name: 'Mayara Gerda Guedes',
      role: 'Primeiro Emprego',
      company: '',
      image: 'https://stars.devclub.com.br/images/mayara.jpg',
      content: 'Muita dedicação e paciência. Foi o início de uma mudança de vida, profunda e significativa! Graças ao DevClub ajudou muito com a mentalidade, desde o dia conversando de como eu consegui o CodeBoost.',
      rating: 5,
      employment: 'Primeiro Emprego como Programador em outubro de 2022',
    },
    {
      name: 'Mariane Aparecida Yano',
      role: 'Atendente De Telemarketing',
      company: '',
      image: 'https://stars.devclub.com.br/images/mariane.jpg',
      content: 'Durante meu tempo livre estudei programação e entrei no curso do Rodolfo. Ao cumprir o desafio nasceu a proposta de uma oportunidade e agarrei com as duas mãos. Graças ao DevClub pude mudar minha mentalidade.',
      rating: 5,
      employment: 'Primeiro Emprego como Programadora em junho de 2024',
    },
    {
      name: 'Matheus Silva',
      role: 'Suporte Web',
      company: '',
      image: 'https://stars.devclub.com.br/images/matheus-silva.jpg',
      content: 'Comecei minha jornada na área de tecnologia em 2015, quando iniciei minha faculdade. Meu primeiro emprego foi como Jovem aprendiz, e na sequência, trocava de emprego rapidamente. Depois de um tempo percebi que precisava voltar a estudar.',
      rating: 5,
      employment: 'Primeiro Emprego como Programador em maio de 2023',
    },
    {
      name: 'Rafael Melendres',
      role: 'Fotógrafo',
      company: '',
      image: 'https://stars.devclub.com.br/images/rafael.jpg',
      content: 'Entrei no dev club para entender um pouco de dev, pois eu não sabia usar o node e não entendia muito bem linhas de código, na primeira aula da IA deixa muita coisa se encaixar, pois ai que percebi que precisa começar direito.',
      rating: 5,
      employment: 'Primeiro Emprego como Programador em junho de 2025',
    },
    {
      name: 'Daniel Euclides Corrêa',
      role: 'Auxiliar Administrativo',
      company: '',
      image: 'https://stars.devclub.com.br/images/daniel.jpg',
      content: 'Estudo, foco, dedicação e network. Na 5a entrevista, a vaga foi minha sem indicação. Me esforcei foi o mais eficiente. DevClub me deu a base de programação.',
      rating: 5,
      employment: 'Primeiro Emprego como Programador em 2023',
    },
  ]

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section ref={sectionRef} className="py-20 bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            O que nossos <span className="gradient-text">alunos dizem</span>
          </h2>
          <p className={`text-lg text-text-muted-dark max-w-2xl mx-auto ${isVisible ? 'animate-slide-up animation-delay-200' : 'opacity-0'}`}>
            Histórias reais de pessoas que transformaram suas carreiras através da programação
          </p>
        </div>

        {/* Testimonials carousel */}
        <div className={`relative max-w-4xl mx-auto ${isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'}`}>
          <div className="relative overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <blockquote className="glass rounded-2xl p-8 lg:p-12 relative">
                    {/* Quote icon */}
                    <svg className="absolute top-8 left-8 h-16 w-16 text-primary/20" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>

                    {/* Rating */}
                    <div className="flex items-center mb-6 relative z-10">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-xl text-text-dark italic mb-8 relative z-10 leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center relative z-10">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-primary">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-text-dark">{testimonial.name}</p>
                        <p className="text-text-muted-dark text-sm">
                          Antes: {testimonial.role}
                        </p>
                        <p className="text-primary text-sm">
                          {testimonial.employment}
                        </p>
                      </div>
                    </div>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? 'bg-primary w-8 shadow-neon'
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 ${isVisible ? 'animate-slide-up animation-delay-600' : 'opacity-0'}`}>
          <div className="text-center">
            <div className="glass rounded-2xl p-8 hover:shadow-neon transition-all duration-300 cursor-pointer">
              <p className="text-5xl font-black gradient-text mb-2">+15.000</p>
              <p className="text-text-muted-dark">Alunos com a vida transformada</p>
            </div>
          </div>
          <div className="text-center">
            <div className="glass rounded-2xl p-8 hover:shadow-neon transition-all duration-300 cursor-pointer">
              <p className="text-5xl font-black gradient-text mb-2">95%</p>
              <p className="text-text-muted-dark">Taxa de empregabilidade</p>
            </div>
          </div>
          <div className="text-center">
            <div className="glass rounded-2xl p-8 hover:shadow-neon transition-all duration-300 cursor-pointer">
              <p className="text-5xl font-black gradient-text mb-2">4.9/5</p>
              <p className="text-text-muted-dark">Avaliação média</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}