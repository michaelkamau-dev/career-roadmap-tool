import { ProfileData } from '@/components/profile-form'
import { AnalysisResult } from './analysis'

export interface RoadmapMilestone {
  id: string
  phase: number
  title: string
  duration: string
  description: string
  skills: string[]
  actions: string[]
  resources?: string[]
  milestone: string
}

export interface CareerRoadmap {
  currentPhase: number
  userProfile: ProfileData
  milestones: RoadmapMilestone[]
  totalDuration: string
  summary: string
}

export function generateCareerRoadmap(
  userProfile: ProfileData,
  analysis: AnalysisResult
): CareerRoadmap {
  const userExperience = userProfile.yearsExperience
  const fieldAverage = analysis.averageExperience
  
  // Determine current phase based on experience
  let currentPhase = 1
  if (userExperience > 3) currentPhase = 2
  if (userExperience > 8) currentPhase = 3

  // Get top skills needed
  const topSkills = analysis.skillAnalysis.slice(0, 10).map(s => s.skill)
  const userSkills = new Set(userProfile.skills)
  const missingSkills = topSkills.filter(s => !userSkills.has(s))
  
  const milestones: RoadmapMilestone[] = []

  if (userExperience <= 3) {
    // Entry-level roadmap
    milestones.push({
      id: 'phase-1-1',
      phase: 1,
      title: 'Foundation Building (Months 1-3)',
      duration: '3 months',
      description: 'Establish core competencies and key technical skills needed in the field',
      skills: missingSkills.slice(0, 4),
      actions: [
        'Complete online courses in top missing skills',
        'Build 2-3 portfolio projects demonstrating key competencies',
        'Join relevant professional communities and networks',
        'Find a mentor in the field (ideally 5+ years experience)',
        'Contribute to open-source or volunteer projects',
      ],
      resources: [
        'Coursera, Udemy, edX courses in ' + missingSkills[0],
        'GitHub portfolio for project work',
        'LinkedIn/industry networking events',
      ],
      milestone: 'Complete foundational certification or 2 portfolio projects',
    })

    milestones.push({
      id: 'phase-1-2',
      phase: 1,
      title: 'Entry-Level Positioning (Months 4-8)',
      duration: '5 months',
      description: 'Secure first role and establish professional credibility',
      skills: missingSkills.slice(0, 3),
      actions: [
        'Target entry-level positions (internships, junior roles)',
        'Tailor resume and cover letters to field requirements',
        'Prepare for technical interviews in your domain',
        'Attend industry conferences or webinars',
        'Start documenting your growth and achievements',
      ],
      resources: [
        'LeetCode/HackerRank for skill practice',
        'Interview preparation guides specific to ' + analysis.commonMajors[0],
        'Company career pages and networking contacts',
      ],
      milestone: 'Secure entry-level position or internship',
    })

    milestones.push({
      id: 'phase-1-3',
      phase: 1,
      title: 'First Role Mastery (Months 9-18)',
      duration: '10 months',
      description: 'Excel in initial position and build practical experience',
      skills: analysis.skillAnalysis.slice(0, 5).map(s => s.skill),
      actions: [
        'Master core responsibilities in first 90 days',
        'Take on increasingly complex projects',
        'Build strong relationships with team and mentors',
        'Continue skill development through work assignments',
        'Seek feedback and document achievements regularly',
      ],
      resources: [
        'Company training programs',
        'Senior team members and mentors',
        'Industry-specific certifications',
      ],
      milestone: 'Successfully complete 1 year in role with positive feedback',
    })
  }

  if (userExperience > 3 && userExperience <= 8) {
    // Mid-level roadmap
    milestones.push({
      id: 'phase-2-1',
      phase: 2,
      title: 'Specialization Development (Current - 6 months)',
      duration: '6 months',
      description: 'Deepen expertise and develop specialized skills',
      skills: analysis.careerPatterns[1]?.typicalSkills.slice(0, 5).map(s => s.skill) || [],
      actions: [
        'Identify and develop deeper expertise in 2-3 areas',
        'Lead technical initiatives or projects',
        'Mentor junior team members',
        'Attend advanced training and certifications',
        'Develop expertise that differentiates you',
      ],
      resources: [
        'Advanced certifications in your field',
        'Leadership and management courses',
        'Speaking at industry events',
      ],
      milestone: 'Become recognized as subject matter expert',
    })

    milestones.push({
      id: 'phase-2-2',
      phase: 2,
      title: 'Leadership Transition (6-12 months)',
      duration: '6 months',
      description: 'Move toward senior individual contributor or management roles',
      skills: ['Leadership', 'Project Management', 'Strategic Thinking', 'Communication'],
      actions: [
        'Lead larger initiatives and cross-functional projects',
        'Develop mentoring and coaching skills',
        'Build strategic network within and outside company',
        'Take on visible leadership responsibilities',
        'Pursue management certifications if interested',
      ],
      resources: [
        'Executive presence coaching',
        'MBA or management certification programs',
        'Leadership development workshops',
      ],
      milestone: 'Lead successful major project or earn promotion consideration',
    })

    milestones.push({
      id: 'phase-2-3',
      phase: 2,
      title: 'Senior Positioning (12+ months)',
      duration: '12+ months',
      description: 'Establish yourself in senior roles',
      skills: ['Strategic Planning', 'Business Acumen', 'Innovation', 'Executive Communication'],
      actions: [
        'Transition to senior IC or management role',
        'Influence organizational strategy',
        'Build reputation as industry thought leader',
        'Expand external network and speaking engagements',
        'Mentor multiple junior professionals',
      ],
      resources: [
        'Executive coaching',
        'Board memberships or advisory roles',
        'Conference speaking opportunities',
      ],
      milestone: 'Secure senior-level position or promotion',
    })
  }

  if (userExperience > 8) {
    // Senior/Leadership roadmap
    milestones.push({
      id: 'phase-3-1',
      phase: 3,
      title: 'Strategic Leadership (Current Phase)',
      duration: 'Ongoing',
      description: 'Shape strategy and influence at organizational level',
      skills: ['Strategic Vision', 'P&L Management', 'Organizational Leadership', 'Innovation'],
      actions: [
        'Drive strategic initiatives and transformation',
        'Build and mentor high-performing teams',
        'Expand influence beyond your function',
        'Consider board or executive advisory roles',
        'Establish yourself as industry thought leader',
      ],
      resources: [
        'Executive coaching and peer advisory groups',
        'Board service opportunities',
        'Speaking at major industry events',
      ],
      milestone: 'Drive significant strategic impact',
    })

    milestones.push({
      id: 'phase-3-2',
      phase: 3,
      title: 'Thought Leadership & Legacy',
      duration: 'Ongoing',
      description: 'Build lasting impact and mentor next generation',
      skills: ['Visionary Thinking', 'Executive Presence', 'Institutional Knowledge'],
      actions: [
        'Write and speak about industry trends',
        'Build advisory boards or councils',
        'Mentor rising leaders in your field',
        'Consider angel investing or startup advising',
        'Plan long-term career evolution or transition',
      ],
      resources: [
        'Publishing opportunities (articles, books)',
        'Speaking circuits and conferences',
        'Venture capital or angel networks',
      ],
      milestone: 'Establish lasting thought leadership',
    })

    milestones.push({
      id: 'phase-3-3',
      phase: 3,
      title: 'Next Chapter Planning',
      duration: 'Ongoing',
      description: 'Explore alternative paths while maintaining impact',
      skills: ['Entrepreneurship', 'Board Governance', 'Consulting', 'Teaching'],
      actions: [
        'Evaluate next career chapter (startup, board, teaching, etc.)',
        'Build diversified professional portfolio',
        'Develop new skills for next phase',
        'Explore board opportunities in profit/nonprofit',
        'Consider consulting or startup advisory roles',
      ],
      resources: [
        'Executive transition coaching',
        'Startup founder networks',
        'Board governance training',
      ],
      milestone: 'Clarify and plan next career evolution',
    })
  }

  return {
    currentPhase,
    userProfile,
    milestones,
    totalDuration: calculateDuration(userExperience, fieldAverage),
    summary: generateRoadmapSummary(userProfile, analysis, currentPhase, fieldAverage),
  }
}

