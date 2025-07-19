export enum PostType {
    MANUAL = 'manual',
    TEMA = 'tema',
    DUVIDAS = 'duvidas'
}

export interface PostFormData {
    // Post type selection
    type: PostType

    // Common fields for all types
    title: string
    slug: string
    description: string
    body: string
    author?: string
    featured?: boolean

    // AI-specific fields
    aiTopic?: string
    aiSubject?: string
}

export interface StepProps {
    currentStep: number
    totalSteps: number
    onNext: () => void
    onPrevious: () => void
    onStepChange: (step: number) => void
}

export interface PostTypeOption {
    type: PostType
    title: string
    description: string
    icon: string
    features: string[]
} 