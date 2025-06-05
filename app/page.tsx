import { generateSEO } from '@/components/SEO'
import HeroSection from '@/components/home/HeroSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import PartnersSection from '@/components/home/PartnersSection'
import CTASection from '@/components/home/CTASection'

export const metadata = generateSEO({
  title: 'DevClub - Escola de Programação e Tecnologia | Transforme sua Carreira',
  description: 'Aprenda programação do zero ao profissional com o DevClub. Formações completas em desenvolvimento web, mentoria ao vivo e suporte vitalício. Comece sua jornada hoje!',
  keywords: [
    'escola de programação',
    'curso de desenvolvimento web',
    'aprender programação do zero',
    'formação fullstack',
    'carreira em tecnologia',
    'curso de programação online',
    'DevClub escola',
  ],
})

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </>
  )
}