import Image from 'next/image'

export default function PartnersSection() {
  const partners = [
    { name: 'Google', logo: '/partners/google.svg' },
    { name: 'Microsoft', logo: '/partners/microsoft.svg' },
    { name: 'Amazon', logo: '/partners/amazon.svg' },
    { name: 'Meta', logo: '/partners/meta.svg' },
    { name: 'Apple', logo: '/partners/apple.svg' },
    { name: 'Netflix', logo: '/partners/netflix.svg' },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nossos alunos trabalham em
          </h2>
          <p className="text-lg text-gray-600">
            Empresas líderes de mercado confiam nos profissionais formados pelo DevClub
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-200"
            >
              <Image
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                width={120}
                height={60}
                className="max-h-12 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}