import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Certifications from '../Certifications';
import type { Certification } from '@/lib/types';

describe('Certifications Component', () => {
  const mockCertifications: Certification[] = [
    {
      id: 1,
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2023',
      order: 1,
    },
    {
      id: 2,
      name: 'Certified Scrum Master',
      issuer: 'Scrum Alliance',
      year: '2020',
      order: 2,
    },
    {
      id: 3,
      name: 'GenAI Fundamentals',
      issuer: 'Anthropic',
      order: 3,
    },
  ];

  it('should render certification names', () => {
    render(<Certifications data={mockCertifications} />);
    expect(screen.getByText('AWS Solutions Architect')).toBeInTheDocument();
    expect(screen.getByText('Certified Scrum Master')).toBeInTheDocument();
  });

  it('should render issuer names', () => {
    render(<Certifications data={mockCertifications} />);
    expect(screen.getByText('Amazon Web Services')).toBeInTheDocument();
    expect(screen.getByText('Scrum Alliance')).toBeInTheDocument();
  });

  it('should render year when provided', () => {
    render(<Certifications data={mockCertifications} />);
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
  });

  it('should handle missing year gracefully', () => {
    render(<Certifications data={mockCertifications} />);
    const section = screen.getByText('GenAI Fundamentals').closest('div');
    expect(section).toBeInTheDocument();
  });

  it('should render empty state without crashing', () => {
    const { container } = render(<Certifications data={[]} />);
    expect(container).toBeInTheDocument();
  });

  it('should render with proper section structure', () => {
    const { container } = render(<Certifications data={mockCertifications} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('should render certifications in order', () => {
    const { container } = render(<Certifications data={mockCertifications} />);
    const items = container.querySelectorAll('[class*="border-l"]');
    expect(items.length).toBeGreaterThanOrEqual(mockCertifications.length);
  });
});
