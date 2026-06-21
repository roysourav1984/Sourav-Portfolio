import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FocusAreas from '../FocusAreas';
import type { FocusArea } from '@/lib/types';

describe('FocusAreas Component', () => {
  const mockFocusAreas: FocusArea[] = [
    {
      id: 1,
      title: 'Program Governance & Delivery',
      description: 'Leading large-scale transformational programs',
      stat: '50+ Direct & Indirect Reports',
    },
    {
      id: 2,
      title: 'AI/GenAI Platform Engineering',
      description: 'Building next-generation AI-powered solutions',
      stat: '15+ ML Models Deployed',
    },
    {
      id: 3,
      title: 'Agile & Scrum Leadership',
      description: 'Scaling agile across enterprise organizations',
    },
  ];

  it('should render all pillar cards', () => {
    render(<FocusAreas data={mockFocusAreas} />);
    expect(screen.getByText('Program Governance & Delivery')).toBeInTheDocument();
    expect(screen.getByText('AI/GenAI Platform Engineering')).toBeInTheDocument();
    expect(screen.getByText('Agile & Scrum Leadership')).toBeInTheDocument();
  });

  it('should render card descriptions', () => {
    render(<FocusAreas data={mockFocusAreas} />);
    expect(screen.getByText('Leading large-scale transformational programs')).toBeInTheDocument();
  });

  it('should render optional stat field when provided', () => {
    render(<FocusAreas data={mockFocusAreas} />);
    expect(screen.getByText('50+ Direct & Indirect Reports')).toBeInTheDocument();
    expect(screen.getByText('15+ ML Models Deployed')).toBeInTheDocument();
  });

  it('should render without stat when not provided', () => {
    render(<FocusAreas data={mockFocusAreas} />);
    const section = screen.getByText('Agile & Scrum Leadership').closest('div');
    expect(section).toBeInTheDocument();
  });

  it('should render empty state without crashing', () => {
    const { container } = render(<FocusAreas data={[]} />);
    expect(container).toBeInTheDocument();
  });

  it('should render with three-column grid layout', () => {
    const { container } = render(<FocusAreas data={mockFocusAreas} />);
    const grid = container.querySelector('.grid');
    // Responsive grid: 1 col on mobile, 2 col on tablet, 3 col on desktop
    expect(grid).toHaveClass('grid-cols-1');
  });

  it('should render Card component for each focus area', () => {
    const { container } = render(<FocusAreas data={mockFocusAreas} />);
    const cards = container.querySelectorAll('[class*="border-rule"]');
    expect(cards.length).toBeGreaterThanOrEqual(mockFocusAreas.length);
  });
});
