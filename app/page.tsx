'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MajorSelector } from '@/components/major-selector'
import { OnboardingGuide } from '@/components/onboarding-guide'

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleMajorSelect = (major: string) => {
    setIsLoading(true)
    // Store the selected major and navigate to the next step
    sessionStorage.setItem('selectedMajor', major)
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Major Selector */}
      <div className="flex items-center justify-center px-4 py-12 min-h-screen">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                CareerPath
              </h1>
              <p className="text-base text-muted-foreground">
                Discover your ideal career trajectory
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col gap-8">
            <p className="text-sm text-muted-foreground leading-relaxed">
              We'll analyze successful professionals in your field and create a personalized roadmap for your career growth.
            </p>

            <MajorSelector onSelect={handleMajorSelect} />
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Your data is private and secure. We only analyze aggregated professional profiles.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <OnboardingGuide />
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t border-border">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">📊</div>
              <h3 className="font-semibold mb-2">Skill Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Identify the top skills among successful professionals in your field
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">🗺️</div>
              <h3 className="font-semibold mb-2">Career Patterns</h3>
              <p className="text-sm text-muted-foreground">
                Understand typical career progression paths and timelines
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">🎯</div>
              <h3 className="font-semibold mb-2">Personalized Roadmap</h3>
              <p className="text-sm text-muted-foreground">
                Get actionable milestones tailored to your current level and goals
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
