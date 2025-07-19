'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { PostFormData, StepProps } from './types'

interface GeneratedTopic {
    id: string
    question: string
    title: string
    description: string
    selected: boolean
}

export default function PostFormDuvidas({ onNext, onPrevious }: StepProps) {
    const router = useRouter()
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<PostFormData>()

    const [isGenerating, setIsGenerating] = useState(false)
    const [generationError, setGenerationError] = useState('')
    const [generatedTopics, setGeneratedTopics] = useState<GeneratedTopic[]>([])
    const [isQueueing, setIsQueueing] = useState(false)
    const [queueSuccess, setQueueSuccess] = useState(false)
    const [redirectCountdown, setRedirectCountdown] = useState(3)

    const aiSubject = watch('aiSubject')

    // Handle automatic redirect after successful queue
    useEffect(() => {
        if (queueSuccess) {
            const timer = setInterval(() => {
                setRedirectCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer)
                        router.push('/admin/posts')
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [queueSuccess, router])
    console.log(queueSuccess)

    const handleGenerateTopics = async () => {
        if (!aiSubject?.trim()) {
            setGenerationError('Por favor, insira um assunto para pesquisar dúvidas')
            return
        }

        setIsGenerating(true)
        setGenerationError('')
        setGeneratedTopics([])

        try {
            const response = await fetch('/api/generate-topics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subject: aiSubject }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate topics')
            }

            const topicsWithSelection = data.topics.map((topic: any) => ({
                ...topic,
                selected: false
            }))

            setGeneratedTopics(topicsWithSelection)

        } catch (error: any) {
            console.error('Error generating topics:', error)
            setGenerationError('Erro ao gerar tópicos. Tente novamente.')
        } finally {
            setIsGenerating(false)
        }
    }

    const handleTopicToggle = (topicId: string) => {
        setGeneratedTopics(prev =>
            prev.map(topic =>
                topic.id === topicId
                    ? { ...topic, selected: !topic.selected }
                    : topic
            )
        )
    }

    const handleSelectAll = () => {
        const allSelected = generatedTopics.every(topic => topic.selected)
        setGeneratedTopics(prev =>
            prev.map(topic => ({ ...topic, selected: !allSelected }))
        )
    }

    const handleGenerateSelectedPosts = async () => {
        const selectedTopics = generatedTopics.filter(topic => topic.selected)

        if (selectedTopics.length === 0) {
            setGenerationError('Selecione pelo menos um tópico para gerar posts')
            return
        }

        setIsQueueing(true)
        setGenerationError('')

        try {
            const response = await fetch('/api/queue-posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topics: selectedTopics,
                    subject: aiSubject
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to queue posts')
            }

            setQueueSuccess(true)

            // Trigger background processing
            fetch('/api/process-queue', {
                method: 'POST',
            }).catch(error => {
                console.warn('Background processing trigger failed:', error)
            })

        } catch (error: any) {
            console.error('Error queuing posts:', error)
            setGenerationError('Erro ao iniciar geração de posts. Tente novamente.')
        } finally {
            setIsQueueing(false)
        }
    }

    const selectedCount = generatedTopics.filter(topic => topic.selected).length

    if (queueSuccess) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Posts em Geração!</CardTitle>
                    <CardDescription>
                        Seus posts estão sendo gerados em segundo plano
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
                            {selectedCount} posts em geração!
                        </h3>
                        <p className="text-green-700 mb-4">
                            Seus posts sobre <strong>{aiSubject}</strong> estão sendo criados com IA.
                            Este processo pode levar alguns minutos.
                        </p>
                        <p className="text-sm text-green-600 mb-2">
                            Você será notificado quando os posts estiverem prontos.
                        </p>
                        <p className="text-sm text-green-600 font-medium">
                            Redirecionando em {redirectCountdown} segundos...
                        </p>
                    </div>

                    <div className="flex justify-between pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setQueueSuccess(false)
                                setGeneratedTopics([])
                                setValue('aiSubject', '')
                                setRedirectCountdown(3)
                            }}
                        >
                            Gerar Mais Posts
                        </Button>
                        <Link href="/admin/posts">
                            <Button
                                type="button"
                            >
                                Ir para Posts Agora
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gerar Posts por Dúvidas Mais Pesquisadas</CardTitle>
                <CardDescription>
                    Digite um assunto e a IA vai extrair as 30 dúvidas mais pesquisadas na internet para criar posts relevantes
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {generationError && (
                    <div className="rounded-md bg-destructive/10 border border-destructive/20 p-4">
                        <p className="text-sm text-destructive">{generationError}</p>
                    </div>
                )}

                <div>
                    <label htmlFor="aiSubject" className="block text-sm font-medium mb-2">
                        Assunto para Pesquisar Dúvidas *
                    </label>
                    <div className="flex gap-3">
                        <Input
                            id="aiSubject"
                            placeholder="Ex: React, JavaScript, Python, Node.js"
                            className="flex-1"
                            {...register('aiSubject', { required: 'Assunto é obrigatório' })}
                        />
                        <Button
                            type="button"
                            onClick={handleGenerateTopics}
                            disabled={isGenerating || !aiSubject?.trim()}
                        >
                            {isGenerating ? 'Gerando...' : 'Gerar 30 Tópicos'}
                        </Button>
                    </div>
                    {errors.aiSubject && (
                        <p className="text-sm text-destructive mt-1">{errors.aiSubject.message}</p>
                    )}
                </div>

                {isGenerating && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center space-y-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                            <p className="text-sm text-muted-foreground">
                                Analisando as dúvidas mais pesquisadas sobre {aiSubject}...
                            </p>
                        </div>
                    </div>
                )}

                {generatedTopics.length > 0 && !isGenerating && (
                    <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-sm font-medium text-blue-800">
                                        {generatedTopics.length} tópicos encontrados!
                                    </span>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSelectAll}
                                >
                                    {generatedTopics.every(topic => topic.selected) ? 'Desmarcar Todos' : 'Selecionar Todos'}
                                </Button>
                            </div>
                            <p className="text-sm text-blue-700">
                                Selecione os tópicos que deseja transformar em posts. Selecionados: {selectedCount}
                            </p>
                        </div>

                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            <h3 className="text-lg font-medium">Tópicos Mais Pesquisados:</h3>
                            <div className="grid gap-3">
                                {generatedTopics.map((topic) => (
                                    <Card
                                        key={topic.id}
                                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${topic.selected
                                            ? 'ring-2 ring-primary border-primary bg-primary/5'
                                            : 'hover:border-primary/50'
                                            }`}
                                        onClick={() => handleTopicToggle(topic.id)}
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-start space-x-3">
                                                <input
                                                    type="checkbox"
                                                    checked={topic.selected}
                                                    onChange={() => handleTopicToggle(topic.id)}
                                                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-medium mb-1">{topic.question}</h4>
                                                    <p className="text-sm text-muted-foreground mb-2">
                                                        {topic.description}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Título sugerido: &quot;{topic.title}&quot;
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {selectedCount > 0 && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-green-800">
                                            {selectedCount} posts serão gerados
                                        </p>
                                        <p className="text-xs text-green-600">
                                            Os posts serão criados em segundo plano com IA
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={handleGenerateSelectedPosts}
                                        disabled={isQueueing}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        {isQueueing ? 'Iniciando...' : `Gerar ${selectedCount} Posts`}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

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
                        onClick={onNext}
                        disabled={!queueSuccess}
                    >
                        Continuar
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
} 