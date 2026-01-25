import { ProfileData } from '@/components/profile-form'

export interface SkillAnalysis {
  skill: string
  frequency: number
  percentage: number
  professionalsWithSkill: string[]
}

export interface CompanyAnalysis {
  company: string
  frequency: number
  percentage: number
}

export interface CareerPattern {
  stage: string
  commonTitles: string[]
  averageYearsInStage: number
  typicalSkills: SkillAnalysis[]
}

export interface AnalysisResult {
  totalProfiles: number
  averageExperience: number
  skillAnalysis: SkillAnalysis[]
  companyAnalysis: CompanyAnalysis[]
  commonMajors: string[]
  careerPatterns: CareerPattern[]
  recommendations: string[]
  userGap: {
    missingSkills: string[]
    skillsAhead: string[]
    experienceGap: number
  } | null
}

export function analyzeProfiles(profiles: ProfileData[], userProfile?: ProfileData | null): AnalysisResult {
  if (profiles.length === 0) {
    return getEmptyAnalysis()
  }

  // Skill Analysis
  const skillMap = new Map<string, { count: number; names: string[] }>()
  profiles.forEach(profile => {
    profile.skills.forEach(skill => {
      const current = skillMap.get(skill) || { count: 0, names: [] }
      skillMap.set(skill, {
        count: current.count + 1,
        names: [...current.names, profile.name],
      })
    })
  })

  const skillAnalysis: SkillAnalysis[] = Array.from(skillMap.entries())
    .map(([skill, data]) => ({
      skill,
      frequency: data.count,
      percentage: Math.round((data.count / profiles.length) * 100),
      professionalsWithSkill: data.names,
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 15) // Top 15 skills

  // Company Analysis
  const companyMap = new Map<string, number>()
  profiles.forEach(profile => {
    profile.companies.forEach(company => {
      companyMap.set(company, (companyMap.get(company) || 0) + 1)
    })
  })

  const companyAnalysis: CompanyAnalysis[] = Array.from(companyMap.entries())
    .map(([company, count]) => ({
      company,
      frequency: count,
      percentage: Math.round((count / profiles.length) * 100),
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 10) // Top 10 companies

  // Common Majors
  const majorMap = new Map<string, number>()
  profiles.forEach(profile => {
    majorMap.set(profile.major, (majorMap.get(profile.major) || 0) + 1)
  })
  const commonMajors = Array.from(majorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([major]) => major)

  // Career Patterns
  const sortedByExperience = [...profiles].sort((a, b) => a.yearsExperience - b.yearsExperience)
  const careerPatterns = generateCareerPatterns(sortedByExperience)

  // Average Experience
  const averageExperience = Math.round(
    profiles.reduce((sum, p) => sum + p.yearsExperience, 0) / profiles.length
  )

  // Generate Recommendations
  const recommendations = generateRecommendations(skillAnalysis, companyAnalysis, averageExperience)

  // User Gap Analysis
  let userGap = null
  if (userProfile) {
    userGap = analyzeUserGap(userProfile, skillAnalysis, averageExperience)
  }

  return {
    totalProfiles: profiles.length,
    averageExperience,
    skillAnalysis,
    companyAnalysis,
    commonMajors,
    careerPatterns,
    recommendations,
    userGap,
  }
}

function generateCareerPatterns(sortedProfiles: ProfileData[]): CareerPattern[] {
  if (sortedProfiles.length === 0) return []

  // Group profiles by experience level
  const juniorProfiles = sortedProfiles.filter(p => p.yearsExperience <= 3)
  const midProfiles = sortedProfiles.filter(p => p.yearsExperience > 3 && p.yearsExperience <= 8)
  const seniorProfiles = sortedProfiles.filter(p => p.yearsExperience > 8)

  const patterns: CareerPattern[] = []

  if (juniorProfiles.length > 0) {
    patterns.push({
      stage: 'Entry-Level (0-3 years)',
      commonTitles: getCommonTitles(juniorProfiles),
      averageYearsInStage: 2,
      typicalSkills: getTopSkills(juniorProfiles, 8),
    })
  }

  if (midProfiles.length > 0) {
    patterns.push({
      stage: 'Mid-Level (4-8 years)',
      commonTitles: getCommonTitles(midProfiles),
      averageYearsInStage: 5,
      typicalSkills: getTopSkills(midProfiles, 8),
    })
  }

  if (seniorProfiles.length > 0) {
    patterns.push({
      stage: 'Senior+ (8+ years)',
      commonTitles: getCommonTitles(seniorProfiles),
      averageYearsInStage: Math.round(
        seniorProfiles.reduce((sum, p) => sum + p.yearsExperience, 0) / seniorProfiles.length
      ),
      typicalSkills: getTopSkills(seniorProfiles, 8),
    })
  }

  return patterns
}

function getCommonTitles(profiles: ProfileData[]): string[] {
  const titleMap = new Map<string, number>()
  profiles.forEach(p => {
    titleMap.set(p.title, (titleMap.get(p.title) || 0) + 1)
  })
  return Array.from(titleMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([title]) => title)
}

function getTopSkills(profiles: ProfileData[], limit: number): SkillAnalysis[] {
  const skillMap = new Map<string, { count: number; names: string[] }>()
  profiles.forEach(profile => {
    profile.skills.forEach(skill => {
      const current = skillMap.get(skill) || { count: 0, names: [] }
      skillMap.set(skill, {
        count: current.count + 1,
        names: [...current.names, profile.name],
      })
    })
  })

  return Array.from(skillMap.entries())
    .map(([skill, data]) => ({
      skill,
      frequency: data.count,
      percentage: Math.round((data.count / profiles.length) * 100),
      professionalsWithSkill: data.names,
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, limit)
}

function generateRecommendations(
  skills: SkillAnalysis[],
  companies: CompanyAnalysis[],
  avgExperience: number
): string[] {
  const recommendations: string[] = []

  // Top skills recommendation
  if (skills.length > 0) {
    const topSkills = skills.slice(0, 3).map(s => s.skill).join(', ')
    recommendations.push(
      `Focus on developing ${topSkills} - these are the most common skills among successful professionals in this field.`
    )
  }

  // Company recommendation
  if (companies.length > 0) {
    const topCompanies = companies.slice(0, 2).map(c => c.company).join(', ')
    recommendations.push(
      `Consider gaining experience at companies like ${topCompanies} to strengthen your career trajectory.`
    )
  }

  // Experience milestone
  if (avgExperience > 0) {
    recommendations.push(
      `Professionals in this field typically reach senior positions after ${avgExperience} years. Plan your skill development accordingly.`
    )
  }

  // General development
  recommendations.push(
    'Build a diverse skill set across both technical and soft skills - this is common among successful professionals.'
  )

  recommendations.push(
    'Seek mentorship from professionals with 5+ years of experience to accelerate your career growth.'
  )

  return recommendations
}

function analyzeUserGap(
  userProfile: ProfileData,
  skillAnalysis: SkillAnalysis[],
  avgExperience: number
): { missingSkills: string[]; skillsAhead: string[]; experienceGap: number } {
  const userSkillSet = new Set(userProfile.skills)
  const commonSkills = new Set(skillAnalysis.map(s => s.skill))

  const missingSkills = Array.from(commonSkills)
    .filter(skill => !userSkillSet.has(skill))
    .slice(0, 5)

  const skillsAhead = Array.from(userSkillSet)
    .filter(skill => !commonSkills.has(skill))
    .slice(0, 3)

  const experienceGap = avgExperience - userProfile.yearsExperience

  return {
    missingSkills,
    skillsAhead,
    experienceGap,
  }
}

function getEmptyAnalysis(): AnalysisResult {
  return {
    totalProfiles: 0,
    averageExperience: 0,
    skillAnalysis: [],
    companyAnalysis: [],
    commonMajors: [],
    careerPatterns: [],
    recommendations: [],
    userGap: null,
  }
}
