import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkillsMatrix from '../SkillsMatrix';
import type { SkillCategory, FunctionalSkill } from '@/lib/types';

describe('SkillsMatrix Component', () => {
  const mockSkillCategories: SkillCategory[] = [
    {
      id: 1,
      categoryName: 'Languages & Frameworks',
      skills: ['Python', 'TypeScript', 'Go'],
      order: 1,
    },
    {
      id: 2,
      categoryName: 'Cloud & Infrastructure',
      skills: ['AWS', 'Azure', 'GCP'],
      order: 2,
    },
  ];

  const mockFunctionalSkills: FunctionalSkill[] = [
    { id: 1, label: 'Leadership', order: 1 },
    { id: 2, label: 'Stakeholder Management', order: 2 },
    { id: 3, label: 'Risk Management', order: 3 },
  ];

  it('should render technical skills section header', () => {
    render(<SkillsMatrix categories={mockSkillCategories} functionalSkills={mockFunctionalSkills} />);
    expect(screen.getByText('TECHNICAL SKILLS')).toBeInTheDocument();
  });

  it('should render functional skills section header', () => {
    render(<SkillsMatrix categories={mockSkillCategories} functionalSkills={mockFunctionalSkills} />);
    expect(screen.getByText('FUNCTIONAL SKILLS')).toBeInTheDocument();
  });

  it('should render technical skill categories', () => {
    render(<SkillsMatrix categories={mockSkillCategories} functionalSkills={mockFunctionalSkills} />);
    expect(screen.getByText('Languages & Frameworks')).toBeInTheDocument();
    expect(screen.getByText('Cloud & Infrastructure')).toBeInTheDocument();
  });

  it('should render skills within categories', () => {
    render(<SkillsMatrix categories={mockSkillCategories} functionalSkills={mockFunctionalSkills} />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
  });

  it('should render functional skills as tags', () => {
    render(<SkillsMatrix categories={mockSkillCategories} functionalSkills={mockFunctionalSkills} />);
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.getByText('Stakeholder Management')).toBeInTheDocument();
  });

  it('should separate technical and functional skills into different regions', () => {
    const { container } = render(<SkillsMatrix categories={mockSkillCategories} functionalSkills={mockFunctionalSkills} />);
    const gridContainer = container.querySelector('.grid');
    // Responsive grid: 1 col on mobile, 2 col on tablet+
    expect(gridContainer).toHaveClass('grid-cols-1');
  });

  it('should render empty state for categories gracefully', () => {
    const { container } = render(<SkillsMatrix categories={[]} functionalSkills={mockFunctionalSkills} />);
    expect(container).toBeInTheDocument();
  });

  it('should render empty state for functional skills gracefully', () => {
    const { container } = render(<SkillsMatrix categories={mockSkillCategories} functionalSkills={[]} />);
    expect(container).toBeInTheDocument();
  });
});
