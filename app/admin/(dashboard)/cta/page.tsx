'use client'
import CTADisplay from "@/components/blog/CTADisplay"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

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

export default function CTA() {
    const [cta, setCTA] = useState<CTA | null>(null)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        const fetchCTA = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/cta')
                const data = await response.json()
                setCTA(data.cta)
            } catch (error) {
                console.error('Error fetching CTA:', error)
                toast.error('Erro ao carregar CTA')
            } finally {
                setLoading(false)
            }
        }
        fetchCTA()
    }, [])

    const handleEditToggle = () => {
        setEditing(!editing)
    }

    const handleSuccess = (newCTA: CTA) => {
        setCTA(newCTA)
        setEditing(false)
    }

    if (loading) {
        return (
            <div className="space-y-4 mt-4">
                <h1 className="text-2xl font-bold text-center">Carregando CTA...</h1>
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 mt-4">
            <h1 className="text-2xl font-bold text-center">
                {cta ? 'Gerenciar CTA' : 'Defina o CTA dos posts do blog'}
            </h1>

            <div className="max-w-4xl mx-auto space-y-6">
                {cta && !editing && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">CTA Atual</h2>
                            <Button onClick={handleEditToggle} variant="outline">
                                Editar CTA
                            </Button>
                        </div>
                        <CTADisplay cta={cta} variant="admin" />
                    </div>
                )}

                {(!cta || editing) && (
                    <div className="border border-gray-200 rounded-lg p-6 bg-background">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">
                                {cta ? 'Editar CTA' : 'Criar Novo CTA'}
                            </h2>
                            {editing && (
                                <Button onClick={handleEditToggle} variant="outline">
                                    Cancelar
                                </Button>
                            )}
                        </div>
                        <CTAForm defaultValues={cta || undefined} onSuccess={handleSuccess} />
                    </div>
                )}
            </div>
        </div>
    )
}

const CTAForm = ({ defaultValues, onSuccess }: { defaultValues?: CTA, onSuccess: (cta: CTA) => void }) => {

    const { register, handleSubmit } = useForm<CTA>({
        defaultValues: defaultValues || {}
    })

    const onSubmit = async (data: CTA) => {
        try {
            const response = await fetch('/api/cta', {
                method: defaultValues ? 'PUT' : 'POST',
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
            toast.success('CTA salvo com sucesso')
            onSuccess(responseData.cta)
        } catch (error) {
            console.error(error)
            toast.error('Erro ao salvar CTA')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
            <div>
                <label htmlFor="title">Título</label>
                <Input type="text" id="title" required {...register('title')} />
            </div>
            <div>
                <label htmlFor="description">Descrição</label>
                <textarea
                    id="description"
                    rows={4}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register('description')}
                />
            </div>
            <div>
                <label htmlFor="image">Imagem (URL)</label>
                <Input type="text" id="image" {...register('image')} />
            </div>
            <div>
                <label htmlFor="videoUrl">Vídeo (URL do YouTube, Vimeo, etc.)</label>
                <Input
                    type="text"
                    id="videoUrl"
                    placeholder="Ex: https://www.youtube.com/watch?v=VIDEO_ID ou https://vimeo.com/VIDEO_ID"
                    {...register('videoUrl')}
                />
                <p className="text-sm text-gray-500 mt-1">
                    Cole qualquer URL do YouTube ou Vimeo. Será automaticamente convertido para o formato de embed.
                </p>
            </div>
            <div>
                <label htmlFor="text">Texto do botão</label>
                <Input type="text" id="text" {...register('buttonText')} />
            </div>
            <div>
                <label htmlFor="redirectUrl">URL de redirecionamento</label>
                <Input type="text" id="redirectUrl" required {...register('redirectUrl')} />
            </div>
            <Button type="submit" className="self-end">Salvar</Button>
        </form>
    )
}