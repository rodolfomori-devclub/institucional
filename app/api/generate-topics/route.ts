import { NextRequest, NextResponse } from 'next/server'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
export const maxDuration = 300

export async function POST(request: NextRequest) {
    let content = ''
    try {
        const { subject } = await request.json()

        if (!subject?.trim()) {
            return NextResponse.json(
                { error: 'Subject is required' },
                { status: 400 }
            )
        }

        if (!OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            )
        }

        const prompt = `Generate 30 realistic and highly searched programming topics/questions about "${subject}". 
    
    Focus on:
    - Real doubts beginners and intermediate developers have
    - Practical, actionable questions
    - SEO-friendly titles that people actually search
    - Current trends and best practices in 2024
    - Mix of beginner, intermediate topics
    
    Return as JSON array with this exact structure:
    [
      {
        "question": "What is ${subject} and how does it work?",
        "title": "Complete Guide: What is ${subject} and How Does It Work?",
        "description": "Learn the fundamentals of ${subject} with practical examples and real-world applications."
      }
    ]
    
    Make sure all titles are engaging, SEO-optimized, and different from each other. Generate the posts in portuguese.`

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
                        content: 'You are an expert content creator who generates viral programming topics based on real search data and trending questions.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.8,
                max_tokens: 4000,
            }),
        })

        if (!response.ok) {
            throw new Error('Failed to generate topics with AI')
        }

        const aiResponse = await response.json()
        content = aiResponse.choices[0].message.content

        // Use robust JSON parsing
        const topics = JSON.parse(content)

        // Validate that we got an array
        if (!Array.isArray(topics)) {
            throw new Error('AI response is not an array of topics')
        }

        // Add unique IDs to topics
        const topicsWithIds = topics.map((topic: any, index: number) => ({
            id: `topic-${Date.now()}-${index}`,
            ...topic
        }))

        return NextResponse.json({
            success: true,
            topics: topicsWithIds,
            subject
        })

    } catch (error: any) {
        console.error('Error generating topics:', error)
        console.log('content', content)
        console.log('parsedContent', JSON.parse(content))
        return NextResponse.json(
            { error: 'Failed to generate topics', details: error.message, content: content, parsedContent: JSON.parse(content) },
            { status: 500 }
        )
    }
} 