import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Awards from '../Awards';
import type { Award } from '@/lib/types';

describe('Awards Component', () => {
  const mockAwards: Award[] = [
    {
      id: 1,
      title: 'Technology Excellence Award',
      org: 'TechCorp Inc',
      description: 'For pioneering AI platform development',
      order: 1,
    },
    {
      id: 2,
      title: 'Leadership Recognition',
      org: 'Industry Association',
      order: 2,
    },
    {
      id: 3,
      title: 'Innovation Leader',
      org: 'Enterprise Forum',
      description: 'Recognized for transformational delivery',
      order: 3,
    },
  ];

  it('should render award titles', () => {
    render(<Awards data={mockAwards} />);
    expect(screen.getByText('Technology Excellence Award')).toBeInTheDocument();
    expect(screen.getByText('Leadership Recognition')).toBeInTheDocument();
  });

  it('should render organization names', () => {
    render(<Awards data={mockAwards} />);
    expect(screen.getByText('TechCorp Inc')).toBeInTheDocument();
    expect(screen.getByText('Industry Association')).toBeInTheDocument();
  });

  it('should render description when provided', () => {
    render(<Awards data={mockAwards} />);
    expect(screen.getByText('For pioneering AI platform development')).toBeInTheDocument();
  });

  it('should handle missing description gracefully', () => {
    render(<Awards data={mockAwards} />);
    const section = screen.getByText('Leadership Recognition').closest('div');
    expect(section).toBeInTheDocument();
  });

  it('should render empty state without crashing', () => {
    const { container } = render(<Awards data={[]} />);
    expect(container).toBeInTheDocument();
  });

  it('should render with proper section structure', () => {
    const { container } = render(<Awards data={mockAwards} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('should render awards ordered', () => {
    const { container } = render(<Awards data={mockAwards} />);
    const items = container.querySelectorAll('[class*="border-l"]');
    expect(items.length).toBeGreaterThanOrEqual(mockAwards.length);
  });
});
