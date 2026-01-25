'use client'

import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SingleInsight } from '@/lib/insight-generator'

interface SingleInsightScreenProps {
  insight: SingleInsight
  major: string
  onContinue: () => void
  onChangeMinor?: () => void
}

export function SingleInsightScreen({
  insight,
  major,
  onContinue,
  onChangeMinor,
}: SingleInsightScreenProps) {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-12">
        {/* Header - Subtle and minimal */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Pattern Insight</p>
          <p className="text-sm text-muted-foreground">{major}</p>
        </div>

        {/* Main Insight - Single, focused takeaway */}
        <div className="space-y-8">
          <div className="bg-card border border-border rounded-lg p-8 md:p-12">
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-balance">
              {insight.insight}
            </p>
          </div>
        </div>

        {/* Action Area */}
        <div className="space-y-4">
          {/* Continue Button */}
          <Button onClick={onContinue} size="lg" className="w-full gap-2">
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>

          {/* Subtle back/change option */}
          {onChangeMinor && (
            <Button
              onClick={onChangeMinor}
              variant="ghost"
              className="w-full text-muted-foreground hover:text-foreground gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Change Major
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}
