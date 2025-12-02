import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        // Fetch the latest 5 posts, ensuring we bypass CDN
        const client = sanityClient.withConfig({ useCdn: false })
        const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) [0...5] {
        title,
        "slug": slug.current,
        publishedAt,
        _id
      }
    `)

        return NextResponse.json({
            count: posts.length,
            posts
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
