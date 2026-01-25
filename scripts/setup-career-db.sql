-- Create tables for career analysis tool

-- Professional profiles table
CREATE TABLE IF NOT EXISTS professional_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT,
  industry TEXT NOT NULL,
  years_experience INTEGER,
  education_level TEXT,
  major TEXT,
  university TEXT,
  bio TEXT,
  source TEXT,
  data_added_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Skills table (many-to-many with profiles)
CREATE TABLE IF NOT EXISTS profile_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES professional_profiles(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  proficiency_level TEXT,
  years_of_experience INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Career progression (shows typical career path)
CREATE TABLE IF NOT EXISTS career_progressions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES professional_profiles(id) ON DELETE CASCADE,
  position_number INTEGER,
  job_title TEXT NOT NULL,
  company TEXT,
  duration_years FLOAT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User profiles (for personalization)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  current_role TEXT,
  education_level TEXT,
  major TEXT,
  university TEXT,
  years_experience INTEGER,
  skills TEXT[],
  career_goals TEXT,
  interested_industries TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Generated career roadmaps
CREATE TABLE IF NOT EXISTS career_roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  target_role TEXT NOT NULL,
  target_industry TEXT,
  years_to_goal INTEGER,
  milestones JSONB,
  recommended_skills TEXT[],
  success_percentage FLOAT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_profiles_industry ON professional_profiles(industry);
CREATE INDEX IF NOT EXISTS idx_profiles_title ON professional_profiles(title);
CREATE INDEX IF NOT EXISTS idx_profile_skills_skill ON profile_skills(skill);
CREATE INDEX IF NOT EXISTS idx_progressions_profile ON career_progressions(profile_id);
CREATE INDEX IF NOT EXISTS idx_roadmaps_user ON career_roadmaps(user_profile_id);
