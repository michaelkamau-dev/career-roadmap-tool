'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { EarlyResumeForm } from '@/components/early-resume-form'
import { EarlyResumeSignals } from '@/lib/resume-signals'

export default function UserSignalsPage() {
  const router = useRouter()
  const [selectedMajor, setSelectedMajor] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get major from storage
    const major = localStorage.getItem('selectedMajor') || sessionStorage.getItem('selectedMajor')

    if (!major) {
      router.push('/')
      return
    }

    setSelectedMajor(major)
    setIsLoading(false)
  }, [router])

  const handleSubmit = (signals: EarlyResumeSignals) => {
    // Save user signals to storage
    localStorage.setItem('userSignals', JSON.stringify(signals))
    
    // Navigate to comparison page
    router.push('/comparison')
  }

  const handleBack = () => {
    router.push('/insight')
  }

  if (isLoading || !selectedMajor) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <EarlyResumeForm
      major={selectedMajor}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />
  )
}
