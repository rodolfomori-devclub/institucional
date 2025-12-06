import Image from 'next/image'
import Link from 'next/link'
import { urlFor, Post } from '@/lib/sanity'

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const href = post.category === 'newsletter'
    ? `/newsletter/${post.slug.current}`
    : `/blog/${post.slug.current}`

  return (
    <Link href={href} className="group block">
      <article className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {post.mainImage && (
          <div className="relative h-64 md:h-80 overflow-hidden">
            <Image
              src={urlFor(post.mainImage).width(800).height(400).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Destaque
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-3">
            {post.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4 line-clamp-3">
            {post.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium">{post.author}</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
            </time>
          </div>
        </div>
      </article>
    </Link>
  )
}