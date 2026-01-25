export interface EarlyMove {
  title: string
  why: string
  signal: string
  doesNotGuarantee: string
}

export const COMMON_EARLY_MOVES: EarlyMove[] = [
  {
    title: 'Build a Personal Project',
    why: 'Personal projects appear in ~65% of early-stage profiles. They demonstrate initiative and practical skill application without requiring permission or credentials.',
    signal: 'Shows independent problem-solving, ability to finish what you start, and concrete work samples.',
    doesNotGuarantee: 'Project popularity, scale, or that the code is production-ready. Employers value the learning and effort, not perfection.',
  },
  {
    title: 'Contribute to Open Source',
    why: 'Open source contributions appear in ~40% of competitive early-stage profiles. They provide public evidence of code and collaboration.',
    signal: 'Demonstrates collaborative skills, code quality assessment, and willingness to engage with existing codebases.',
    doesNotGuarantee: 'Major contributions or leadership roles. Small contributions count and are often valued more than claimed involvement.',
  },
  {
    title: 'Complete a Hackathon',
    why: 'Hackathons appear in ~55% of early profiles from top performers. They show you can execute under constraints and learn quickly.',
    signal: 'Rapid prototyping ability, teamwork under pressure, and exposure to new technologies in real time.',
    doesNotGuarantee: 'That you won or placed highly. Participation itself demonstrates relevant initiative and time investment.',
  },
  {
    title: 'Pursue an Internship',
    why: 'Internships appear in ~70% of profiles at the 1-3 year mark. They provide structured work experience and professional context.',
    signal: 'Professional experience in a relevant domain, ability to work in teams, and practical application of theory.',
    doesNotGuarantee: 'A return offer or that you worked on major features. Even supporting roles build relevant context and networks.',
  },
  {
    title: 'Lead a Technical Club or Group',
    why: 'Club leadership appears in ~35% of early profiles. It shows initiative to create structure and teach others.',
    signal: 'Leadership and communication skills, ability to organize and sustain a group, and expertise depth.',
    doesNotGuarantee: "Club size or prestige. Starting small and maintaining focus is often more impressive than claiming large numbers.",
  },
  {
    title: 'Learn a New Technical Skill Formally',
    why: 'Completing coursework or certifications appears in ~50% of profiles. Demonstrated learning shows commitment to growth.',
    signal: 'Disciplined self-teaching, willingness to invest time in professional development, and specific skill foundation.',
    doesNotGuarantee: 'Job readiness or that you mastered the skill. The real signal is the discipline and intentionality, not the credential alone.',
  },
  {
    title: 'Solve Visible Coding Problems',
    why: 'LeetCode, competitive programming, and coding challenges appear in ~45% of early profiles. Visible proof of algorithmic thinking.',
    signal: 'Comfort with core CS concepts, ability to debug under time pressure, and problem-solving rigor.',
    doesNotGuarantee: 'Interview performance or that you practice only for interviews. The goal is deepening problem-solving ability.',
  },
  {
    title: 'Build Cross-Functional Projects',
    why: 'Projects involving design, writing, or business appear in ~25% of competitive early profiles. They differentiate from purely technical work.',
    signal: 'Broader context awareness, ability to work with non-technical stakeholders, and versatility.',
    doesNotGuarantee: 'That you excel at all disciplines. The signal is curiosity and communication across boundaries.',
  },
]

export function getMovesForMajor(major: string): EarlyMove[] {
  // Could be customized per major in the future
  return COMMON_EARLY_MOVES
}
