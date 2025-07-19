import Image from 'next/image'
import Link from 'next/link'

interface CTA {
    id: string
    title: string
    description?: string
    image?: string
    videoUrl?: string
    buttonText?: string
    redirectUrl: string
    createdAt: string
    updatedAt: string
}

interface CTADisplayProps {
    cta: CTA
    variant?: 'blog' | 'admin'
}

// Utility function to convert video URLs to embeddable format
function getEmbeddableVideoUrl(url: string): string | null {
    if (!url) return null

    // YouTube URLs
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const youtubeMatch = url.match(youtubeRegex)
    if (youtubeMatch) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}`
    }

    // Vimeo URLs
    const vimeoRegex = /(?:vimeo\.com\/)(?:.*#|.*\/videos\/)?([0-9]+)/
    const vimeoMatch = url.match(vimeoRegex)
    if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }

    // If it's already an embed URL or other embeddable format, return as is
    if (url.includes('/embed/') || url.includes('player.vimeo.com')) {
        return url
    }

    // For other URLs, return as is and let the browser handle it
    return url
}

export default function CTADisplay({ cta, variant = 'blog' }: CTADisplayProps) {
    if (!cta) return null

    const baseStyles = variant === 'blog'
        ? "mt-16 pt-8"
        : "border border-gray-200 rounded-lg p-6 bg-background"

    const titleStyles = variant === 'blog'
        ? "text-2xl font-bold text-white mb-4"
        : "text-xl font-bold text-gray-200 mb-4"

    const descriptionStyles = variant === 'blog'
        ? "text-gray-400 mb-6"
        : "text-gray-400 mb-6"

    const embeddableVideoUrl = cta.videoUrl ? getEmbeddableVideoUrl(cta.videoUrl) : null

    return (
        <div className={`${baseStyles} text-center`}>
            <div className="space-y-4">
                <h2 className={titleStyles}>{cta.title}</h2>

                {cta.description && (
                    <p className={descriptionStyles}>{cta.description}</p>
                )}

                {/* Video or Image Display */}
                {embeddableVideoUrl ? (
                    <div className="aspect-video w-full rounded-lg overflow-hidden">
                        <iframe
                            src={embeddableVideoUrl}
                            title={cta.title}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                ) : cta.image ? (
                    <div className="relative h-48 w-full rounded-lg overflow-hidden">
                        <Image
                            src={cta.image}
                            alt={cta.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : null}

                {cta.buttonText && cta.redirectUrl && (
                    <div className="flex justify-center">
                        <Link href={cta.redirectUrl} className="btn-glow shine">
                            {cta.buttonText}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
} 