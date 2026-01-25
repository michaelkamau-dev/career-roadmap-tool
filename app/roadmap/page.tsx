'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ProfileData } from '@/components/profile-form'
import { generateCareerRoadmap } from '@/lib/roadmap-generator'
import { analyzeProfiles } from '@/lib/analysis'
import { CareerRoadmapView } from '@/components/career-roadmap-view'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function RoadmapPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMajor, setSelectedMajor] = useState<string>('')

  useEffect(() => {
    const major = sessionStorage.getItem('selectedMajor')
    if (!major) {
      router.push('/')
      return
    }

    setSelectedMajor(major)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-4 w-60" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <RoadmapContent major={selectedMajor} />
  )
}

function RoadmapContent({ major }: { major: string }) {
  const router = useRouter()
  const [roadmap, setRoadmap] = useState<any>(null)

  useEffect(() => {
    // Load profiles and generate roadmap
    const profiles = localStorage.getItem('profiles')
    const userProfile = localStorage.getItem('userProfile')

    const profileList: ProfileData[] = profiles ? JSON.parse(profiles) : []
    const user: ProfileData | null = userProfile ? JSON.parse(userProfile) : null

    if (!user) {
      router.push('/dashboard')
      return
    }

    // Perform analysis
    const analysis = analyzeProfiles(profileList, user)
    const generatedRoadmap = generateCareerRoadmap(user, analysis)
    setRoadmap(generatedRoadmap)
  }, [router])

  if (!roadmap) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Generating your personalized roadmap...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Career Roadmap</h1>
              <p className="text-sm text-muted-foreground">{major} Field</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
              >
                Start Over
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CareerRoadmapView roadmap={roadmap} />

        {/* Next Steps */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="bg-muted/50 p-6 rounded-lg border border-border">
            <h3 className="font-semibold mb-3 text-foreground">Next Steps</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-semibold min-w-6">1.</span>
                <span>Review the milestones above and identify your immediate priority (next 3 months)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-6">2.</span>
                <span>Break down action items into specific, measurable goals</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-6">3.</span>
                <span>Find mentors and peers in your field for guidance and accountability</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-6">4.</span>
                <span>Track your progress and update your profile as you gain skills and experience</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-6">5.</span>
                <span>Revisit this roadmap annually to adjust based on your evolving goals</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center mt-8">
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard')}
            >
              Update Your Profile
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/')}
            >
              Explore Another Field
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