function calculateDuration(userYears: number, fieldAverage: number): string {
  if (userYears <= 3) {
    return `18-24 months to mid-level (typical career path: ${fieldAverage} years to senior)`
  } else if (userYears <= 8) {
    return `12-24 months to senior level (${fieldAverage - userYears} years ahead)`
  } else {
    return 'Focus on strategic impact and leadership'
  }
}

function generateRoadmapSummary(
  user: ProfileData,
  analysis: AnalysisResult,
  phase: number,
  fieldAverage: number
): string {
  if (phase === 1) {
    return `Based on the analysis of ${analysis.totalProfiles} professionals in your field, ` +
      `you're at the beginning of your career journey. Your roadmap focuses on building foundational skills ` +
      `and securing your first role. Most professionals in ${analysis.commonMajors[0]} take ${fieldAverage} years ` +
      `to reach senior positions. Your first 18-24 months should focus on the top skills: ` +
      `${analysis.skillAnalysis.slice(0, 3).map(s => s.skill).join(', ')}.`
  } else if (phase === 2) {
    const yearsToSenior = fieldAverage - user.yearsExperience
    return `You're in the mid-career phase with ${user.yearsExperience} years of experience. ` +
      `Based on peer patterns, you typically need ${yearsToSenior > 0 ? yearsToSenior : 'continued'} more years ` +
      `to reach senior leadership. Your roadmap emphasizes specialization, leadership development, and ` +
      `building your unique value proposition. Focus on demonstrating mastery in ` +
      `${analysis.skillAnalysis.slice(0, 2).map(s => s.skill).join(' and ')}.`
  } else {
    return `You've reached the senior phase of your career. Your roadmap now focuses on strategic impact, ` +
      `thought leadership, and shaping the direction of your field. With ${user.yearsExperience} years of experience, ` +
      `consider expanding your influence through mentorship, board roles, or industry initiatives. ` +
      `This phase is about leveraging your expertise to create lasting impact.`
  }
}
