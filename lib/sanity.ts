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
  body: any[]
  publishedAt: string
  author?: string
}

export const postQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    publishedAt,
    author
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    mainImage,
    body,
    publishedAt,
    author
  }
`

export const postPathsQuery = `
  *[_type == "post"] {
    "slug": slug.current
  }
`