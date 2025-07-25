import { blogPostPrompt } from '@/lib/ai-blog-prompt'
import { sanityClient } from '@/lib/sanity'
import { parseJsonFromAI } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'


const API_SECRET = process.env.IA_POST_API_SECRET || 'your-secret-key'
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
export const maxDuration = 300

export async function POST(request: NextRequest) {
  const data = await request.json()

  // Debug: Check what environment variables are available
  console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY)
  console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('OPENAI')))

  // Check if this is an AI generation request
  if (data.topic) {
    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }
    let content = ''
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `${blogPostPrompt}\n\nIMPORTANT: Return ONLY valid JSON without any markdown formatting or code blocks.`
            },
            {
              role: 'user',
              content: `Crie um post sobre: ${data.topic}`
            }
          ],
          temperature: 0.7,
          max_tokens: 4000,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate content with AI')
      }

      const aiResponse = await response.json()
      content = aiResponse.choices[0].message.content

      // Use robust JSON parsing that handles markdown-wrapped content
      const postData = parseJsonFromAI(content)

      // Validate that we have the required fields
      if (!postData.title || !postData.content) {
        throw new Error('AI response missing required fields (title or content)')
      }

      // Return immediately to avoid timeout
      // Image generation can be added separately later
      return NextResponse.json({
        ...postData,
        message: 'Content generated successfully. Image generation can be added in a separate step.'
      })
    } catch (error: any) {
      console.error('Error generating with AI:', error)
      return NextResponse.json(
        {
          error: 'Failed to generate content with AI',
          details: error.message,
          content: content ? content.substring(0, 500) + '...' : 'No content received'
        },
        { status: 500 }
      )
    }
  }

  // Original functionality for creating posts with API secret
  const authHeader = request.headers.get('authorization')

  if (!authHeader || authHeader !== `Bearer ${API_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

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
}