// Hero Section
export interface HeroStat {
  id?: number;
  label: string;
  value: string;
}

export interface HeroContent {
  id?: number;
  name?: string;
  headline: string;
  subtitle: string;
  location: string;
  summary?: string;
  portraitUrl?: string;
  portraitAlt?: string;
  stats?: HeroStat[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Professional Summary
export interface SummaryContent {
  id?: number;
  paragraphs: string[];
  pullQuote?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Focus Areas
export interface FocusArea {
  id?: number;
  title: string;
  description: string;
  stat?: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Initiatives (Case Studies)
export interface Initiative {
  id?: number;
  slug: string;
  title: string;
  oneLiner: string;
  year: string;
  tags: string[];
  context: string;
  approach: string;
  technologies: string[];
  outcome: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Experience Timeline
export interface ExperienceRole {
  id?: number;
  slug: string;
  org: string;
  title: string;
  startDate: string;
  endDate: string | 'Present';
  summary: string;
  responsibilities: string[];
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Skills
export interface SkillCategory {
  id?: number;
  categoryName: string;
  skills: string[];
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FunctionalSkill {
  id?: number;
  label: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Certifications
export interface Certification {
  id?: number;
  name: string;
  issuer: string;
  year?: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Awards
export interface Award {
  id?: number;
  title: string;
  org: string;
  description?: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Education
export interface EducationEntry {
  id?: number;
  institution: string;
  degree: string;
  year: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Contact Information
export interface ContactInfo {
  id?: number;
  email: string;
  linkedIn: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Admin Sessions (custom auth)
export interface AdminSession {
  id?: string;
  tokenHash: string;
  createdAt?: Date;
  expiresAt: Date;
}
