import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Initiatives from '../Initiatives';
import InitiativeCard from '../InitiativeCard';
import type { Initiative } from '@/lib/types';

describe('InitiativeCard Component', () => {
  const mockInitiative: Initiative = {
    id: 1,
    slug: 'ai-platform-migration',
    title: 'AI Platform Migration',
    oneLiner: 'Successfully migrated legacy systems to cloud',
    year: '2024',
    tags: ['Cloud', 'AI/ML'],
    context: 'Legacy systems were outdated',
    approach: 'Phased migration',
    technologies: ['AWS', 'Python'],
    outcome: 'Reduced costs by 40%',
  };

  it('should render initiative title', () => {
    render(<InitiativeCard initiative={mockInitiative} />);
    expect(screen.getByText('AI Platform Migration')).toBeInTheDocument();
  });

  it('should render oneLiner', () => {
    render(<InitiativeCard initiative={mockInitiative} />);
    expect(screen.getByText('Successfully migrated legacy systems to cloud')).toBeInTheDocument();
  });

  it('should render year', () => {
    render(<InitiativeCard initiative={mockInitiative} />);
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('should render tags', () => {
    render(<InitiativeCard initiative={mockInitiative} />);
    expect(screen.getByText('Cloud')).toBeInTheDocument();
    expect(screen.getByText('AI/ML')).toBeInTheDocument();
  });

  it('should link to initiative detail page', () => {
    const { container } = render(<InitiativeCard initiative={mockInitiative} />);
    const link = container.querySelector('a[href="/work/ai-platform-migration"]');
    expect(link).toBeInTheDocument();
  });
});

describe('Initiatives Component', () => {
  const mockInitiatives: Initiative[] = [
    {
      id: 1,
      slug: 'initiative-1',
      title: 'Initiative 1',
      oneLiner: 'First initiative',
      year: '2024',
      tags: ['Cloud'],
      context: 'Context 1',
      approach: 'Approach 1',
      technologies: ['AWS'],
      outcome: 'Outcome 1',
      order: 1,
    },
    {
      id: 2,
      slug: 'initiative-2',
      title: 'Initiative 2',
      oneLiner: 'Second initiative',
      year: '2023',
      tags: ['AI/ML'],
      context: 'Context 2',
      approach: 'Approach 2',
      technologies: ['Python'],
      outcome: 'Outcome 2',
      order: 2,
    },
    {
      id: 3,
      slug: 'initiative-3',
      title: 'Initiative 3',
      oneLiner: 'Third initiative',
      year: '2022',
      tags: ['DevOps'],
      context: 'Context 3',
      approach: 'Approach 3',
      technologies: ['Docker'],
      outcome: 'Outcome 3',
      order: 3,
    },
    {
      id: 4,
      slug: 'initiative-4',
      title: 'Initiative 4',
      oneLiner: 'Fourth initiative',
      year: '2021',
      tags: ['Leadership'],
      context: 'Context 4',
      approach: 'Approach 4',
      technologies: ['Agile'],
      outcome: 'Outcome 4',
      order: 4,
    },
  ];

  it('should render first 3 initiatives by default', () => {
    render(<Initiatives data={mockInitiatives} />);
    expect(screen.getByText('Initiative 1')).toBeInTheDocument();
    expect(screen.getByText('Initiative 2')).toBeInTheDocument();
    expect(screen.getByText('Initiative 3')).toBeInTheDocument();
  });

  it('should have view all link when more than 6 initiatives exist', () => {
    const manyInitiatives = [...mockInitiatives, ...mockInitiatives.map((_, i) => ({
      ...mockInitiatives[0],
      id: 100 + i,
      slug: `initiative-${100 + i}`,
      title: `Initiative ${100 + i}`,
      order: 100 + i,
    }))];
    render(<Initiatives data={manyInitiatives} />);
    const viewAllLink = screen.getByText(/view all initiatives/i);
    expect(viewAllLink).toBeInTheDocument();
  });

  it('should not show view all link when 6 or fewer initiatives', () => {
    render(<Initiatives data={mockInitiatives} />);
    const viewAllLink = screen.queryByText(/view all initiatives/i);
    expect(viewAllLink).not.toBeInTheDocument();
  });

  it('should render empty state without crashing', () => {
    const { container } = render(<Initiatives data={[]} />);
    expect(container).toBeInTheDocument();
  });

  it('should render section with proper ID for anchor linking', () => {
    const { container } = render(<Initiatives data={mockInitiatives} />);
    const section = container.querySelector('#initiatives');
    expect(section).toBeInTheDocument();
  });

  it('should render with three-column grid by default', () => {
    const { container } = render(<Initiatives data={mockInitiatives} />);
    const grid = container.querySelector('.grid');
    // Responsive grid: 1 col on mobile, 2 col on tablet, 3 col on desktop
    expect(grid).toHaveClass('grid-cols-1');
  });
});
