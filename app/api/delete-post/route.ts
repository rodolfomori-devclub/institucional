import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// POST /api/delete-post - Deleta um post pelo título ou slug
export async function POST(request: Request) {
  try {
    const { title, slug, secret } = await request.json()

    // Verificar secret para segurança
    if (secret !== process.env.DELETE_SECRET && secret !== 'devclub2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let query = ''
    let params = {}

    if (slug) {
      query = `*[_type == 'post' && slug.current == $slug][0]{_id, title, slug}`
      params = { slug }
    } else if (title) {
      query = `*[_type == 'post' && title match $title][0]{_id, title, slug}`
      params = { title: `${title}*` }
    } else {
      return NextResponse.json({ error: 'Title or slug required' }, { status: 400 })
    }

    const post = await client.fetch(query, params)

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    await client.delete(post._id)

    return NextResponse.json({
      success: true,
      message: `Post "${post.title}" deleted successfully`,
      deletedId: post._id
    })
  } catch (error: any) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET /api/delete-post - Executa deleções pendentes no deploy
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')

    if (secret !== process.env.DELETE_SECRET && secret !== 'devclub2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Lista de posts para deletar (adicione aqui os títulos dos posts)
    const postsToDelete = [
      'Google expande o Gemini 3, Meta firma parcerias em IA e AWS apresenta novidades para desenvolvedores',
    ]

    const results = []

    for (const title of postsToDelete) {
      const post = await client.fetch(
        `*[_type == 'post' && title match $title][0]{_id, title}`,
        { title: `${title}*` }
      )

      if (post) {
        await client.delete(post._id)
        results.push({ title: post.title, status: 'deleted' })
      } else {
        results.push({ title, status: 'not found' })
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
