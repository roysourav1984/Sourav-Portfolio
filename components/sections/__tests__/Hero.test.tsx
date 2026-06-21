import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';
import type { HeroContent } from '@/lib/types';

describe('Hero Component', () => {
  const mockHeroData: HeroContent = {
    headline: 'Senior Technical Leader',
    subtitle: 'AI/GenAI Excellence & Program Delivery',
    location: 'San Francisco, CA',
    stats: [
      { label: '20+', value: 'Years Leadership' },
      { label: '50+', value: 'Direct & Indirect' },
    ],
  };

  it('should render headline on the left', () => {
    render(<Hero data={mockHeroData} />);
    expect(screen.getByText('Senior Technical Leader')).toBeInTheDocument();
  });

  it('should render subtitle', () => {
    render(<Hero data={mockHeroData} />);
    expect(screen.getByText('AI/GenAI Excellence & Program Delivery')).toBeInTheDocument();
  });

  it('should render location', () => {
    render(<Hero data={mockHeroData} />);
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
  });

  it('should render stats on the right', () => {
    render(<Hero data={mockHeroData} />);
    expect(screen.getByText('20+')).toBeInTheDocument();
    expect(screen.getByText('Years Leadership')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('Direct & Indirect')).toBeInTheDocument();
  });

  it('should handle empty stats array gracefully', () => {
    const heroNoStats: HeroContent = {
      headline: 'Senior Technical Leader',
      subtitle: 'AI/GenAI Excellence',
      location: 'San Francisco, CA',
      stats: [],
    };
    const { container } = render(<Hero data={heroNoStats} />);
    expect(container).toBeInTheDocument();
  });

  it('should render with two-column layout', () => {
    const { container } = render(<Hero data={mockHeroData} />);
    const heroSection = container.querySelector('section');
    expect(heroSection).toHaveClass('grid', 'grid-cols-12', 'gap-6');
  });

  it('should render closing rule at the bottom', () => {
    const { container } = render(<Hero data={mockHeroData} />);
    const rule = container.querySelector('hr');
    expect(rule).toBeInTheDocument();
  });

  it('should render empty state without crashing', () => {
    const emptyHero: HeroContent = {
      headline: '',
      subtitle: '',
      location: '',
      stats: [],
    };
    const { container } = render(<Hero data={emptyHero} />);
    expect(container).toBeInTheDocument();
  });
});
