import { blogPostPrompt } from '@/lib/ai-blog-prompt'
import { db } from '@/lib/firebase'
import { parseJsonFromAI } from '@/lib/utils'
import { collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { NextRequest, NextResponse } from 'next/server'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY


export async function POST(request: NextRequest) {
    try {
        if (!OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            )
        }

        // Find posts with status "generate"
        const postsCollection = collection(db, 'posts')
        const q = query(postsCollection, where('status', '==', 'generate'))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
            return NextResponse.json({
                success: true,
                message: 'No posts to process',
                processed: 0
            })
        }

        const processedPosts = []
        const MAX_BATCH_SIZE = 5 // Process max 5 posts per request to avoid timeout

        let processedCount = 0
        for (const docSnapshot of querySnapshot.docs) {
            if (processedCount >= MAX_BATCH_SIZE) break

            const postData = docSnapshot.data()
            const postId = docSnapshot.id

            try {
                // Generate full post content using AI
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
                                content: `Create a comprehensive blog post about: "${postData.title}"\n\nQuestion being answered: ${postData.question}\n\nDescription: ${postData.description}\n\nSubject: ${postData.subject}`
                            }
                        ],
                        temperature: 0.7,
                        max_tokens: 4000,
                    }),
                })

                if (!response.ok) {
                    throw new Error('Failed to generate post content')
                }

                const aiResponse = await response.json()
                const content = aiResponse.choices[0].message.content

                // Use robust JSON parsing
                const generatedContent = parseJsonFromAI(content)

                // Generate image for the post
                // let generatedImageUrl = null
                // try {
                //     const imagePrompt = `Create a modern, professional thumbnail image for a tech blog post about: ${postData.title}. The image should be visually appealing, tech-themed, and suitable for a programming/technology blog. Style: modern, clean, tech-focused.`

                //     const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
                //         method: 'POST',
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': `Bearer ${OPENAI_API_KEY}`,
                //         },
                //         body: JSON.stringify({
                //             model: 'dall-e-3',
                //             prompt: imagePrompt,
                //             size: '1024x1024',
                //             quality: 'standard',
                //             n: 1,
                //         }),
                //     })

                //     if (imageResponse.ok) {
                //         const imageData = await imageResponse.json()
                //         generatedImageUrl = imageData.data[0].url
                //     }
                // } catch (imageError) {
                //     console.warn('Failed to generate image for post:', postId, imageError)
                // }

                // Generate SEO keywords
                const keywords = [
                    postData.subject,
                    ...postData.title.toLowerCase().split(' ').filter((word: string) => word.length > 3),
                    'programming',
                    'tutorial',
                    'guide'
                ].join(', ')

                // Generate slug from title
                const slug = postData.title
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '')

                // Update post in Firebase with generated content
                const postRef = doc(db, 'posts', postId)
                await updateDoc(postRef, {
                    content: generatedContent.body || generatedContent.content || content,
                    description: generatedContent.description || postData.description,
                    slug,
                    seoKeywords: keywords,
                    // generatedImageUrl,
                    // coverImage: generatedImageUrl,
                    status: 'draft',
                    updatedAt: serverTimestamp(),
                    processedAt: serverTimestamp()
                })

                processedPosts.push({
                    id: postId,
                    title: postData.title,
                    slug,
                    status: 'draft'
                })

                processedCount++

            } catch (error) {
                console.error(`Error processing post ${postId}:`, error)

                // Mark post as failed
                const postRef = doc(db, 'posts', postId)
                await updateDoc(postRef, {
                    status: 'failed',
                    error: error instanceof Error ? error.message : 'Unknown error',
                    updatedAt: serverTimestamp()
                })
            }
        }

        return NextResponse.json({
            success: true,
            message: `Processed ${processedCount} posts`,
            processed: processedCount,
            processedPosts,
            remaining: querySnapshot.size - processedCount
        })

    } catch (error: any) {
        console.error('Error processing queue:', error)
        return NextResponse.json(
            { error: 'Failed to process queue', details: error.message },
            { status: 500 }
        )
    }
} 