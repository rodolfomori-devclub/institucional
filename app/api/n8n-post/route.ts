import { db } from '@/lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { NextRequest, NextResponse } from 'next/server'

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { title, slug, description, content, author, featured, mainImage, category } = body

        if (!title || !content) {
            return NextResponse.json(
                { success: false, error: 'Title and content are required' },
                { status: 400 }
            )
        }

        const finalSlug = slug ? slugify(slug) : slugify(title)

        // Salvar no Firebase (Firestore)
        // O status inicial é 'draft' para aparecer na aba de rascunhos do admin
        const docData = {
            title,
            slug: finalSlug,
            description: description || '',
            content, // O conteúdo vem como string (markdown/html) do n8n
            author: author || 'DevClub IA',
            featured: !!featured,
            mainImage: mainImage || null,
            status: 'draft',
            category: category || 'newsletter', // Define categoria padrão como newsletter
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            sanityId: null // Ainda não foi publicado no Sanity
        }

        const docRef = await addDoc(collection(db, 'posts'), docData)

        return NextResponse.json({
            success: true,
            message: 'Post created in Firebase and waiting for review',
            postId: docRef.id,
            status: 'draft',
            category: docData.category
        })

    } catch (error: any) {
        console.error('Error creating post from n8n:', error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}
