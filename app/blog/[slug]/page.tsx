import { generateSEO } from '@/components/SEO'
import { sanityClient, postBySlugQuery, postPathsQuery, urlFor, type Post } from '@/lib/sanity'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PortableText from '@/components/blog/PortableText'

export const revalidate = 60

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await sanityClient.fetch(postPathsQuery)
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }))
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await sanityClient.fetch(postBySlugQuery, { slug })
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.slug)
  
  if (!post) {
    return generateSEO({
      title: 'Post não encontrado - DevClub',
      description: 'O post que você está procurando não foi encontrado.',
      url: `https://devclub.com.br/blog/${params.slug}`,
    })
  }

  const imageUrl = post.mainImage 
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined

  return generateSEO({
    title: `${post.title} - DevClub Blog`,
    description: post.description,
    url: `https://devclub.com.br/blog/${params.slug}`,
    image: imageUrl,
    type: 'article',
    publishedTime: post.publishedAt,
    author: post.author,
  })
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author || 'DevClub',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DevClub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://devclub.com.br/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://devclub.com.br/blog/${params.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <header className="mb-10">
              <Link
                href="/blog"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 group"
              >
                <svg
                  className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                Voltar ao blog
              </Link>

              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-gray-600 mb-8">
                <time className="text-sm">
                  {format(new Date(post.publishedAt), "d 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </time>
                {post.author && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm">Por {post.author}</span>
                  </>
                )}
              </div>

              {post.mainImage && (
                <div className="relative h-[400px] w-full mb-10 rounded-2xl overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).width(1200).height(600).url()}
                    alt={post.mainImage.alt || post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </header>

            <div className="prose prose-lg prose-gray max-w-none">
              <PortableText value={post.body} />
            </div>

            <footer className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Ver mais artigos
                </Link>
                
                <div className="flex gap-4">
                  <span className="text-gray-600">Compartilhe:</span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://devclub.com.br/blog/${params.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary-600"
                    aria-label="Compartilhar no Twitter"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://devclub.com.br/blog/${params.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary-600"
                    aria-label="Compartilhar no LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  )
}