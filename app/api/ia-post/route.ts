import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

const API_SECRET = process.env.IA_POST_API_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || authHeader !== `Bearer ${API_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    
    const { title, slug, description, body, author } = data

    if (!title || !slug || !description || !body) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, description, body' },
        { status: 400 }
      )
    }

    let processedBody
    
    if (typeof body === 'string') {
      processedBody = body.split('\n\n').map(paragraph => ({
        _type: 'block',
        _key: Math.random().toString(36).substring(7),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: Math.random().toString(36).substring(7),
            text: paragraph,
            marks: []
          }
        ],
        markDefs: []
      }))
    } else if (Array.isArray(body)) {
      processedBody = body
    } else {
      return NextResponse.json(
        { error: 'Body must be a string or array of blocks' },
        { status: 400 }
      )
    }

    const doc = {
      _type: 'post',
      title,
      slug: {
        current: slug,
      },
      description,
      body: processedBody,
      publishedAt: new Date().toISOString(),
      author: author || 'IA DevClub',
    }

    const result = await sanityClient.create(doc)

    return NextResponse.json({
      success: true,
      post: {
        id: result._id,
        title: result.title,
        slug: result.slug.current,
        publishedAt: result.publishedAt,
      }
    })
  } catch (error: any) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}