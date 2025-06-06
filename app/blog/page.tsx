import { generateSEO } from '@/components/SEO'
import Link from 'next/link'
import Image from 'next/image'
import { sanityClient, postQuery, urlFor, type Post } from '@/lib/sanity'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const metadata = generateSEO({
  title: 'Blog - DevClub',
  description: 'Artigos, tutoriais e novidades sobre programação, desenvolvimento web e tecnologia.',
  url: 'https://devclub.com.br/blog',
  keywords: [
    'blog programação',
    'artigos tecnologia',
    'tutoriais desenvolvimento',
    'DevClub blog',
  ],
})

export const revalidate = 60

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await sanityClient.fetch(postQuery)
    return posts || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  if (posts.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Blog DevClub
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Em breve, novos artigos sobre programação e tecnologia.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Voltar ao início
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Blog DevClub
            </h1>
            <p className="text-xl text-gray-600">
              Artigos, tutoriais e novidades sobre programação e tecnologia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <Link href={`/blog/${post.slug.current}`} className="block">
                  {post.mainImage && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={urlFor(post.mainImage).width(400).height(200).url()}
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <time className="text-sm text-gray-500">
                      {format(new Date(post.publishedAt), "d 'de' MMMM 'de' yyyy", {
                        locale: ptBR,
                      })}
                    </time>
                    <h2 className="text-xl font-bold text-gray-900 mt-2 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3">
                      {post.description}
                    </p>
                    {post.author && (
                      <p className="text-sm text-gray-500 mt-4">
                        Por {post.author}
                      </p>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}