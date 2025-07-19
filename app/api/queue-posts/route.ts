import { db } from '@/lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { topics, subject } = await request.json()

        if (!topics || !Array.isArray(topics) || topics.length === 0) {
            return NextResponse.json(
                { error: 'Topics array is required' },
                { status: 400 }
            )
        }

        if (!subject?.trim()) {
            return NextResponse.json(
                { error: 'Subject is required' },
                { status: 400 }
            )
        }

        // Queue all selected topics in Firebase
        const queuedPosts = []
        const postsCollection = collection(db, 'posts')

        for (const topic of topics) {
            const postDoc = {
                title: topic.title,
                status: 'generate',
                subject,
                question: topic.question,
                description: topic.description,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            }

            const docRef = await addDoc(postsCollection, postDoc)
            queuedPosts.push({
                id: docRef.id,
                ...postDoc
            })
        }

        return NextResponse.json({
            success: true,
            message: `${queuedPosts.length} posts queued for generation`,
            queuedPosts: queuedPosts.length,
            jobId: `job-${Date.now()}` // Simple job ID for tracking
        })

    } catch (error: any) {
        console.error('Error queuing posts:', error)
        return NextResponse.json(
            { error: 'Failed to queue posts', details: error.message },
            { status: 500 }
        )
    }
} 