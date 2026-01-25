'use client'

import { CareerRoadmap, RoadmapMilestone } from '@/lib/roadmap-generator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface CareerRoadmapViewProps {
  roadmap: CareerRoadmap
}

export function CareerRoadmapView({ roadmap }: CareerRoadmapViewProps) {
  const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(
    new Set([roadmap.milestones[0]?.id])
  )

  const toggleMilestone = (id: string) => {
    const newExpanded = new Set(expandedMilestones)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedMilestones(newExpanded)
  }

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle>Your Personalized Career Roadmap</CardTitle>
          <CardDescription>Based on {roadmap.userProfile.name}'s profile and field analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Summary</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{roadmap.summary}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-primary/20">
            <div>
              <p className="text-xs text-muted-foreground">Current Phase</p>
              <p className="text-lg font-semibold">Phase {roadmap.currentPhase}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Years of Experience</p>
              <p className="text-lg font-semibold">{roadmap.userProfile.yearsExperience}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Duration</p>
              <p className="text-sm font-semibold">{roadmap.totalDuration}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones Timeline */}
      <div className="space-y-3">
        {roadmap.milestones.map((milestone, idx) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            index={idx}
            isExpanded={expandedMilestones.has(milestone.id)}
            onToggle={() => toggleMilestone(milestone.id)}
            isCurrent={roadmap.currentPhase === milestone.phase}
          />
        ))}
      </div>

      {/* Download & Export */}
      <div className="pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground mb-4">
          Save your roadmap to reference as you progress through your career.
        </p>
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => downloadRoadmap(roadmap)}
        >
          Download Roadmap as PDF
        </Button>
      </div>
    </div>
  )
}

function MilestoneCard({
  milestone,
  index,
  isExpanded,
  onToggle,
  isCurrent,
}: {
  milestone: RoadmapMilestone
  index: number
  isExpanded: boolean
  onToggle: () => void
  isCurrent: boolean
}) {
  return (
    <Card
      className={`overflow-hidden cursor-pointer transition-all ${
        isCurrent ? 'border-primary/50 bg-primary/5' : 'hover:border-border'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full"
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="mt-1">
                {isCurrent ? (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="text-left flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-base">{milestone.title}</CardTitle>
                  {isCurrent && (
                    <Badge variant="default" className="text-xs">Current</Badge>
                  )}
                </div>
                <CardDescription className="text-sm">{milestone.duration}</CardDescription>
              </div>
            </div>
            <div className="ml-2">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </div>
        </CardHeader>
      </button>

      {isExpanded && (
        <CardContent className="pt-0 space-y-4 border-t border-border">
          {/* Description */}
          <div>
            <p className="text-sm font-medium mb-1 text-foreground">Overview</p>
            <p className="text-sm text-muted-foreground">{milestone.description}</p>
          </div>

          {/* Key Skills */}
          {milestone.skills.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2 text-foreground">Key Skills to Develop</p>
              <div className="flex flex-wrap gap-2">
                {milestone.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          {milestone.actions.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2 text-foreground">Action Items</p>
              <ul className="space-y-2">
                {milestone.actions.map((action, idx) => (
                  <li key={idx} className="flex gap-2 text-sm">
                    <span className="text-primary min-w-5">•</span>
                    <span className="text-muted-foreground">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources */}
          {milestone.resources && milestone.resources.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2 text-foreground">Resources</p>
              <ul className="space-y-1">
                {milestone.resources.map((resource, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground">
                    • {resource}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Milestone */}
          <div className="bg-muted/50 p-3 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-1">Success Milestone</p>
            <p className="text-sm font-medium text-foreground">{milestone.milestone}</p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

function downloadRoadmap(roadmap: CareerRoadmap) {
  let content = `PERSONALIZED CAREER ROADMAP\n`
  content += `Generated for: ${roadmap.userProfile.name}\n`
  content += `Field: ${roadmap.userProfile.major}\n`
  content += `Current Experience: ${roadmap.userProfile.yearsExperience} years\n`
  content += `Generated: ${new Date().toLocaleDateString()}\n`
  content += `${'='.repeat(70)}\n\n`

  content += `ROADMAP SUMMARY\n`
  content += `-${'-'.repeat(68)}\n`
  content += `${roadmap.summary}\n\n`

  content += `CAREER MILESTONES\n`
  content += `-${'-'.repeat(68)}\n\n`

  roadmap.milestones.forEach((milestone, idx) => {
    content += `MILESTONE ${idx + 1}: ${milestone.title}\n`
    content += `Duration: ${milestone.duration}\n`
    content += `${'-'.repeat(70)}\n`
    content += `\nDescription:\n${milestone.description}\n\n`

    if (milestone.skills.length > 0) {
      content += `Key Skills:\n`
      milestone.skills.forEach(skill => {
        content += `  • ${skill}\n`
      })
      content += '\n'
    }

    if (milestone.actions.length > 0) {
      content += `Action Items:\n`
      milestone.actions.forEach(action => {
        content += `  • ${action}\n`
      })
      content += '\n'
    }

    if (milestone.resources && milestone.resources.length > 0) {
      content += `Resources:\n`
      milestone.resources.forEach(resource => {
        content += `  • ${resource}\n`
      })
      content += '\n'
    }

    content += `Success Milestone: ${milestone.milestone}\n`
    content += '\n' + '='.repeat(70) + '\n\n'
  })

  const element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
  )
  element.setAttribute(
    'download',
    `career-roadmap-${roadmap.userProfile.name.replace(/\s+/g, '-').toLowerCase()}.txt`
  )
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
