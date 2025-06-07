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
}

// Query para posts com paginação
export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    description,
    mainImage,
    thumbnail,
    generatedImageUrl,
    publishedAt,
    author,
    featured
  }
`

// Query para posts em destaque
export const featuredPostsQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc) [0...5] {
    _id,
    title,
    slug,
    description,
    mainImage,
    thumbnail,
    generatedImageUrl,
    publishedAt,
    author,
    featured
  }
`

// Query para o post principal em destaque
export const mainFeaturedPostQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc) [0] {
    _id,
    title,
    slug,
    description,
    mainImage,
    thumbnail,
    generatedImageUrl,
    publishedAt,
    author,
    featured
  }
`

// Query para pesquisar posts
export const searchPostsQuery = `
  *[_type == "post" && (title match $searchTerm || description match $searchTerm)] | order(publishedAt desc) [0...20] {
    _id,
    title,
    slug,
    description,
    mainImage,
    thumbnail,
    generatedImageUrl,
    publishedAt,
    author,
    featured
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
    featured
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
    featured
  }
`

export const postPathsQuery = `
  *[_type == "post"] {
    "slug": slug.current
  }
`