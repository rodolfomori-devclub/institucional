import { generateSEO } from '@/components/SEO'
import Header from '@/components/Header'

export const metadata = generateSEO({
  title: 'MBA em Inteligência Artificial - DevClub + Faculdade Sirius',
  description: 'MBA em Inteligência Artificial com diploma reconhecido pelo MEC + certificações de Harvard, MIT, Stanford, IBM e AWS. Acesso às maiores ferramentas de IA inclusas.',
  url: 'https://devclub.com.br/mba',
  keywords: [
    'MBA inteligência artificial',
    'pós-graduação IA',
    'certificação IA',
    'curso IA MEC',
    'MBA tecnologia',
    'formação IA',
    'Harvard MIT Stanford',
    'certificação IBM AWS',
  ],
})

export default function MBAPage() {
  return (
    <>
      <Header />
      <div className="fixed inset-0 pt-20 bg-gray-900 overflow-hidden">
        <iframe
          src="http://lp.devclub.com.br/mba"
          title="MBA em Inteligência Artificial - DevClub"
          className="w-full h-full border-0"
          style={{ height: 'calc(100vh - 80px)' }}
          allowFullScreen
        />
      </div>
    </>
  )
}
