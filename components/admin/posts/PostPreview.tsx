'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import PostEditMode from './PostEditMode'
import PostPreviewMode from './PostPreviewMode'
import { PostFormData, StepProps } from './types'

export default function PostPreview({ onPrevious, onStepChange }: StepProps) {
    const router = useRouter()
    const {
        handleSubmit,
        formState: { isValid, errors },
    } = useFormContext<PostFormData>()

    console.log({ isValid, errors })

    const [isPublishing, setIsPublishing] = useState(false)
    const [publishError, setPublishError] = useState('')
    const [publishSuccess, setPublishSuccess] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = useCallback(() => {
        setIsEditing(true)
    }, [])

    const handleSaveEdit = useCallback(() => {
        setIsEditing(false)
    }, [])

    const handleCancelEdit = useCallback(() => {
        setIsEditing(false)
    }, [])

    const handlePublish = async (data: PostFormData) => {
        setIsPublishing(true)
        setPublishError('')
        setPublishSuccess(false)

        try {

            const response = await fetch('/api/posts/create-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: data.title,
                    slug: data.slug,
                    description: data.description,
                    content: data.body,
                    author: data.author,
                    featured: data.featured,
                })
            })

            const result = await response.json()

            if (!result.success) {
                throw new Error(result.error || 'Erro ao publicar post')
            }

            toast.success('Post publicado com sucesso')
            setPublishSuccess(true)

            router.push('/admin/posts')

        } catch (error: any) {
            console.error('Error publishing post:', error)
            setPublishError('Erro ao publicar post. Verifique as configurações do Sanity.')
        } finally {
            setIsPublishing(false)
        }
    }

    if (publishSuccess) {
        return (
            <Card>
                <CardContent className="text-center py-12">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-green-800">Post Publicado com Sucesso!</h3>
                        <p className="text-muted-foreground">
                            Seu post foi publicado e já está disponível no blog.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Redirecionando para criar um novo post...
                        </p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            {!isEditing && (
                <Button
                    type="button"
                    variant="outline"
                    className="-mt-4"
                    onClick={onPrevious}
                    disabled={isPublishing}
                >
                    ← Voltar
                </Button>
            )}
            <Card>
                <CardHeader>
                    <CardTitle>
                        {isEditing ? 'Editar Post' : 'Preview do Post'}
                    </CardTitle>
                    <CardDescription>
                        {isEditing
                            ? 'Faça as alterações necessárias no seu post'
                            : 'Revise todas as informações antes de publicar'
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    {publishError && (
                        <div className="mb-6 rounded-md bg-destructive/10 border border-destructive/20 p-4">
                            <p className="text-sm text-destructive">{publishError}</p>
                        </div>
                    )}

                    {isEditing ? (
                        <PostEditMode
                            onSaveEdit={handleSaveEdit}
                            onCancelEdit={handleCancelEdit}
                        />
                    ) : (
                        <PostPreviewMode onEdit={handleEdit} />
                    )}

                    {!isEditing && (
                        <form onSubmit={handleSubmit(handlePublish)} className="mt-8">
                            <div className="flex justify-between pt-6 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onPrevious}
                                    disabled={isPublishing}
                                >
                                    ← Voltar
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={isPublishing || !isValid}
                                    size="lg"
                                    className="min-w-[140px]"
                                >
                                    {isPublishing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Publicando...
                                        </>
                                    ) : (
                                        '🚀 Publicar Post'
                                    )}
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
} 