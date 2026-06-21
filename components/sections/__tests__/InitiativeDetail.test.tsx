import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import InitiativeDetail from '../InitiativeDetail';
import type { Initiative } from '@/lib/types';

const mockInitiative: Initiative = {
  id: 1,
  slug: 'ai-platform-migration',
  title: 'AI Platform Migration',
  oneLiner: 'Successfully migrated legacy systems to AI-driven platform',
  year: '2024',
  tags: ['cloud', 'AI/ML'],
  context: 'Legacy systems were outdated and inefficient',
  approach: 'Phased migration with stakeholder alignment',
  technologies: ['AWS', 'Python', 'LangChain'],
  outcome: 'Reduced costs by 40% and improved delivery time by 6 months',
  order: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('InitiativeDetail', () => {
  it('should render title', () => {
    render(<InitiativeDetail initiative={mockInitiative} />);
    expect(screen.getByText('AI Platform Migration')).toBeInTheDocument();
  });

  it('should render meta row with year and tags', () => {
    render(<InitiativeDetail initiative={mockInitiative} />);
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('cloud')).toBeInTheDocument();
    expect(screen.getByText('AI/ML')).toBeInTheDocument();
  });

  it('should render context section', () => {
    render(<InitiativeDetail initiative={mockInitiative} />);
    expect(screen.getByText('Context')).toBeInTheDocument();
    expect(screen.getByText('Legacy systems were outdated and inefficient')).toBeInTheDocument();
  });

  it('should render approach section', () => {
    render(<InitiativeDetail initiative={mockInitiative} />);
    expect(screen.getByText('Approach')).toBeInTheDocument();
    expect(screen.getByText('Phased migration with stakeholder alignment')).toBeInTheDocument();
  });

  it('should render technologies section with all technologies', () => {
    render(<InitiativeDetail initiative={mockInitiative} />);
    expect(screen.getByText('Technologies & Tools')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('LangChain')).toBeInTheDocument();
  });

  it('should render outcome section', () => {
    render(<InitiativeDetail initiative={mockInitiative} />);
    expect(screen.getByText('Outcome')).toBeInTheDocument();
    expect(screen.getByText('Reduced costs by 40% and improved delivery time by 6 months')).toBeInTheDocument();
  });

  it('should render back link', () => {
    render(<InitiativeDetail initiative={mockInitiative} />);
    const backLink = screen.getByText('← Back to Portfolio');
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/');
  });
});
