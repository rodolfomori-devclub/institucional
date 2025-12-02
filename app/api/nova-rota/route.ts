import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

// Criar um client com token para operações de escrita
const writeClient = sanityClient.withConfig({
    token: process.env.SANITY_API_TOKEN,
    useCdn: false
})

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD') // Split accented characters
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

export async function POST(request: NextRequest) {
    try {
        const { title, slug, description, body, author, featured } = await request.json()

        // Use provided slug or generate from title
        const finalSlug = slug ? slugify(slug) : slugify(title)

        const doc = {
            _type: 'post',
            title,
            slug: {
                current: finalSlug,
            },
            description,
            body: [
                {
                    _type: 'code',
                    language: 'markdown-content',
                    code: body
                }
            ],
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