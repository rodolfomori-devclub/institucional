import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

interface PostCardProps {
  post: {
    _id: string
    title: string
    slug: {
      current: string
    }
    description: string
    mainImage?: {
      asset: {
        _ref: string
      }
      alt?: string
    }
    thumbnail?: {
      asset: {
        _ref: string
      }
      alt?: string
    }
    generatedImageUrl?: string
    publishedAt: string
    author?: string
    category?: string
  }
  size?: 'small' | 'medium' | 'large'
}

export default function PostCard({ post, size = 'medium' }: PostCardProps) {
  const sizeClasses = {
    small: 'w-full',
    medium: 'w-full max-w-sm',
    large: 'w-full max-w-lg'
  }

  const imageHeights = {
    small: 'h-40',
    medium: 'h-48',
    large: 'h-64'
  }

  const href = post.category === 'newsletter'
    ? `/newsletter/${post.slug.current}`
    : `/blog/${post.slug.current}`

  return (
    <Link href={href} className="group block">
      <article className={`${sizeClasses[size]} bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-700 hover:border-primary-500 hover:-translate-y-2`}>
        {(post.thumbnail || post.mainImage || post.generatedImageUrl) && (
          <div className={`relative ${imageHeights[size]} overflow-hidden`}>
            <Image
              src={
                post.thumbnail ? urlFor(post.thumbnail).width(600).height(300).url() :
                  post.generatedImageUrl ? post.generatedImageUrl :
                    post.mainImage ? urlFor(post.mainImage).width(600).height(300).url() : ''
              }
              alt={
                post.thumbnail?.alt ||
                post.mainImage?.alt ||
                post.title
              }
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}

        <div className="p-6">
          <h3 className={`font-bold text-white group-hover:text-primary-400 transition-colors duration-300 ${size === 'small' ? 'text-lg' : size === 'medium' ? 'text-xl' : 'text-2xl'
            } leading-tight`}>
            {post.title}
          </h3>

          <p className="text-gray-300 mt-3 line-clamp-3 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center justify-between mt-6">
            {post.author && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-600/20 text-primary-400 border border-primary-600/30">
                {post.author}
              </span>
            )}
            <span className="text-primary-500 text-sm font-medium group-hover:text-primary-400 transition-colors">
              Ler mais →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}