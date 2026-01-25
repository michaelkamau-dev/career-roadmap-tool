import { EarlyPatterns } from './early-patterns'
import { ProfileData } from '@/components/profile-form'

export interface SingleInsight {
  insight: string
  context: string
}

export function generateSingleInsight(
  profiles: ProfileData[],
  earlyPatterns: EarlyPatterns,
  selectedMajor: string
): SingleInsight {
  const earlyCareerProfiles = profiles.filter(p => p.yearsExperience <= 3)
  const totalProfiles = profiles.length

  // If not enough data, provide a generic insight
  if (earlyCareerProfiles.length === 0) {
    return {
      insight: `Early-career professionals in ${selectedMajor} typically start their journey by building foundational skills and gaining hands-on experience.`,
      context: 'general',
    }
  }

  // Generate different insights based on available patterns
  const insights: SingleInsight[] = []

  // Insight 1: Top skill and role pairing
  if (
    earlyPatterns.commonSkills.length > 0 &&
    earlyPatterns.commonRoles.length > 0
  ) {
    const topSkill = earlyPatterns.commonSkills[0]
    const topRole = earlyPatterns.commonRoles[0]
    const combinedPercentage = Math.min(
      100,
      Math.round((topSkill.percentage + topRole.percentage) / 2)
    )

    insights.push({
      insight: `${topSkill.percentage}% of early-career ${selectedMajor} professionals start with ${topSkill.skill} skills, often in roles like ${topRole.role}.`,
      context: 'skills-role',
    })
  }

  // Insight 2: Common pathway with multiple skills
  if (earlyPatterns.commonSkills.length >= 2) {
    const skill1 = earlyPatterns.commonSkills[0]
    const skill2 = earlyPatterns.commonSkills[1]

    insights.push({
      insight: `The most common early technical foundation combines ${skill1.skill} and ${skill2.skill}, found in ${skill1.percentage}% and ${skill2.percentage}% of early professionals respectively.`,
      context: 'skill-combination',
    })
  }

  // Insight 3: Experience progression pattern
  if (earlyPatterns.commonExperiences.length > 0) {
    const companies = earlyPatterns.commonExperiences
      .filter(e => e.category === 'Company')
      .slice(0, 2)

    if (companies.length > 0) {
      const companyList = companies.map(c => c.experience).join(' or ')
      insights.push({
        insight: `${selectedMajor} professionals typically begin their careers at companies like ${companyList}, where they build core competencies.`,
        context: 'company-pathway',
      })
    }
  }

  // Insight 4: Common early experience type
  if (earlyPatterns.commonExperiences.length > 0) {
    const activities = earlyPatterns.commonExperiences
      .filter(e => e.category === 'Project/Activity')
      .slice(0, 1)

    if (activities.length > 0) {
      insights.push({
        insight: `Early exposure to ${activities[0].experience} is a common pattern among successful ${selectedMajor} professionals, typically occurring in the first few years.`,
        context: 'activity-pattern',
      })
    }
  }

  // Insight 5: Role progression insight
  if (earlyPatterns.commonRoles.length >= 2) {
    const role1 = earlyPatterns.commonRoles[0]
    const role2 = earlyPatterns.commonRoles[1]

    insights.push({
      insight: `${selectedMajor} early careers commonly start as ${role1.role}, with many transitioning to ${role2.role} within the first 3 years.`,
      context: 'role-progression',
    })
  }

  // Return a random insight to provide variety on repeat visits
  if (insights.length > 0) {
    return insights[Math.floor(Math.random() * insights.length)]
  }

  // Fallback insight
  return {
    insight: `Building a strong foundation in ${selectedMajor} requires developing both technical skills and practical experience in the first few years.`,
    context: 'general',
  }
}
