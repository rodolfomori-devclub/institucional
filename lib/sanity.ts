import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source: any) => {
  return builder.image(source)
}

export interface Post {
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
  body: any[]
  publishedAt: string
  author?: string
  featured?: boolean
  category?: string
}

// Query para posts com paginação (Blog)
export const postsQuery = `
  *[_type == "post" && (category == "blog" || !defined(category))] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    description,
    mainImage,
    thumbnail,
    generatedImageUrl,
    publishedAt,
    author,
    featured,
    category
  }
`

// Query para posts em destaque (Blog)
export const featuredPostsQuery = `
  *[_type == "post" && featured == true && (category == "blog" || !defined(category))] | order(publishedAt desc) [0...5] {
    _id,
    title,
    slug,
    description,
    mainImage,
    thumbnail,
    generatedImageUrl,
    publishedAt,
    author,
    featured,
    category
  }
`

// Query para o post principal em destaque (Blog)
export const mainFeaturedPostQuery = `
  *[_type == "post" && featured == true && (category == "blog" || !defined(category))] | order(publishedAt desc) [0] {
    _id,
    title,
    slug,
    description,
    mainImage,
    thumbnail,
    generatedImageUrl,
    publishedAt,
    author,
    featured,
    category
  }
`

// Query para pesquisar posts (Blog)
export const searchPostsQuery = `
  *[_type == "post" && (category == "blog" || !defined(category)) && (title match $searchTerm || description match $searchTerm)] | order(publishedAt desc) [0...20] {
    _id,
    title,
    slug,
    description,
    mainImage,
    thumbnail,
    generatedImageUrl,
    publishedAt,
    author,
    featured,
    category
  }
`

// Query original mantida para compatibilidade
export const postQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    thumbnail,
    generatedImageUrl,
    publishedAt,
    author,
    featured,
    category
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    mainImage,
    thumbnail,
    generatedImageUrl,
    body,
    publishedAt,
    author,
    featured,
    category
  }
`

export const postPathsQuery = `
  *[_type == "post"] {
    "slug": slug.current
  }
`

// Queries para Newsletter
export const newsletterPostsQuery = `
  *[_type == "post" && category == "newsletter"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    description,
    mainImage,
    thumbnail,
    generatedImageUrl,
    publishedAt,
    author,
    featured,
    category
  }
`

export const featuredNewsletterPostsQuery = `
  *[_type == "post" && category == "newsletter" && featured == true] | order(publishedAt desc) [0...5] {
    _id,
    title,
    slug,
    description,
    mainImage,
    thumbnail,
    generatedImageUrl,
    publishedAt,
    author,
    featured,
    category
  }
`

export const mainFeaturedNewsletterPostQuery = `
  *[_type == "post" && category == "newsletter" && featured == true] | order(publishedAt desc) [0] {
    _id,
    title,
    slug,
    description,
    mainImage,
    thumbnail,
    generatedImageUrl,
    publishedAt,
    author,
    featured,
    category
  }
`

export const searchNewsletterPostsQuery = `
  *[_type == "post" && category == "newsletter" && (title match $searchTerm || description match $searchTerm)] | order(publishedAt desc) [0...20] {
    _id,
    title,
    slug,
    description,
    mainImage,
    thumbnail,
    generatedImageUrl,
    publishedAt,
    author,
    featured,
    category
  }
`