'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { memo, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import MarkdownPreview from './MarkdownPreview'
import { PostFormData } from './types'

interface PostPreviewModeProps {
    onEdit: () => void
}

const PostPreviewMode = memo(({ onEdit }: PostPreviewModeProps) => {
    const { watch } = useFormContext<PostFormData>()
    const formData = watch()

    // Memoize the metadata to prevent unnecessary re-renders
    const metadata = useMemo(() => ({
        title: formData.title || 'Sem título',
        slug: formData.slug || 'sem-slug',
        description: formData.description || 'Sem descrição',
        author: formData.author || 'Autor não especificado',
        featured: formData.featured || false,
        body: formData.body || '',
        wordCount: formData.body ? formData.body.trim().split(/\s+/).length : 0,
        readingTime: formData.body ? Math.ceil(formData.body.trim().split(/\s+/).length / 200) : 0
    }), [formData])

    return (
        <div className="space-y-6">
            {/* Header with Edit Button */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Metadados do Post</h3>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onEdit}
                    size="sm"
                >
                    ✏️ Editar
                </Button>
            </div>

            {/* Post Metadata */}
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Título</label>
                        <p className="text-lg font-semibold mt-1">{metadata.title}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">URL</label>
                        <p className="text-sm mt-1 font-mono text-primary">
                            /blog/{metadata.slug}
                        </p>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-muted-foreground">Descrição (SEO)</label>
                    <p className="text-sm mt-1 leading-relaxed">{metadata.description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Autor</label>
                        <p className="text-sm mt-1">{metadata.author}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                        <div className="mt-1">
                            {metadata.featured ? (
                                <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                                    ⭐ Em destaque
                                </Badge>
                            ) : (
                                <Badge variant="secondary">
                                    📄 Post normal
                                </Badge>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Estatísticas</label>
                        <p className="text-sm mt-1">
                            {metadata.wordCount} palavras • {metadata.readingTime} min de leitura
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Preview */}
            <div className="rounded-lg">

                {metadata.body ? (
                    <div className="bg-background rounded-lg">
                        <MarkdownPreview content={metadata.body} className="p-6" />
                    </div>
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        <p className="text-lg mb-2">📝</p>
                        <p>Nenhum conteúdo para visualizar</p>
                        <p className="text-sm">Adicione conteúdo em Markdown para ver o preview</p>
                    </div>
                )}
            </div>

            {/* SEO Preview */}
            <div className="border rounded-lg">
                <div className="bg-muted/30 px-6 py-3 border-b">
                    <h4 className="font-medium flex items-center gap-2">
                        🔍 Preview do Google
                        <span className="text-xs text-muted-foreground font-normal">
                            (Como aparecerá nos resultados de busca)
                        </span>
                    </h4>
                </div>

                <div className="p-6">
                    <div className="max-w-2xl">
                        <div className="text-xs text-green-700 mb-1">
                            https://devclub.com.br/blog/{metadata.slug}
                        </div>
                        <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-2">
                            {metadata.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {metadata.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
})

PostPreviewMode.displayName = 'PostPreviewMode'

export default PostPreviewMode 