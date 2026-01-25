'use client'

import { EarlyMove } from '@/lib/common-early-moves'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface EarlyMovesGuideProps {
  moves: EarlyMove[]
}

export function EarlyMovesGuide({ moves }: EarlyMovesGuideProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Common Early Resume-Building Moves</CardTitle>
        <CardDescription>What experienced peers often do in their early careers—and what each signals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {moves.map((move, index) => (
            <div key={move.title} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleExpand(index)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{move.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{move.why}</p>
                </div>
                {expandedIndex === index ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
                )}
              </button>

              {expandedIndex === index && (
                <div className="px-4 py-4 bg-muted/30 border-t border-border space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">Why it appears early</Badge>
                    </div>
                    <p className="text-sm text-foreground">{move.why}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">What signal it sends</Badge>
                    </div>
                    <p className="text-sm text-foreground">{move.signal}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">What it does not guarantee</Badge>
                    </div>
                    <p className="text-sm text-foreground">{move.doesNotGuarantee}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
