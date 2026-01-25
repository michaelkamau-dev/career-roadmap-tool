'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

export function OnboardingGuide() {
  const steps = [
    {
      number: 1,
      title: 'Select Your Field',
      description: 'Choose the major or career field you\'re interested in',
    },
    {
      number: 2,
      title: 'Add Professional Profiles',
      description: 'Input profiles of successful professionals you want to learn from (manually or use sample data)',
    },
    {
      number: 3,
      title: 'Enter Your Profile',
      description: 'Share your current background and aspirations so we can personalize insights',
    },
    {
      number: 4,
      title: 'View Career Analysis',
      description: 'See patterns in skills, companies, and experience among successful professionals',
    },
    {
      number: 5,
      title: 'Get Your Roadmap',
      description: 'Receive a personalized career roadmap with milestones, skills, and actionable steps',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>How CareerPath Works</CardTitle>
        <CardDescription>A simple 5-step process to build your career strategy</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground text-sm">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
