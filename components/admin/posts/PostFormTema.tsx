'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { PostFormData, StepProps } from './types'

export default function PostFormTema({ onNext, onPrevious }: StepProps) {
    const router = useRouter()
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<PostFormData>()

    const [isGenerating, setIsGenerating] = useState(false)
    const [isPublishing, setIsPublishing] = useState(false)
    const [generationError, setGenerationError] = useState('')
    const [publishSuccess, setPublishSuccess] = useState(false)

    const aiTopic = watch('aiTopic')
    const body = watch('body')

    const handleGenerateWithAI = async () => {
        if (!aiTopic?.trim()) {
            setGenerationError('Por favor, insira um tema para o post')
            return
        }

        setIsGenerating(true)
        setGenerationError('')

        try {
            const response = await fetch('/api/ia-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic: aiTopic }),
            })

            if (!response.ok) {
                throw new Error('Erro ao gerar post com IA')
            }

            const data = await response.json()

            setValue('title', data.title)
            setValue('slug', data.slug)
            setValue('description', data.excerpt)
            setValue('body', data.content)
            setValue('author', "DevClub")

            // Automatically proceed to preview step
            onNext()
        } catch (error) {
            console.error('Error generating with AI:', error)
            setGenerationError('Erro ao gerar post com IA. Tente novamente.')
        } finally {
            setIsGenerating(false)
        }
    }

    if (publishSuccess) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Post Publicado!</CardTitle>
                    <CardDescription>
                        Seu post foi gerado e publicado com sucesso
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-green-800 mb-2">
                            Post publicado com sucesso!
                        </h3>
                        <p className="text-green-700 mb-4">
                            Seu post sobre <strong>{aiTopic}</strong> foi gerado e publicado.
                        </p>
                        <p className="text-sm text-green-600">
                            Redirecionando para a lista de posts...
                        </p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gerar Post por Tema</CardTitle>
                <CardDescription>
                    Digite um tema e deixe a IA criar um post completo e otimizado para você
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {generationError && (
                    <div className="rounded-md bg-destructive/10 border border-destructive/20 p-4">
                        <p className="text-sm text-destructive">{generationError}</p>
                    </div>
                )}

                <div>
                    <label htmlFor="aiTopic" className="block text-sm font-medium mb-2">
                        Tema do Post *
                    </label>
                    <div className="flex gap-3">
                        <Input
                            id="aiTopic"
                            placeholder="Ex: React Hooks, Machine Learning, Marketing Digital"
                            className="flex-1"
                            {...register('aiTopic', { required: 'Tema é obrigatório' })}
                        />
                        <Button
                            type="button"
                            onClick={handleGenerateWithAI}
                            disabled={isGenerating || isPublishing || !aiTopic?.trim()}
                        >
                            {isGenerating ? 'Gerando...' : 'Gerar Post'}
                        </Button>
                    </div>
                    {errors.aiTopic && (
                        <p className="text-sm text-destructive mt-1">{errors.aiTopic.message}</p>
                    )}
                </div>

                {(isGenerating || isPublishing) && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center space-y-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                            <p className="text-sm text-muted-foreground">
                                {isGenerating ? 'A IA está criando seu post personalizado...' : 'Publicando post...'}
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex justify-between pt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onPrevious}
                        disabled={isGenerating || isPublishing}
                    >
                        Voltar
                    </Button>
                    <Button
                        type="button"
                        onClick={onNext}
                        disabled={!body || isGenerating || isPublishing}
                    >
                        Continuar para Preview
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
} 