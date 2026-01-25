'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SingleInsightScreen } from '@/components/single-insight-screen'
import { generateSingleInsight } from '@/lib/insight-generator'
import { extractEarlyPatterns } from '@/lib/early-patterns'
import { ProfileData } from '@/components/profile-form'
import { SingleInsight } from '@/lib/insight-generator'

export default function InsightPage() {
  const router = useRouter()
  const [selectedMajor, setSelectedMajor] = useState<string>('')
  const [insight, setInsight] = useState<SingleInsight | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get major and profiles from storage
    const major = localStorage.getItem('selectedMajor') || sessionStorage.getItem('selectedMajor')
    const profilesJson = localStorage.getItem('profiles')

    if (!major || !profilesJson) {
      router.push('/')
      return
    }

    setSelectedMajor(major)

    // Parse profiles and generate insight
    try {
      const profiles: ProfileData[] = JSON.parse(profilesJson)
      const patterns = extractEarlyPatterns(profiles)
      const generatedInsight = generateSingleInsight(profiles, patterns, major)
      setInsight(generatedInsight)
    } catch (error) {
      console.error('Error generating insight:', error)
      router.push('/')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleContinue = () => {
    router.push('/user-signals')
  }

  const handleChangeMajor = () => {
    sessionStorage.removeItem('selectedMajor')
    localStorage.removeItem('selectedMajor')
    router.push('/')
  }

  if (isLoading || !insight) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading insight...</p>
        </div>
      </main>
    )
  }

  return (
    <SingleInsightScreen
      insight={insight}
      major={selectedMajor}
      onContinue={handleContinue}
      onChangeMinor={handleChangeMajor}
    />
  )
}
