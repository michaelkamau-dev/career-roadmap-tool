'use client'

import { AnalysisResult } from '@/lib/analysis'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface AnalysisDashboardProps {
  analysis: AnalysisResult
}

const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1']

export function AnalysisDashboard({ analysis }: AnalysisDashboardProps) {
  return (
    <div className="grid gap-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Profiles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analysis.totalProfiles}</div>
            <p className="text-xs text-muted-foreground mt-1">Professionals analyzed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analysis.averageExperience}</div>
            <p className="text-xs text-muted-foreground mt-1">Years in field</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analysis.skillAnalysis.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Identified skills</p>
          </CardContent>
        </Card>
      </div>

      {/* Skills Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Top Skills in the Field</CardTitle>
          <CardDescription>Most common skills among professionals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.skillAnalysis.slice(0, 10).map((skill, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{skill.skill}</span>
                  <span className="text-xs text-muted-foreground">{skill.percentage}%</span>
                </div>
                <Progress value={skill.percentage} className="h-2" />
                <p className="text-xs text-muted-foreground">{skill.frequency} professionals</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Career Progression Patterns</CardTitle>
          <CardDescription>Typical progression through experience levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {analysis.careerPatterns.map((pattern, idx) => (
              <div key={idx} className="border-b border-border pb-6 last:border-0 last:pb-0">
                <h3 className="font-semibold text-sm mb-3">{pattern.stage}</h3>
                
                {/* Common Titles */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Common Titles:</p>
                  <div className="flex flex-wrap gap-2">
                    {pattern.commonTitles.map((title, i) => (
                      <Badge key={i} variant="secondary">{title}</Badge>
                    ))}
                  </div>
                </div>

                {/* Top Skills */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Key Skills:</p>
                  <div className="space-y-2">
                    {pattern.typicalSkills.slice(0, 5).map((skill, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span>{skill.skill}</span>
                        <span className="text-muted-foreground">{skill.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Companies */}
      {analysis.companyAnalysis.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Leading Companies</CardTitle>
            <CardDescription>Companies where professionals work</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.companyAnalysis.slice(0, 8).map((company, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{company.company}</span>
                    <span className="text-xs text-muted-foreground">{company.percentage}%</span>
                  </div>
                  <Progress value={company.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Gap Analysis */}
      {analysis.userGap && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle>Your Career Gap Analysis</CardTitle>
            <CardDescription>Skills to develop and advantages you have</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Missing Skills */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Skills to Develop</h4>
              {analysis.userGap.missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.userGap.missingSkills.map((skill, idx) => (
                    <Badge key={idx} variant="outline">{skill}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">You already have most key skills!</p>
              )}
            </div>

            {/* Skills Ahead */}
            {analysis.userGap.skillsAhead.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-3">Your Unique Strengths</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.userGap.skillsAhead.map((skill, idx) => (
                    <Badge key={idx} variant="default">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Gap */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Experience Gap</h4>
              {analysis.userGap.experienceGap > 0 ? (
                <p className="text-sm text-muted-foreground">
                  Average professionals in this field have approximately{' '}
                  <span className="font-semibold text-foreground">{analysis.userGap.experienceGap} more years</span> of experience.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  You have equal or more experience than the field average!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Career Development Recommendations</CardTitle>
          <CardDescription>Based on field analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {analysis.recommendations.map((rec, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="text-primary font-semibold min-w-6">{idx + 1}.</span>
                <span className="text-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
