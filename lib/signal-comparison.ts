import { ProfileData } from '@/components/profile-form'
import { EarlyResumeSignals } from '@/lib/resume-signals'

export type SignalComparison = 'common' | 'later' | 'less-common'

export interface ComparedSignal {
  signal: string
  type: 'skill' | 'experience'
  comparison: SignalComparison
  frequency: number
}

export interface SignalComparisonResult {
  commonAtStage: ComparedSignal[]
  oftenAppearsLater: ComparedSignal[]
  lessCommonEarly: ComparedSignal[]
  userStrengths: string[]
  alignedWithPattern: boolean
}

export function compareUserSignals(
  userSignals: EarlyResumeSignals,
  profiles: ProfileData[]
): SignalComparisonResult {
  // Filter for early-stage professionals (0-3 years)
  const earlyProfiles = profiles.filter(p => p.yearsExperience <= 3)
  const midProfiles = profiles.filter(p => p.yearsExperience > 3 && p.yearsExperience <= 8)
  const laterProfiles = profiles.filter(p => p.yearsExperience > 8)

  if (earlyProfiles.length === 0) {
    return {
      commonAtStage: [],
      oftenAppearsLater: [],
      lessCommonEarly: [],
      userStrengths: [],
      alignedWithPattern: false,
    }
  }

  // Calculate skill frequency in each stage
  const earlySkillFreq = new Map<string, number>()
  const midSkillFreq = new Map<string, number>()
  const lateSkillFreq = new Map<string, number>()

  earlyProfiles.forEach(p => {
    p.skills.forEach(skill => {
      earlySkillFreq.set(skill, (earlySkillFreq.get(skill) || 0) + 1)
    })
  })

  midProfiles.forEach(p => {
    p.skills.forEach(skill => {
      midSkillFreq.set(skill, (midSkillFreq.get(skill) || 0) + 1)
    })
  })

  laterProfiles.forEach(p => {
    p.skills.forEach(skill => {
      lateSkillFreq.set(skill, (lateSkillFreq.get(skill) || 0) + 1)
    })
  })

  // Normalize frequencies
  const normalizeFreq = (freq: number, total: number) => (total > 0 ? Math.round((freq / total) * 100) : 0)

  // Analyze user skills
  const comparedSkills = userSignals.skills.map(skill => {
    const earlyFreq = earlySkillFreq.get(skill) || 0
    const midFreq = midSkillFreq.get(skill) || 0
    const lateFreq = lateSkillFreq.get(skill) || 0

    const earlyPercent = normalizeFreq(earlyFreq, earlyProfiles.length)
    const midPercent = normalizeFreq(midFreq, midProfiles.length)
    const latePercent = normalizeFreq(lateFreq, laterProfiles.length)

    let comparison: SignalComparison = 'less-common'
    if (earlyPercent >= 40) {
      comparison = 'common'
    } else if (midPercent > earlyPercent && midPercent >= 40) {
      comparison = 'later'
    }

    return {
      signal: skill,
      type: 'skill' as const,
      comparison,
      frequency: earlyPercent,
    }
  })

  // Calculate experience frequency
  const earlyExpFreq = new Map<string, number>()
  const midExpFreq = new Map<string, number>()
  const lateExpFreq = new Map<string, number>()

  earlyProfiles.forEach(p => {
    p.companies?.forEach(exp => {
      earlyExpFreq.set(exp, (earlyExpFreq.get(exp) || 0) + 1)
    })
  })

  midProfiles.forEach(p => {
    p.companies?.forEach(exp => {
      midExpFreq.set(exp, (midExpFreq.get(exp) || 0) + 1)
    })
  })

  laterProfiles.forEach(p => {
    p.companies?.forEach(exp => {
      lateExpFreq.set(exp, (lateExpFreq.get(exp) || 0) + 1)
    })
  })

  // Analyze user experiences (mapped to companies for now)
  const comparedExperiences = userSignals.experiences.map(exp => {
    const earlyFreq = earlyExpFreq.get(exp) || 0
    const midFreq = midExpFreq.get(exp) || 0
    const lateFreq = lateExpFreq.get(exp) || 0

    const earlyPercent = normalizeFreq(earlyFreq, earlyProfiles.length)
    const midPercent = normalizeFreq(midFreq, midProfiles.length)
    const latePercent = normalizeFreq(lateFreq, laterProfiles.length)

    let comparison: SignalComparison = 'less-common'
    if (earlyPercent >= 30) {
      comparison = 'common'
    } else if (midPercent > earlyPercent && midPercent >= 30) {
      comparison = 'later'
    }

    return {
      signal: exp,
      type: 'experience' as const,
      comparison,
      frequency: earlyPercent,
    }
  })

  const allCompared = [...comparedSkills, ...comparedExperiences]

  return {
    commonAtStage: allCompared.filter(c => c.comparison === 'common'),
    oftenAppearsLater: allCompared.filter(c => c.comparison === 'later'),
    lessCommonEarly: allCompared.filter(c => c.comparison === 'less-common'),
    userStrengths: allCompared.filter(c => c.comparison === 'common').map(c => c.signal),
    alignedWithPattern: allCompared.filter(c => c.comparison === 'common').length >= userSignals.skills.length * 0.5,
  }
}
