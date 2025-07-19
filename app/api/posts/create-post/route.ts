import { markdownToPortableText } from "@/lib/markdownToPortableText"
import { sanityClient } from "@/lib/sanity"
import { NextRequest, NextResponse } from "next/server"

const writeClient = sanityClient.withConfig({
    token: process.env.SANITY_API_TOKEN,
    useCdn: false
})

export async function POST(request: NextRequest) {
    try {

        const { title, slug, description, content, author, featured } = await request.json()

        if (!title || !slug || !description || !content) {
            return NextResponse.json(
                { error: 'Invalid request data' },
                { status: 400 }
            )
        }

        // Create post in Sanity
        const sanityDoc = {
            _type: 'post',
            title: title,
            slug: {
                current: slug,
            },
            description: description,
            body: markdownToPortableText(content),
            publishedAt: new Date().toISOString(),
            author: author || "DevClub",
            featured,
        }

        const sanityResult = await writeClient.create(sanityDoc)

        return NextResponse.json({
            success: true,
            message: `Post created successfully`,
            sanityId: sanityResult._id,
        })
    } catch (error: any) {
        console.error('Error in bulk operation:', error)
        return NextResponse.json(
            { error: 'Failed to process bulk operation', details: error.message },
            { status: 500 }
        )
    }
} 