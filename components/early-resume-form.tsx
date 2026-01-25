'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import {
  EDUCATION_STAGES,
  COMMON_EARLY_SKILLS,
  EXPERIENCE_TYPES,
  type EarlyResumeSignals,
  type EducationStage,
} from '@/lib/resume-signals'

interface EarlyResumeFormProps {
  onSubmit: (signals: EarlyResumeSignals) => void
  onBack?: () => void
  major: string
}

export function EarlyResumeForm({ onSubmit, onBack, major }: EarlyResumeFormProps) {
  const [formData, setFormData] = useState<EarlyResumeSignals>({
    stage: 'early-college',
    skills: [],
    experiences: [],
  })

  const [currentStep, setCurrentStep] = useState<'stage' | 'skills' | 'experiences'>('stage')

  const handleStageChange = (value: string) => {
    setFormData(prev => ({ ...prev, stage: value as EducationStage }))
  }

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }))
  }

  const handleExperienceToggle = (exp: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.includes(exp)
        ? prev.experiences.filter(e => e !== exp)
        : [...prev.experiences, exp],
    }))
  }

  const handleNext = () => {
    if (currentStep === 'stage') {
      setCurrentStep('skills')
    } else if (currentStep === 'skills') {
      setCurrentStep('experiences')
    }
  }

  const handleBack = () => {
    if (currentStep === 'stage') {
      onBack?.()
    } else if (currentStep === 'skills') {
      setCurrentStep('stage')
    } else if (currentStep === 'experiences') {
      setCurrentStep('skills')
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const progressPercent = currentStep === 'stage' ? 33 : currentStep === 'skills' ? 66 : 100

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1 w-full bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {currentStep === 'stage'
              ? 'Step 1 of 3: Education Stage'
              : currentStep === 'skills'
                ? 'Step 2 of 3: Skills'
                : 'Step 3 of 3: Experience'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Your Early Resume Signals</CardTitle>
            <CardDescription>
              Help us understand where you are in your journey in {major}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Stage Selection */}
            {currentStep === 'stage' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Current Stage</Label>
                  <p className="text-sm text-muted-foreground">
                    Select the stage that best describes your situation
                  </p>
                </div>

                <RadioGroup value={formData.stage} onValueChange={handleStageChange}>
                  <div className="space-y-3">
                    {EDUCATION_STAGES.map(stage => (
                      <div key={stage.value} className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent cursor-pointer transition-colors">
                        <RadioGroupItem value={stage.value} id={stage.value} />
                        <Label htmlFor={stage.value} className="cursor-pointer flex-1 font-normal">
                          {stage.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Skills Selection */}
            {currentStep === 'skills' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Skills You're Learning</Label>
                  <p className="text-sm text-muted-foreground">
                    Select the skills you're currently developing or have experience with
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {COMMON_EARLY_SKILLS.map(skill => (
                    <div
                      key={skill}
                      className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      <Checkbox
                        checked={formData.skills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                      />
                      <Label htmlFor={skill} className="cursor-pointer font-normal text-sm">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>

                {formData.skills.length > 0 && (
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground mb-2">Selected skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map(skill => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Experience Selection */}
            {currentStep === 'experiences' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Your Experiences</Label>
                  <p className="text-sm text-muted-foreground">
                    Select the types of experiences you have
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {EXPERIENCE_TYPES.map(exp => (
                    <div
                      key={exp.value}
                      className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => handleExperienceToggle(exp.value)}
                    >
                      <Checkbox
                        checked={formData.experiences.includes(exp.value)}
                        onCheckedChange={() => handleExperienceToggle(exp.value)}
                      />
                      <Label htmlFor={exp.value} className="cursor-pointer font-normal text-sm">
                        {exp.label}
                      </Label>
                    </div>
                  ))}
                </div>

                {formData.experiences.length > 0 && (
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground mb-2">Selected experiences:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.experiences.map(exp => {
                        const label =
                          EXPERIENCE_TYPES.find(e => e.value === exp)?.label || exp
                        return (
                          <Badge key={exp} variant="secondary">
                            {label}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            className="gap-2 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            {currentStep === 'stage' ? 'Change Major' : 'Back'}
          </Button>

          {currentStep === 'experiences' ? (
            <Button
              size="lg"
              onClick={handleSubmit}
              className="gap-2"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button size="lg" onClick={handleNext} className="gap-2">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}
