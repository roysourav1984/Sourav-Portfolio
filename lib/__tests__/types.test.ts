import { describe, it } from 'vitest';
import { expectTypeOf } from 'vitest';
import type {
  HeroStat,
  HeroContent,
  SummaryContent,
  FocusArea,
  Initiative,
  ExperienceRole,
  SkillCategory,
  FunctionalSkill,
  Certification,
  Award,
  EducationEntry,
  ContactInfo,
  AdminSession,
} from '../types';

describe('Type Definitions', () => {
  describe('HeroStat', () => {
    it('should have label and value as required strings', () => {
      const stat: HeroStat = { label: 'Years', value: '20' };
      expectTypeOf(stat.label).toBeString();
      expectTypeOf(stat.value).toBeString();
    });

    it('should have optional id', () => {
      const stat: HeroStat = { label: 'Teams', value: '50+' };
      expectTypeOf(stat).toMatchTypeOf<{ id?: number }>();
    });
  });

  describe('HeroContent', () => {
    it('should have required headline, subtitle, location', () => {
      const content: HeroContent = {
        headline: 'Senior IT Leader',
        subtitle: 'Program Management & AI-Driven Solutions',
        location: 'San Francisco, CA',
      };
      expectTypeOf(content.headline).toBeString();
      expectTypeOf(content.subtitle).toBeString();
      expectTypeOf(content.location).toBeString();
    });

    it('should have optional stats array', () => {
      const content: HeroContent = {
        headline: 'Test',
        subtitle: 'Test',
        location: 'Test',
        stats: [{ label: 'Years', value: '20' }],
      };
      expectTypeOf(content.stats).toMatchTypeOf<HeroStat[] | undefined>();
    });

    it('should have optional timestamps', () => {
      const content: HeroContent = {
        headline: 'Test',
        subtitle: 'Test',
        location: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      expectTypeOf(content.createdAt).toMatchTypeOf<Date | undefined>();
      expectTypeOf(content.updatedAt).toMatchTypeOf<Date | undefined>();
    });
  });

  describe('SummaryContent', () => {
    it('should have required paragraphs array', () => {
      const summary: SummaryContent = {
        paragraphs: ['Paragraph 1', 'Paragraph 2'],
      };
      expectTypeOf(summary.paragraphs).toMatchTypeOf<string[]>();
    });

    it('should have optional pullQuote', () => {
      const summary: SummaryContent = {
        paragraphs: ['Test'],
        pullQuote: 'A great quote',
      };
      expectTypeOf(summary.pullQuote).toMatchTypeOf<string | undefined>();
    });
  });

  describe('FocusArea', () => {
    it('should have required title and description', () => {
      const area: FocusArea = {
        title: 'Delivery Leadership',
        description: 'Program governance and execution',
      };
      expectTypeOf(area.title).toBeString();
      expectTypeOf(area.description).toBeString();
    });

    it('should have optional stat and order', () => {
      const area: FocusArea = {
        title: 'Test',
        description: 'Test',
        stat: '15+ programs',
        order: 1,
      };
      expectTypeOf(area.stat).toMatchTypeOf<string | undefined>();
      expectTypeOf(area.order).toMatchTypeOf<number | undefined>();
    });
  });

  describe('Initiative', () => {
    it('should have required fields: slug, title, oneLiner, year, tags, context, approach, technologies, outcome', () => {
      const init: Initiative = {
        slug: 'ai-platform-delivery',
        title: 'AI Platform Delivery',
        oneLiner: 'Led enterprise GenAI adoption',
        year: '2023',
        tags: ['AI', 'Cloud'],
        context: 'Enterprise needed AI capability',
        approach: 'Vendor evaluation and integration',
        technologies: ['OpenAI', 'Azure'],
        outcome: '60% faster processing',
      };
      expectTypeOf(init.slug).toBeString();
      expectTypeOf(init.tags).toMatchTypeOf<string[]>();
      expectTypeOf(init.technologies).toMatchTypeOf<string[]>();
    });

    it('should have optional id and order', () => {
      const init: Initiative = {
        slug: 'test',
        title: 'Test',
        oneLiner: 'Test',
        year: '2023',
        tags: [],
        context: 'Test',
        approach: 'Test',
        technologies: [],
        outcome: 'Test',
        id: 1,
        order: 0,
      };
      expectTypeOf(init.id).toMatchTypeOf<number | undefined>();
      expectTypeOf(init.order).toMatchTypeOf<number | undefined>();
    });
  });

  describe('ExperienceRole', () => {
    it('should have required slug, org, title, startDate, endDate, summary, responsibilities', () => {
      const role: ExperienceRole = {
        slug: 'director-delivery',
        org: 'Tech Corp',
        title: 'Director of Delivery',
        startDate: '2020-01-01',
        endDate: 'Present',
        summary: 'Led 50+ person delivery org',
        responsibilities: ['Set strategy', 'Manage teams'],
      };
      expectTypeOf(role.slug).toBeString();
      expectTypeOf(role.responsibilities).toMatchTypeOf<string[]>();
    });

    it('should accept endDate as Present string', () => {
      const role: ExperienceRole = {
        slug: 'test',
        org: 'Test',
        title: 'Test',
        startDate: '2020',
        endDate: 'Present',
        summary: 'Test',
        responsibilities: [],
      };
      expectTypeOf(role.endDate).toMatchTypeOf<string | 'Present'>();
    });
  });

  describe('SkillCategory', () => {
    it('should have required categoryName and skills array', () => {
      const cat: SkillCategory = {
        categoryName: 'Languages & Frameworks',
        skills: ['TypeScript', 'React', 'Node.js'],
      };
      expectTypeOf(cat.categoryName).toBeString();
      expectTypeOf(cat.skills).toMatchTypeOf<string[]>();
    });

    it('should have optional order', () => {
      const cat: SkillCategory = {
        categoryName: 'Test',
        skills: [],
        order: 1,
      };
      expectTypeOf(cat.order).toMatchTypeOf<number | undefined>();
    });
  });

  describe('FunctionalSkill', () => {
    it('should have required label', () => {
      const skill: FunctionalSkill = {
        label: 'Stakeholder Management',
      };
      expectTypeOf(skill.label).toBeString();
    });

    it('should have optional id and order', () => {
      const skill: FunctionalSkill = {
        label: 'Test',
        id: 1,
        order: 0,
      };
      expectTypeOf(skill.id).toMatchTypeOf<number | undefined>();
      expectTypeOf(skill.order).toMatchTypeOf<number | undefined>();
    });
  });

  describe('Certification', () => {
    it('should have required name and issuer', () => {
      const cert: Certification = {
        name: 'Certified SAFe Agilist',
        issuer: 'Scaled Agile Inc.',
      };
      expectTypeOf(cert.name).toBeString();
      expectTypeOf(cert.issuer).toBeString();
    });

    it('should have optional year and order', () => {
      const cert: Certification = {
        name: 'Test',
        issuer: 'Test',
        year: '2023',
        order: 1,
      };
      expectTypeOf(cert.year).toMatchTypeOf<string | undefined>();
      expectTypeOf(cert.order).toMatchTypeOf<number | undefined>();
    });
  });

  describe('Award', () => {
    it('should have required title and org', () => {
      const award: Award = {
        title: 'Technology Leader of the Year',
        org: 'TechCorp',
      };
      expectTypeOf(award.title).toBeString();
      expectTypeOf(award.org).toBeString();
    });

    it('should have optional description and order', () => {
      const award: Award = {
        title: 'Test',
        org: 'Test',
        description: 'For outstanding leadership',
        order: 1,
      };
      expectTypeOf(award.description).toMatchTypeOf<string | undefined>();
      expectTypeOf(award.order).toMatchTypeOf<number | undefined>();
    });
  });

  describe('EducationEntry', () => {
    it('should have required institution, degree, year', () => {
      const edu: EducationEntry = {
        institution: 'University of California',
        degree: 'M.S. Computer Science',
        year: '2005',
      };
      expectTypeOf(edu.institution).toBeString();
      expectTypeOf(edu.degree).toBeString();
      expectTypeOf(edu.year).toBeString();
    });

    it('should have optional id and order', () => {
      const edu: EducationEntry = {
        institution: 'Test',
        degree: 'Test',
        year: '2023',
        id: 1,
        order: 0,
      };
      expectTypeOf(edu.id).toMatchTypeOf<number | undefined>();
      expectTypeOf(edu.order).toMatchTypeOf<number | undefined>();
    });
  });

  describe('ContactInfo', () => {
    it('should have required email and linkedIn', () => {
      const contact: ContactInfo = {
        email: 'test@example.com',
        linkedIn: 'https://linkedin.com/in/example',
      };
      expectTypeOf(contact.email).toBeString();
      expectTypeOf(contact.linkedIn).toBeString();
    });

    it('should have optional timestamps', () => {
      const contact: ContactInfo = {
        email: 'test@example.com',
        linkedIn: 'https://linkedin.com/in/example',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      expectTypeOf(contact.createdAt).toMatchTypeOf<Date | undefined>();
      expectTypeOf(contact.updatedAt).toMatchTypeOf<Date | undefined>();
    });
  });

  describe('AdminSession', () => {
    it('should have required tokenHash and expiresAt', () => {
      const session: AdminSession = {
        tokenHash: 'hash123',
        expiresAt: new Date(),
      };
      expectTypeOf(session.tokenHash).toBeString();
      expectTypeOf(session.expiresAt).toMatchTypeOf<Date>();
    });

    it('should have optional id and createdAt', () => {
      const session: AdminSession = {
        id: 'session123',
        tokenHash: 'hash123',
        expiresAt: new Date(),
        createdAt: new Date(),
      };
      expectTypeOf(session.id).toMatchTypeOf<string | undefined>();
      expectTypeOf(session.createdAt).toMatchTypeOf<Date | undefined>();
    });
  });
});
