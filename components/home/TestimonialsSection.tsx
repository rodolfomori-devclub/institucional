import Image from 'next/image'

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'Desenvolvedora Full Stack',
      company: 'Tech Corp',
      image: '/testimonial-1.jpg',
      content: 'O DevClub mudou minha vida! Em menos de 6 meses consegui minha primeira vaga como desenvolvedora. A metodologia prática e o suporte dos mentores fazem toda a diferença.',
    },
    {
      name: 'Carlos Oliveira',
      role: 'Front-end Developer',
      company: 'StartupXYZ',
      image: '/testimonial-2.jpg',
      content: 'As aulas ao vivo e os projetos práticos me prepararam para o mercado real. Hoje trabalho com React e Next.js graças ao conhecimento adquirido no DevClub.',
    },
    {
      name: 'Marina Santos',
      role: 'Back-end Engineer',
      company: 'Big Tech',
      image: '/testimonial-3.jpg',
      content: 'A comunidade do DevClub é incrível! Além do conhecimento técnico, fiz networking valioso que me ajudou a conseguir oportunidades incríveis na minha carreira.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            O que nossos alunos dizem
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Histórias reais de pessoas que transformaram suas carreiras através da programação
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={index}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <div className="mb-4">
                <svg className="h-8 w-8 text-primary-600 opacity-25" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <p className="text-gray-700 mb-6 italic">
                {testimonial.content}
              </p>
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} na {testimonial.company}
                  </p>
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}