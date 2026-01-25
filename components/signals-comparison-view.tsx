'use client'

import { ComparedSignal } from '@/lib/signal-comparison'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SignalsComparisonViewProps {
  commonAtStage: ComparedSignal[]
  oftenAppearsLater: ComparedSignal[]
  lessCommonEarly: ComparedSignal[]
  alignedWithPattern: boolean
}

export function SignalsComparisonView({
  commonAtStage,
  oftenAppearsLater,
  lessCommonEarly,
  alignedWithPattern,
}: SignalsComparisonViewProps) {
  const getTypeLabel = (type: string) => (type === 'skill' ? 'Skill' : 'Experience')

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Your Profile Relative to Patterns</CardTitle>
          <CardDescription>How your current signals compare to early-stage professionals</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {alignedWithPattern
              ? "Your signals align well with common early-stage patterns. You're building relevant experience."
              : 'Your profile has a unique mix. This may reflect your individual path or indicate opportunities to build aligned experience.'}
          </p>
        </CardContent>
      </Card>

      {/* Common at This Stage */}
      {commonAtStage.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Common at This Stage</CardTitle>
            <CardDescription>Signals that frequently appear in early-stage profiles ({commonAtStage.length})</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {commonAtStage.map(signal => (
                <div key={signal.signal} className="flex items-start justify-between gap-3 pb-3 border-b border-border last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{signal.signal}</span>
                      <Badge variant="secondary" className="text-xs">
                        {getTypeLabel(signal.type)}
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${signal.frequency}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 block">{signal.frequency}% of early-stage profiles</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Often Appears Later */}
      {oftenAppearsLater.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Often Appears Later</CardTitle>
            <CardDescription>Signals more common in mid-stage careers ({oftenAppearsLater.length})</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {oftenAppearsLater.map(signal => (
                <div key={signal.signal} className="flex items-start justify-between gap-3 pb-3 border-b border-border last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{signal.signal}</span>
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(signal.type)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This tends to appear as professionals gain more experience and can make bigger career decisions.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Less Common Early */}
      {lessCommonEarly.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Less Common Early</CardTitle>
            <CardDescription>Signals that rarely appear in early-stage profiles ({lessCommonEarly.length})</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lessCommonEarly.map(signal => (
                <div key={signal.signal} className="flex items-start justify-between gap-3 pb-3 border-b border-border last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{signal.signal}</span>
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(signal.type)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This is uncommon among your peer group but doesn't diminish your value or potential.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
