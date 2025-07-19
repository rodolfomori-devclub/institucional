'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { PostFormData } from './types'

interface PostEditModeProps {
    onSaveEdit: () => void
    onCancelEdit: () => void
}

const PostEditMode = memo(({ onSaveEdit, onCancelEdit }: PostEditModeProps) => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<PostFormData>()

    const description = watch('description')

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Editando Post</h3>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancelEdit}
                        size="sm"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        onClick={onSaveEdit}
                        size="sm"
                    >
                        Salvar Alterações
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Título *</label>
                    <Input
                        {...register('title', { required: 'Título é obrigatório' })}
                        className={errors.title ? 'border-destructive' : ''}
                    />
                    {errors.title && (
                        <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Slug (URL) *</label>
                    <Input
                        {...register('slug', { required: 'Slug é obrigatório' })}
                        className={errors.slug ? 'border-destructive' : ''}
                    />
                    {errors.slug && (
                        <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Descrição (SEO) *</label>
                <textarea
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Autor</label>
                    <Input {...register('author')} />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <input
                            type="checkbox"
                            id="featured-edit"
                            className="h-4 w-4 text-primary focus:ring-primary border-input bg-background rounded"
                            {...register('featured')}
                        />
                        <label htmlFor="featured-edit" className="text-sm">
                            Post em destaque
                        </label>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Conteúdo *</label>
                <textarea
                    rows={15}
                    className="flex min-h-[400px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                    placeholder="Digite o conteúdo em Markdown..."
                    {...register('body', { required: 'Conteúdo é obrigatório' })}
                />
                {errors.body && (
                    <p className="text-sm text-destructive mt-1">{errors.body.message}</p>
                )}
                <div className="mt-2 text-xs text-muted-foreground">
                    <p className="mb-1">Formatação Markdown suportada:</p>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <p>• **negrito** → <strong>negrito</strong></p>
                            <p>• *itálico* → <em>itálico</em></p>
                            <p>• `código` → <code className="bg-muted px-1 rounded">código</code></p>
                        </div>
                        <div>
                            <p>• # Título → <strong>Título</strong></p>
                            <p>• [link](url) → <span className="text-primary underline">link</span></p>
                            <p>• ![alt](url) → imagem</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

PostEditMode.displayName = 'PostEditMode'

export default PostEditMode 