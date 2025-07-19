'use client'

import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PostFormDuvidas from './PostFormDuvidas'
import PostFormManual from './PostFormManual'
import PostFormTema from './PostFormTema'
import PostPreview from './PostPreview'
import PostTypeSelection from './PostTypeSelection'
import { PostFormData, PostType } from './types'

const TOTAL_STEPS = 3

export default function PostsWizard() {
    const [currentStep, setCurrentStep] = useState(1)

    const form = useForm<PostFormData>({
        defaultValues: {
            type: PostType.MANUAL,
            title: '',
            slug: '',
            description: '',
            body: '',
            author: '',
            featured: false,
            aiTopic: '',
            aiSubject: '',
        },
        mode: 'onChange'
    })

    const { watch } = form
    const selectedType = watch('type')

    const handleNext = useCallback(() => {
        if (currentStep < TOTAL_STEPS) {
            setCurrentStep(prev => prev + 1)
        }
    }, [currentStep])

    const handlePrevious = useCallback(() => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1)
        }
    }, [currentStep])

    const handleStepChange = useCallback((step: number) => {
        if (step >= 1 && step <= TOTAL_STEPS) {
            setCurrentStep(step)
        }
    }, [])

    const stepProps = {
        currentStep,
        totalSteps: TOTAL_STEPS,
        onNext: handleNext,
        onPrevious: handlePrevious,
        onStepChange: handleStepChange,
    }

    const renderFormStep = () => {
        switch (selectedType) {
            case PostType.MANUAL:
                return <PostFormManual {...stepProps} />
            case PostType.TEMA:
                return <PostFormTema {...stepProps} />
            case PostType.DUVIDAS:
                return <PostFormDuvidas {...stepProps} />
            default:
                return <PostFormManual {...stepProps} />
        }
    }

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return <PostTypeSelection {...stepProps} />
            case 2:
                return renderFormStep()
            case 3:
                return <PostPreview {...stepProps} />
            default:
                return <PostTypeSelection {...stepProps} />
        }
    }

    return (
        <FormProvider {...form}>
            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-8 text-center">Criar Novo Post</h1>

                        {/* Step Indicator */}
                        <div className="flex items-center justify-center space-x-4 mb-20">
                            {Array.from({ length: TOTAL_STEPS }, (_, index) => {
                                const step = index + 1
                                const isActive = step === currentStep
                                const isCompleted = step < currentStep

                                return (
                                    <div key={step} className="flex items-center">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${isActive
                                                ? 'bg-primary text-primary-foreground'
                                                : isCompleted
                                                    ? 'bg-primary/80 text-primary-foreground'
                                                    : 'bg-muted text-muted-foreground'
                                                }`}
                                        >
                                            {step}
                                        </div>
                                        {step < TOTAL_STEPS && (
                                            <div
                                                className={`w-16 h-0.5 transition-colors ${isCompleted ? 'bg-primary/80' : 'bg-muted'
                                                    }`}
                                            />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {renderCurrentStep()}
                </div>
            </div>
        </FormProvider>
    )
} 