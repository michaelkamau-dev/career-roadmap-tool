'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignalsComparisonView } from '@/components/signals-comparison-view'
import { EarlyMovesGuide } from '@/components/early-moves-guide'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import { EarlyResumeSignals } from '@/lib/resume-signals'
import { ProfileData } from '@/components/profile-form'
import { compareUserSignals } from '@/lib/signal-comparison'
import { getMovesForMajor } from '@/lib/common-early-moves'

export default function ComparisonPage() {
  const router = useRouter()
  const [userSignals, setUserSignals] = useState<EarlyResumeSignals | null>(null)
  const [profiles, setProfiles] = useState<ProfileData[]>([])
  const [selectedMajor, setSelectedMajor] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedMajor = localStorage.getItem('selectedMajor')
    const storedSignals = localStorage.getItem('userSignals')
    const storedProfiles = localStorage.getItem('profiles')

    if (!storedMajor || !storedSignals || !storedProfiles) {
      router.push('/user-signals')
      return
    }

    setSelectedMajor(storedMajor)
    setUserSignals(JSON.parse(storedSignals))
    setProfiles(JSON.parse(storedProfiles))
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <main className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto py-12">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">Loading comparison...</p>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  if (!userSignals || profiles.length === 0) {
    return (
      <main className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto py-12">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">No data found. Redirecting...</p>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  const comparison = compareUserSignals(userSignals, profiles)
  const moves = getMovesForMajor(selectedMajor)

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold mb-2">Your Profile Compared</h1>
          <p className="text-muted-foreground">
            How your current signals align with early-stage patterns in {selectedMajor}
          </p>
        </div>

        {/* Comparison View */}
        <SignalsComparisonView
          commonAtStage={comparison.commonAtStage}
          oftenAppearsLater={comparison.oftenAppearsLater}
          lessCommonEarly={comparison.lessCommonEarly}
          alignedWithPattern={comparison.alignedWithPattern}
        />

        {/* Early Moves Guide */}
        <div className="mt-8">
          <EarlyMovesGuide moves={moves} />
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center pt-8 gap-4">
          <p className="text-sm text-muted-foreground">Ready to see your full analysis and roadmap?</p>
          <Button
            onClick={() => router.push('/analysis')}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            View Full Analysis
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </main>
  )
}
