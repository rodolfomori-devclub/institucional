'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { PostFormData, StepProps } from './types'

export default function PostFormManual({ onNext, onPrevious }: StepProps) {
    const [generatingAI, setGeneratingAI] = useState(false)
    const [aiError, setAiError] = useState('')
    const {
        register,
        watch,
        setValue,
        setError,
        formState: { errors, isValid },
    } = useFormContext<PostFormData>()

    const title = watch('title')
    const slug = watch('slug')
    const description = watch('description')
    const body = watch('body')

    // Auto-generate slug from title
    useEffect(() => {
        const generateSlug = (text: string) => {
            return text
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '')
        }

        if (title) {
            setValue('slug', generateSlug(title))
        }
    }, [title, setValue])

    const handleContinue = () => {
        // Custom validation for required fields only (author is optional)
        const requiredFieldsValid = title && slug && description && body
        if (requiredFieldsValid) {
            onNext()
        }
    }

    const handleGenerateAIContent = async () => {
        if (!title.trim()) {
            setError('title', { message: 'Por favor, insira um tema para o post' })
            return
        }

        setGeneratingAI(true)
        setAiError('')

        try {
            const response = await fetch('/api/ia-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic: title }),
            })

            if (!response.ok) {
                throw new Error('Erro ao gerar post com IA')
            }

            const data = await response.json()

            setValue('title', data.title)
            setValue('slug', data.slug)
            setValue('description', data.excerpt)
            setValue('body', data.content)
        } catch (error) {
            console.error('Error generating with AI:', error)
            setAiError('Erro ao gerar post com IA. Tente novamente.')
        } finally {
            setGeneratingAI(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar Post Manual</CardTitle>
                <CardDescription>
                    Preencha todos os campos para criar seu post personalizado
                </CardDescription>
                {aiError && (
                    <div className="text-sm text-destructive mt-1">
                        {aiError}
                    </div>
                )}
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-2">
                            Título *
                        </label>
                        <Input
                            id="title"
                            {...register('title', { required: 'Título é obrigatório' })}
                            className={errors.title ? 'border-destructive' : ''}
                        />
                        {errors.title && (
                            <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium mb-2">
                            Slug (URL) *
                        </label>
                        <Input
                            id="slug"
                            {...register('slug', { required: 'Slug é obrigatório' })}
                            className={errors.slug ? 'border-destructive' : ''}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                            URL do post: /blog/{slug}
                        </p>
                        {errors.slug && (
                            <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                        Descrição (SEO) *
                    </label>
                    <textarea
                        id="description"
                        rows={3}
                        maxLength={160}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...register('description', {
                            required: 'Descrição é obrigatória',
                            maxLength: { value: 160, message: 'Máximo 160 caracteres' }
                        })}
                    />
                    <div className="flex justify-between mt-1">
                        <p className="text-xs text-muted-foreground">
                            {description?.length || 0}/160 caracteres
                        </p>
                        {errors.description && (
                            <p className="text-sm text-destructive">{errors.description.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="author" className="block text-sm font-medium mb-2">
                        Autor (opcional)
                    </label>
                    <Input
                        id="author"
                        {...register('author')}
                    />
                </div>

                <div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="featured"
                            className="h-4 w-4 text-primary focus:ring-primary border-input bg-background rounded"
                            {...register('featured')}
                        />
                        <label htmlFor="featured" className="text-sm font-medium">
                            Post em destaque
                        </label>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Posts em destaque aparecem na sidebar e podem ser exibidos como post principal
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <Button
                        type="button"
                        variant="default"
                        className="text-sm text-white w-fit ml-auto -mb-6"
                        disabled={generatingAI || !title.trim()}
                        isLoading={generatingAI}
                        onClick={handleGenerateAIContent}
                    >
                        {generatingAI ? 'Gerando...' : 'Gerar conteúdo com IA'}
                    </Button>
                    <label htmlFor="body" className="block text-sm font-medium mb-2">
                        Conteúdo do Post *
                    </label>
                    <textarea
                        id="body"
                        rows={15}
                        className="flex min-h-[400px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                        placeholder="Digite o conteúdo em Markdown. Use ![alt](url) para imagens."
                        {...register('body', { required: 'Conteúdo é obrigatório' })}
                    />
                    {errors.body && (
                        <p className="text-sm text-destructive mt-1">{errors.body.message}</p>
                    )}
                    <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                        <p>Formatação suportada:</p>
                        <ul className="ml-4 space-y-0.5">
                            <li>• Parágrafos: separe com linha em branco</li>
                            <li>• Títulos: ## Título</li>
                            <li>• Negrito: **texto**</li>
                            <li>• Itálico: *texto*</li>
                            <li>• Links: [texto](url)</li>
                            <li>• Imagens: ![descrição](url)</li>
                            <li>• Listas: - item ou 1. item</li>
                            <li>• Código: `código` ou ```linguagem</li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-between pt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onPrevious}
                    >
                        Voltar
                    </Button>
                    <Button
                        type="button"
                        onClick={handleContinue}
                        disabled={!(title && slug && description && body)}
                    >
                        Continuar
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
} 