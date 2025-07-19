'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useFormContext } from 'react-hook-form'
import { PostFormData, PostType, PostTypeOption, StepProps } from './types'

const postTypeOptions: PostTypeOption[] = [
    {
        type: PostType.MANUAL,
        title: 'Manual',
        description: 'Crie um post do zero com total controle sobre o conteúdo',
        icon: '✍️',
        features: [
            'Controle total sobre título e conteúdo',
            'Formatação personalizada em Markdown',
            'Ideal para conteúdo específico',
            'SEO otimizado manualmente'
        ]
    },
    {
        type: PostType.TEMA,
        title: 'Por Tema',
        description: 'Digite um tema e deixe a IA criar um post completo e otimizado',
        icon: '🤖',
        features: [
            'Geração automática de conteúdo',
            'SEO otimizado pela IA',
            'Estrutura profissional',
            'Economia de tempo'
        ]
    },
    {
        type: PostType.DUVIDAS,
        title: 'Dúvidas Mais Pesquisadas',
        description: 'Baseado em um tema, a IA extrai as 30 dúvidas mais pesquisadas e cria posts',
        icon: '🔍',
        features: [
            'Baseado em pesquisas reais',
            'Múltiplos posts de um tema',
            'Alta relevância de conteúdo',
            'Engagement garantido'
        ]
    }
]

export default function PostTypeSelection({ onNext }: StepProps) {
    const { setValue, watch } = useFormContext<PostFormData>()
    const selectedType = watch('type')

    const handleSelectType = (type: PostType) => {
        setValue('type', type)
    }

    const handleContinue = () => {
        onNext()
    }

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-2">Como você quer criar seu post?</h2>
                <p className="text-muted-foreground">
                    Escolha uma das opções abaixo para começar a criar seu post
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {postTypeOptions.map((option) => (
                    <Card
                        key={option.type}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${selectedType === option.type
                                ? 'ring-2 ring-primary border-primary'
                                : 'hover:border-primary/50'
                            }`}
                        onClick={() => handleSelectType(option.type)}
                    >
                        <CardHeader className="text-center">
                            <div className="text-4xl mb-3">{option.icon}</div>
                            <CardTitle className="text-lg">{option.title}</CardTitle>
                            <CardDescription>{option.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {option.features.map((feature, index) => (
                                    <li key={index} className="flex items-start text-sm">
                                        <span className="text-primary mr-2 mt-0.5">•</span>
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-center pt-6">
                <Button
                    onClick={handleContinue}
                    size="lg"
                    className="min-w-[120px]"
                    disabled={!selectedType}
                >
                    Continuar
                </Button>
            </div>
        </div>
    )
} 