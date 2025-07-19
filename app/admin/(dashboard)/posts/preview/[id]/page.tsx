'use client'

import MarkdownPreview from '@/components/admin/posts/MarkdownPreview'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Trash2, Upload } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Post {
    id: string
    title: string
    description: string
    content: string
    status: string
    subject?: string
    slug?: string
    createdAt?: any
    updatedAt?: any
}

export default function PostPreviewPage() {
    const params = useParams()
    const router = useRouter()
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)
    const [publishing, setPublishing] = useState(false)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        // Try to get post from sessionStorage first
        const storedPost = sessionStorage.getItem('previewPost')
        if (storedPost) {
            try {
                const parsedPost = JSON.parse(storedPost)
                setPost(parsedPost)
                setLoading(false)
                return
            } catch (error) {
                console.error('Error parsing stored post:', error)
            }
        }

        // If no stored post, you could fetch from API here
        // For now, redirect back to posts list
        router.push('/admin/posts')
    }, [params.id, router])

    const handlePublish = async () => {
        if (!post) return

        setPublishing(true)

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'publish',
                    postIds: [post.id]
                }),
            })

            const data = await response.json()

            if (data.success) {
                toast.success('Post publicado com sucesso')

                // Redirect to posts list
                router.push('/admin/posts')
            } else {
                throw new Error(data.error)
            }
        } catch (error: any) {
            console.error('Error publishing post:', error)
            toast.error('Falha ao publicar post')
        } finally {
            setPublishing(false)
        }
    }

    const handleDelete = async () => {
        if (!post) return

        const confirmed = confirm('Tem certeza que deseja deletar este post?')
        if (!confirmed) return

        setDeleting(true)

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'delete',
                    postIds: [post.id]
                }),
            })

            const data = await response.json()

            if (data.success) {
                toast.success('Post deletado com sucesso')

                // Redirect to posts list
                router.push('/admin/posts')
            } else {
                throw new Error(data.error)
            }
        } catch (error: any) {
            console.error('Error deleting post:', error)
            toast.error('Falha ao deletar post')
        } finally {
            setDeleting(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="p-6">
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-muted-foreground">Post não encontrado</p>
                        <Button className="mt-4" onClick={() => router.push('/admin/posts')}>
                            Voltar para Posts
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push('/admin/posts')}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Preview do Post</h1>
                        <p className="text-muted-foreground">Visualize como o post ficará</p>
                    </div>
                </div>

                {post.status === 'draft' && (
                    <div className="flex gap-2">
                        <Button
                            onClick={handlePublish}
                            disabled={publishing}
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            {publishing ? 'Publicando...' : 'Publicar'}
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleting}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {deleting ? 'Deletando...' : 'Deletar'}
                        </Button>
                    </div>
                )}
            </div>

            {/* Post Metadata */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <Badge variant="secondary">{post.status}</Badge>
                    </div>
                    {post.description && (
                        <p className="text-muted-foreground">{post.description}</p>
                    )}
                    {post.slug && (
                        <p className="text-sm text-muted-foreground">
                            URL: /blog/{post.slug}
                        </p>
                    )}
                </CardHeader>
            </Card>

            {/* Post Content Preview */}
            <Card>
                <CardHeader>
                    <CardTitle>Conteúdo do Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <MarkdownPreview content={post.content} />
                </CardContent>
            </Card>
        </div>
    )
} 