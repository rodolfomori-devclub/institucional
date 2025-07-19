import { blogPostPrompt } from '@/lib/ai-blog-prompt'
import { sanityClient } from '@/lib/sanity'
import { NextRequest, NextResponse } from 'next/server'


const API_SECRET = process.env.IA_POST_API_SECRET || 'your-secret-key'
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

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
              content: blogPostPrompt
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
      const content = aiResponse.choices[0].message.content

      // Use robust JSON parsing
      const postData = JSON.parse(content)

      // Validate that we have the required fields
      if (!postData.title || !postData.content) {
        throw new Error('AI response missing required fields (title or content)')
      }

      // Generate image for the post
      try {
        const imagePrompt = `Create a modern, professional thumbnail image for a tech blog post about: ${postData.title}. The image should be visually appealing, tech-themed, and suitable for a programming/technology blog. Style: modern, clean, tech-focused.`

        const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt: imagePrompt,
            size: '1024x1024',
            quality: 'standard',
            n: 1,
          }),
        })

        if (imageResponse.ok) {
          const imageData = await imageResponse.json()
          postData.generatedImageUrl = imageData.data[0].url
        }
      } catch (imageError) {
        console.warn('Failed to generate image, continuing without it:', imageError)
      }

      return NextResponse.json(postData)
    } catch (error: any) {
      console.error('Error generating with AI:', error)
      return NextResponse.json(
        { error: 'Failed to generate content with AI', details: error.message },
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