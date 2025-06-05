import { generateSEO } from '@/components/SEO'
import Link from 'next/link'

export const metadata = generateSEO({
  title: 'Blog - DevClub',
  description: 'Artigos, tutoriais e novidades sobre programação, desenvolvimento web e tecnologia. Em breve!',
  url: 'https://devclub.com.br/blog',
  keywords: [
    'blog programação',
    'artigos tecnologia',
    'tutoriais desenvolvimento',
    'DevClub blog',
  ],
})

export default function BlogPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <svg
              className="mx-auto h-24 w-24 text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
              />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Blog em construção
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Estamos preparando conteúdos incríveis sobre programação, desenvolvimento web 
            e tecnologia. Em breve, você encontrará aqui artigos, tutoriais e as últimas 
            novidades do mundo tech.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Voltar ao início
            </Link>
            <a
              href="https://youtube.com/devclub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-primary-600 bg-white border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200"
            >
              Ver conteúdos no YouTube
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-500">
            Enquanto isso, acompanhe nossos conteúdos nas redes sociais!
          </p>
        </div>
      </div>
    </section>
  )
}