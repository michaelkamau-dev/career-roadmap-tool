'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EarlyPatterns } from '@/lib/early-patterns'

interface EarlyPatternsSnapshotProps {
  patterns: EarlyPatterns
  major: string
}

export function EarlyPatternsSnapshot({ patterns, major }: EarlyPatternsSnapshotProps) {
  const hasData = patterns.commonSkills.length > 0 || patterns.commonRoles.length > 0

  if (!hasData) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Early Resume Patterns</h1>
          <p className="text-muted-foreground mt-2">
            Observations from early-stage professionals in {major}
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              No early-stage professionals found. Add profiles with 0-3 years of experience to see patterns.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Early Resume Patterns</h1>
        <p className="text-muted-foreground mt-2">
          Observations from early-stage professionals in {major}
        </p>
      </div>

      {/* Common Early Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Common Early Skills</CardTitle>
          <CardDescription>Skills appearing on early-career resumes (0-3 years)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {patterns.commonSkills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-sm px-3 py-1.5 font-medium"
              >
                <span>{skill.skill}</span>
                <span className="ml-2 text-xs opacity-70">
                  {skill.percentage}%
                </span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Early Internships or Roles Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Common Early Roles</CardTitle>
          <CardDescription>Job titles and positions held early in the career</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {patterns.commonRoles.map((role, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50"
              >
                <span className="font-medium text-sm text-foreground">{role.role}</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {role.percentage}% ({role.count})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Early Projects or Experiences Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Common Early Experiences</CardTitle>
          <CardDescription>Companies, projects, and activities appearing on early resumes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {patterns.commonExperiences.map((exp, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-sm px-3 py-1.5"
              >
                <span className="capitalize">{exp.experience}</span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {exp.category}
                </span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
