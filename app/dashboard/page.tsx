'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ProfileForm, ProfileData } from '@/components/profile-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, ArrowRight, Trash2, Edit2, Zap } from 'lucide-react'
import { getSampleProfiles } from '@/lib/sample-profiles'

export default function DashboardPage() {
  const router = useRouter()
  const [selectedMajor, setSelectedMajor] = useState<string>('')
  const [showForm, setShowForm] = useState(false)
  const [profiles, setProfiles] = useState<ProfileData[]>([])
  const [userProfile, setUserProfile] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [editingProfileIndex, setEditingProfileIndex] = useState<number | null>(null)

  useEffect(() => {
    // Get selected major from sessionStorage
    const major = sessionStorage.getItem('selectedMajor')
    if (!major) {
      router.push('/')
    } else {
      setSelectedMajor(major)
      localStorage.setItem('selectedMajor', major)
      loadProfiles()
    }
  }, [router])

  const loadProfiles = () => {
    const stored = localStorage.getItem('profiles')
    if (stored) {
      setProfiles(JSON.parse(stored))
    }
    const storedUser = localStorage.getItem('userProfile')
    if (storedUser) {
      setUserProfile(JSON.parse(storedUser))
    }
  }

  const handleProfileSubmit = (profile: ProfileData) => {
    setIsLoading(true)
    
    if (editingProfileIndex !== null) {
      // Update existing profile
      const updated = [...profiles]
      updated[editingProfileIndex] = profile
      setProfiles(updated)
      localStorage.setItem('profiles', JSON.stringify(updated))
      setEditingProfileIndex(null)
    } else {
      // Add new profile or set as user profile
      if (!userProfile) {
        setUserProfile(profile)
        localStorage.setItem('userProfile', JSON.stringify(profile))
      } else {
        const updated = [...profiles, profile]
        setProfiles(updated)
        localStorage.setItem('profiles', JSON.stringify(updated))
      }
    }
    
    setIsLoading(false)
    setShowForm(false)
  }

  const handleDeleteProfile = (index: number) => {
    const updated = profiles.filter((_, i) => i !== index)
    setProfiles(updated)
    localStorage.setItem('profiles', JSON.stringify(updated))
  }

  const handleEditProfile = (index: number) => {
    setEditingProfileIndex(index)
    setShowForm(true)
  }

  const handleAnalyze = () => {
    if (profiles.length === 0 && !userProfile) {
      alert('Please add at least one professional profile to analyze')
      return
    }
    router.push('/analysis')
  }

  const handleLoadSampleData = () => {
    const sampleProfiles = getSampleProfiles(selectedMajor)
    setProfiles(sampleProfiles)
    localStorage.setItem('profiles', JSON.stringify(sampleProfiles))
    
    // Create a sample user profile if none exists
    if (!userProfile && sampleProfiles.length > 0) {
      const sampleUser: ProfileData = {
        name: 'Your Name',
        title: 'Current Position',
        major: selectedMajor,
        yearsExperience: 2,
        skills: ['Python', 'Problem Solving'],
        companies: [],
        description: 'Edit this profile with your actual information',
      }
      setUserProfile(sampleUser)
      localStorage.setItem('userProfile', JSON.stringify(sampleUser))
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">CareerPath</h1>
              <p className="text-sm text-muted-foreground">Analyzing {selectedMajor} careers</p>
            </div>
            <Button variant="ghost" onClick={() => {
              sessionStorage.removeItem('selectedMajor')
              router.push('/')
            }}>
              Change Major
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Your Profile Section */}
          {userProfile && (
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>This will be used to personalize your career roadmap</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium">{userProfile.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Current Title</p>
                      <p className="font-medium">{userProfile.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Experience</p>
                      <p className="font-medium">{userProfile.yearsExperience} years</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Major</p>
                      <p className="font-medium">{userProfile.major}</p>
                    </div>
                  </div>
                  
                  {userProfile.skills.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditProfile(-1)}
                    className="w-full"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Your Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Professional Profiles Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Professional Profiles to Analyze</CardTitle>
                  <CardDescription>Add successful professionals in {selectedMajor}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={handleLoadSampleData}
                    disabled={profiles.length > 0}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Try Sample Data
                  </Button>
                  <Button onClick={() => {
                    setEditingProfileIndex(null)
                    setShowForm(true)
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Profile
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {showForm && (
                <div className="mb-6 pb-6 border-b border-border">
                  <ProfileForm
                    onSubmit={handleProfileSubmit}
                    onCancel={() => setShowForm(false)}
                    initialData={editingProfileIndex !== null && editingProfileIndex !== -1 ? profiles[editingProfileIndex] : undefined}
                    isLoading={isLoading}
                  />
                </div>
              )}

              {profiles.length === 0 && !showForm ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No profiles added yet</p>
                  <Button 
                    variant="outline"
                    onClick={() => setShowForm(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Profile
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {profiles.map((profile, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{profile.name}</p>
                        <p className="text-sm text-muted-foreground">{profile.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-muted px-2 py-1 rounded">{profile.yearsExperience} years</span>
                          {profile.skills.length > 0 && (
                            <span className="text-xs text-muted-foreground">{profile.skills.length} skills</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProfile(idx)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProfile(idx)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4 flex-wrap">
            {profiles.length > 0 && (
              <Button
                variant="outline"
                onClick={() => router.push('/patterns')}
                className="gap-2"
              >
                View Early Patterns
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
            <Button
              size="lg"
              onClick={handleAnalyze}
              disabled={profiles.length === 0 && !userProfile}
              className="gap-2"
            >
              Analyze & Generate Roadmap
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
