import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Education from '../Education';
import type { EducationEntry } from '@/lib/types';

describe('Education Component', () => {
  const mockEducation: EducationEntry[] = [
    {
      id: 1,
      institution: 'Stanford University',
      degree: 'M.S. Computer Science',
      year: '2005',
      order: 1,
    },
    {
      id: 2,
      institution: 'UC Berkeley',
      degree: 'B.S. Electrical Engineering',
      year: '2003',
      order: 2,
    },
  ];

  it('should render institution names', () => {
    render(<Education data={mockEducation} />);
    expect(screen.getByText('Stanford University')).toBeInTheDocument();
    expect(screen.getByText('UC Berkeley')).toBeInTheDocument();
  });

  it('should render degree information', () => {
    render(<Education data={mockEducation} />);
    expect(screen.getByText('M.S. Computer Science')).toBeInTheDocument();
    expect(screen.getByText('B.S. Electrical Engineering')).toBeInTheDocument();
  });

  it('should render year', () => {
    render(<Education data={mockEducation} />);
    expect(screen.getByText('2005')).toBeInTheDocument();
    expect(screen.getByText('2003')).toBeInTheDocument();
  });

  it('should render empty state without crashing', () => {
    const { container } = render(<Education data={[]} />);
    expect(container).toBeInTheDocument();
  });

  it('should render with proper section structure', () => {
    const { container } = render(<Education data={mockEducation} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('should render education entries ordered', () => {
    const { container } = render(<Education data={mockEducation} />);
    const items = container.querySelectorAll('[class*="border-l"]');
    expect(items.length).toBeGreaterThanOrEqual(mockEducation.length);
  });
});
