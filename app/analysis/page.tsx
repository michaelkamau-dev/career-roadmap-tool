'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ProfileData } from '@/components/profile-form'
import { analyzeProfiles, AnalysisResult } from '@/lib/analysis'
import { AnalysisDashboard } from '@/components/analysis-dashboard'
import { Button } from '@/components/ui/button'
import { ArrowRight, Download, RefreshCw } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function AnalysisPage() {
  const router = useRouter()
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMajor, setSelectedMajor] = useState<string>('')

  useEffect(() => {
    const major = sessionStorage.getItem('selectedMajor')
    if (!major) {
      router.push('/')
      return
    }

    setSelectedMajor(major)

    // Load profiles and perform analysis
    const profiles = localStorage.getItem('profiles')
    const userProfile = localStorage.getItem('userProfile')

    const profileList: ProfileData[] = profiles ? JSON.parse(profiles) : []
    const user: ProfileData | null = userProfile ? JSON.parse(userProfile) : null

    // If no profiles to analyze, redirect back
    if (profileList.length === 0 && !user) {
      router.push('/dashboard')
      return
    }

    // Perform analysis
    const result = analyzeProfiles(profileList, user)
    setAnalysis(result)
    setIsLoading(false)
  }, [router])

  const handleGenerateRoadmap = () => {
    router.push('/roadmap')
  }

  const handleDownloadReport = () => {
    if (!analysis) return

    const report = generateTextReport(analysis, selectedMajor)
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(report))
    element.setAttribute('download', `career-analysis-${selectedMajor.replace(/\s+/g, '-').toLowerCase()}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

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

  if (!analysis) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No analysis data available</p>
          <Button onClick={handleBackToDashboard}>Go Back to Dashboard</Button>
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
              <h1 className="text-2xl font-bold text-foreground">Career Analysis</h1>
              <p className="text-sm text-muted-foreground">{selectedMajor} Field</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDownloadReport}>
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" onClick={handleBackToDashboard}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Edit Profiles
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <AnalysisDashboard analysis={analysis} />

        {/* Action Footer */}
        <div className="mt-12 pt-8 border-t border-border flex justify-center">
          <Button
            size="lg"
            onClick={handleGenerateRoadmap}
            className="gap-2"
          >
            Generate Your Personalized Roadmap
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </main>
  )
}

function generateTextReport(analysis: AnalysisResult, major: string): string {
  let report = `CAREER ANALYSIS REPORT\n`
  report += `Field: ${major}\n`
  report += `Generated: ${new Date().toLocaleDateString()}\n`
  report += `${'='.repeat(60)}\n\n`

  report += `OVERVIEW\n`
  report += `-${'='.repeat(58)}\n`
  report += `Total Professionals Analyzed: ${analysis.totalProfiles}\n`
  report += `Average Years of Experience: ${analysis.averageExperience}\n`
  report += `Total Unique Skills Identified: ${analysis.skillAnalysis.length}\n\n`

  report += `TOP SKILLS\n`
  report += `-${'='.repeat(58)}\n`
  analysis.skillAnalysis.slice(0, 10).forEach((skill, idx) => {
    report += `${idx + 1}. ${skill.skill} (${skill.percentage}% - ${skill.frequency} professionals)\n`
  })
  report += '\n'

  if (analysis.companyAnalysis.length > 0) {
    report += `LEADING COMPANIES\n`
    report += `-${'='.repeat(58)}\n`
    analysis.companyAnalysis.slice(0, 8).forEach((company, idx) => {
      report += `${idx + 1}. ${company.company} (${company.percentage}%)\n`
    })
    report += '\n'
  }

  report += `CAREER PROGRESSION PATTERNS\n`
  report += `-${'='.repeat(58)}\n`
  analysis.careerPatterns.forEach((pattern) => {
    report += `\n${pattern.stage}\n`
    report += `Common Titles: ${pattern.commonTitles.join(', ')}\n`
    report += `Top Skills: ${pattern.typicalSkills.slice(0, 3).map(s => s.skill).join(', ')}\n`
  })
  report += '\n'

  report += `RECOMMENDATIONS\n`
  report += `-${'='.repeat(58)}\n`
  analysis.recommendations.forEach((rec, idx) => {
    report += `${idx + 1}. ${rec}\n`
  })

  if (analysis.userGap) {
    report += '\n\nYOUR CAREER GAP ANALYSIS\n'
    report += `-${'='.repeat(58)}\n`
    if (analysis.userGap.missingSkills.length > 0) {
      report += `Skills to Develop: ${analysis.userGap.missingSkills.join(', ')}\n`
    }
    if (analysis.userGap.skillsAhead.length > 0) {
      report += `Your Unique Skills: ${analysis.userGap.skillsAhead.join(', ')}\n`
    }
    report += `Experience Gap: ${analysis.userGap.experienceGap} years\n`
  }

  return report
}
