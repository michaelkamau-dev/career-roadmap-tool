'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { EarlyPatternsSnapshot } from '@/components/early-patterns-snapshot'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProfileData } from '@/components/profile-form'
import { extractEarlyPatterns, type EarlyPatterns } from '@/lib/early-patterns'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function PatternsPage() {
  const router = useRouter()
  const [profiles, setProfiles] = useState<ProfileData[]>([])
  const [selectedMajor, setSelectedMajor] = useState<string>('')
  const [patterns, setPatterns] = useState<EarlyPatterns>({
    commonSkills: [],
    commonRoles: [],
    commonExperiences: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load profiles and major from localStorage
    const savedProfiles = localStorage.getItem('profiles')
    const savedMajor = localStorage.getItem('selectedMajor')

    if (!savedProfiles || !savedMajor) {
      router.push('/')
      return
    }

    try {
      const parsedProfiles: ProfileData[] = JSON.parse(savedProfiles)
      setProfiles(parsedProfiles)
      setSelectedMajor(savedMajor)

      // Extract early patterns
      const extractedPatterns = extractEarlyPatterns(parsedProfiles)
      setPatterns(extractedPatterns)
    } catch (error) {
      console.error('Error loading data:', error)
      router.push('/')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="h-12 bg-muted rounded animate-pulse" />
            <div className="h-64 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="text-sm text-muted-foreground">
            Step 2: Early Resume Patterns
          </div>
        </div>

        {/* Patterns Display */}
        <EarlyPatternsSnapshot patterns={patterns} major={selectedMajor} />

        {/* Action Footer */}
        <div className="flex justify-between items-center pt-8 border-t border-border gap-4 flex-wrap">
          <div className="text-sm text-muted-foreground">
            Based on {profiles.length} professional profile{profiles.length !== 1 ? 's' : ''}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push('/insight')}
            >
              See Key Insight
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              onClick={() => router.push('/analysis')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              View Full Analysis
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
