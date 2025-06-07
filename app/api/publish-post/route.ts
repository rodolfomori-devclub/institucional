import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'
import { markdownToPortableText } from '@/lib/markdownToPortableText'

// Criar um client com token para operações de escrita
const writeClient = sanityClient.withConfig({
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})

export async function POST(request: NextRequest) {
  try {
    const { title, slug, description, body, author, featured } = await request.json()

    const doc = {
      _type: 'post',
      title,
      slug: {
        current: slug,
      },
      description,
      body: markdownToPortableText(body),
      publishedAt: new Date().toISOString(),
      author: author || undefined,
      featured: !!featured,
    }

    const result = await writeClient.create(doc)
    
    return NextResponse.json({ success: true, post: result })
  } catch (error: any) {
    console.error('Error publishing post:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}