import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  keywords?: string[]
}

export function generateSEO({
  title = 'DevClub - Escola de Programação e Tecnologia',
  description = 'Transforme sua carreira com o DevClub. Formações completas em desenvolvimento web, programação e tecnologia.',
  image = '/og-image.jpg',
  url = 'https://devclub.com.br',
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  keywords = ['escola de programação', 'curso de desenvolvimento web', 'formação em tecnologia'],
}: SEOProps = {}): Metadata {
  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url,
      siteName: 'DevClub',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'pt_BR',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@devclub',
    },
    alternates: {
      canonical: url,
    },
  }

  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      authors: author ? [author] : undefined,
    }
  }

  return metadata
}