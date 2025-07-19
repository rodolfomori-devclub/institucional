import { db } from '@/lib/firebase'
import { markdownToPortableText } from '@/lib/markdownToPortableText'
import { sanityClient } from '@/lib/sanity'
import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { NextRequest, NextResponse } from 'next/server'

// Criar um client com token para operações de escrita no Sanity
const writeClient = sanityClient.withConfig({
    token: process.env.SANITY_API_TOKEN,
    useCdn: false
})

// GET - Fetch all posts
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url)
        const status = url.searchParams.get('status') || 'draft'

        const postsCollection = collection(db, 'posts')
        const q = query(postsCollection, where('status', '==', status))
        const querySnapshot = await getDocs(q)

        const posts: any[] = []
        querySnapshot.forEach((doc) => {
            posts.push({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt.toDate(),
                updatedAt: doc.data().updatedAt.toDate()
            })
        })

        return NextResponse.json({ success: true, posts })
    } catch (error: any) {
        console.error('Error fetching posts:', error)
        return NextResponse.json(
            { error: 'Failed to fetch posts', details: error.message },
            { status: 500 }
        )
    }
}

// POST - Handle bulk operations (publish/delete)
export async function POST(request: NextRequest) {
    try {
        const { action, postIds } = await request.json()

        if (!action || !postIds || !Array.isArray(postIds)) {
            return NextResponse.json(
                { error: 'Invalid request data' },
                { status: 400 }
            )
        }

        const results = []

        if (action === 'publish') {
            // Publish posts to Sanity
            for (const postId of postIds) {
                try {
                    // Get post from Firebase
                    const postsCollection = collection(db, 'posts')
                    const postQuery = query(postsCollection, where('__name__', '==', postId))
                    const postSnapshot = await getDocs(postQuery)

                    if (postSnapshot.empty) {
                        results.push({ id: postId, success: false, error: 'Post not found' })
                        continue
                    }

                    const postData = postSnapshot.docs[0].data()

                    // Create post in Sanity
                    const sanityDoc = {
                        _type: 'post',
                        title: postData.title,
                        slug: {
                            current: postData.slug,
                        },
                        description: postData.description,
                        body: markdownToPortableText(postData.content),
                        publishedAt: new Date().toISOString(),
                        author: postData.author || 'DevClub IA',
                        featured: false,
                    }

                    const sanityResult = await writeClient.create(sanityDoc)

                    // Update Firebase post status to published
                    const postRef = doc(db, 'posts', postId)
                    await updateDoc(postRef, {
                        status: 'published',
                        publishedAt: serverTimestamp(),
                        sanityId: sanityResult._id
                    })

                    results.push({
                        id: postId,
                        success: true,
                        sanityId: sanityResult._id
                    })

                } catch (error: any) {
                    console.error(`Error publishing post ${postId}:`, error)
                    results.push({
                        id: postId,
                        success: false,
                        error: error.message
                    })
                }
            }
        } else if (action === 'delete') {
            // Delete posts from Firebase
            for (const postId of postIds) {
                try {
                    const postRef = doc(db, 'posts', postId)
                    await deleteDoc(postRef)
                    results.push({ id: postId, success: true })
                } catch (error: any) {
                    console.error(`Error deleting post ${postId}:`, error)
                    results.push({
                        id: postId,
                        success: false,
                        error: error.message
                    })
                }
            }
        } else {
            return NextResponse.json(
                { error: 'Invalid action' },
                { status: 400 }
            )
        }

        const successCount = results.filter(r => r.success).length
        const failureCount = results.filter(r => !r.success).length

        return NextResponse.json({
            success: true,
            message: `${successCount} posts ${action}ed successfully, ${failureCount} failed`,
            results,
            summary: {
                total: postIds.length,
                success: successCount,
                failed: failureCount
            }
        })

    } catch (error: any) {
        console.error('Error in bulk operation:', error)
        return NextResponse.json(
            { error: 'Failed to process bulk operation', details: error.message },
            { status: 500 }
        )
    }
} 