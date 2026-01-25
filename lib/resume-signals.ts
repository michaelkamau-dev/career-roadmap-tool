export type EducationStage = 'high-school' | 'early-college' | 'gap-year' | 'graduating'

export const EDUCATION_STAGES = [
  { value: 'high-school', label: 'High School' },
  { value: 'early-college', label: 'Early College (Year 1-2)' },
  { value: 'gap-year', label: 'Gap Year' },
  { value: 'graduating', label: 'Graduating Soon' },
] as const

export const COMMON_EARLY_SKILLS = [
  'Python',
  'JavaScript',
  'Java',
  'HTML & CSS',
  'SQL',
  'React',
  'Git & Version Control',
  'Problem Solving',
  'Data Analysis',
  'Excel',
  'Communication',
  'Time Management',
  'Teamwork',
  'Critical Thinking',
  'Agile Methodology',
  'API Development',
  'Mobile Development',
  'Cloud Platforms (AWS/GCP/Azure)',
] as const

export const EXPERIENCE_TYPES = [
  { value: 'internship', label: 'Internship' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'personal-project', label: 'Personal Project' },
  { value: 'coding-competition', label: 'Coding Competition' },
  { value: 'club-leadership', label: 'Club Leadership' },
  { value: 'open-source', label: 'Open Source Contribution' },
  { value: 'volunteer', label: 'Volunteer Work' },
  { value: 'research', label: 'Research' },
  { value: 'course-project', label: 'Course Project' },
  { value: 'freelance', label: 'Freelance Project' },
] as const

export interface EarlyResumeSignals {
  stage: EducationStage
  skills: string[]
  experiences: string[]
}
