import { ProfileData } from '@/components/profile-form'

export interface EarlyPatterns {
  commonSkills: { skill: string; count: number; percentage: number }[]
  commonRoles: { role: string; count: number; percentage: number }[]
  commonExperiences: { experience: string; category: string }[]
}

export function extractEarlyPatterns(profiles: ProfileData[]): EarlyPatterns {
  // Filter for early-stage professionals (0-3 years)
  const earlyCareerProfiles = profiles.filter(p => p.yearsExperience <= 3)

  if (earlyCareerProfiles.length === 0) {
    return {
      commonSkills: [],
      commonRoles: [],
      commonExperiences: [],
    }
  }

  // Extract common early skills
  const skillMap = new Map<string, number>()
  earlyCareerProfiles.forEach(profile => {
    profile.skills.forEach(skill => {
      skillMap.set(skill, (skillMap.get(skill) || 0) + 1)
    })
  })

  const commonSkills = Array.from(skillMap.entries())
    .map(([skill, count]) => ({
      skill,
      count,
      percentage: Math.round((count / earlyCareerProfiles.length) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12)

  // Extract common early roles/titles
  const roleMap = new Map<string, number>()
  earlyCareerProfiles.forEach(profile => {
    roleMap.set(profile.title, (roleMap.get(profile.title) || 0) + 1)
  })

  const commonRoles = Array.from(roleMap.entries())
    .map(([role, count]) => ({
      role,
      count,
      percentage: Math.round((count / earlyCareerProfiles.length) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Extract common early experiences (companies and descriptions)
  const experienceList: { experience: string; category: string }[] = []
  const companySet = new Set<string>()
  
  earlyCareerProfiles.forEach(profile => {
    profile.companies.forEach(company => {
      if (!companySet.has(company)) {
        experienceList.push({
          experience: company,
          category: 'Company',
        })
        companySet.add(company)
      }
    })

    // Extract key phrases from descriptions if available
    if (profile.description) {
      const keywords = extractKeywords(profile.description)
      keywords.forEach(keyword => {
        experienceList.push({
          experience: keyword,
          category: 'Project/Activity',
        })
      })
    }
  })

  // Remove duplicates and limit to top experiences
  const uniqueExperiences = Array.from(
    new Map(experienceList.map(e => [e.experience, e])).values()
  ).slice(0, 15)

  return {
    commonSkills,
    commonRoles,
    commonExperiences: uniqueExperiences,
  }
}

function extractKeywords(text: string): string[] {
  // Common keywords related to early-stage experiences
  const keywords = [
    'internship',
    'freelance',
    'startup',
    'open source',
    'hackathon',
    'personal project',
    'volunteer',
    'bootcamp',
    'teaching',
    'research',
    'leadership',
    'team',
    'collaboration',
  ]

  const found: string[] = []
  const lowerText = text.toLowerCase()

  keywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      found.push(keyword)
    }
  })

  return found
}
