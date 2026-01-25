'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { X, Plus } from 'lucide-react'

export interface ProfileData {
  name: string
  title: string
  major: string
  skills: string[]
  yearsExperience: number
  companies: string[]
  description?: string
}

interface ProfileFormProps {
  onSubmit: (profile: ProfileData) => void
  onCancel?: () => void
  initialData?: ProfileData
  isLoading?: boolean
}

export function ProfileForm({ onSubmit, onCancel, initialData, isLoading }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileData>(
    initialData || {
      name: '',
      title: '',
      major: '',
      skills: [],
      yearsExperience: 0,
      companies: [],
      description: '',
    }
  )

  const [skillInput, setSkillInput] = useState('')
  const [companyInput, setCompanyInput] = useState('')

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const handleAddCompany = () => {
    if (companyInput.trim()) {
      setFormData(prev => ({
        ...prev,
        companies: [...prev.companies, companyInput.trim()],
      }))
      setCompanyInput('')
    }
  }

  const handleRemoveCompany = (index: number) => {
    setFormData(prev => ({
      ...prev,
      companies: prev.companies.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.title && formData.major) {
      onSubmit(formData)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Professional Profile</CardTitle>
        <CardDescription>
          {initialData ? 'Edit your professional profile' : 'Add a professional profile to analyze'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Sarah Chen"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Current Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Software Engineer"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="major">Major/Field</Label>
                <Input
                  id="major"
                  placeholder="e.g., Computer Science"
                  value={formData.major}
                  onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="years">Years of Experience</Label>
                <Input
                  id="years"
                  type="number"
                  placeholder="e.g., 8"
                  value={formData.yearsExperience || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, yearsExperience: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <Label>Skills</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddSkill()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddSkill}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(idx)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Companies */}
          <div className="space-y-3">
            <Label>Companies</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a company..."
                value={companyInput}
                onChange={(e) => setCompanyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddCompany()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddCompany}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.companies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.companies.map((company, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm"
                  >
                    <span>{company}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCompany(idx)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Additional Notes (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Notable achievements, specializations, certifications, etc."
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-24"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isLoading || !formData.name || !formData.title || !formData.major}>
              {isLoading ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
