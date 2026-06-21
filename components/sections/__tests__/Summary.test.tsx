import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Summary from '../Summary';
import type { SummaryContent } from '@/lib/types';

describe('Summary Component', () => {
  const mockSummaryData: SummaryContent = {
    paragraphs: [
      'Senior technical leader with 20+ years driving transformational technology initiatives.',
      'Expertise spans AI/GenAI platform engineering, program governance, and enterprise delivery.',
    ],
    pullQuote: 'Turning complex programs into business outcomes.',
  };

  it('should render multiple paragraphs', () => {
    render(<Summary data={mockSummaryData} />);
    expect(screen.getByText(/Senior technical leader/)).toBeInTheDocument();
    expect(screen.getByText(/Expertise spans/)).toBeInTheDocument();
  });

  it('should render pull-quote when provided', () => {
    render(<Summary data={mockSummaryData} />);
    expect(screen.getByText(/Turning complex programs/)).toBeInTheDocument();
  });

  it('should render without pull-quote when not provided', () => {
    const noPullQuote: SummaryContent = {
      paragraphs: ['Single paragraph summary.'],
    };
    const { container } = render(<Summary data={noPullQuote} />);
    expect(container).toBeInTheDocument();
  });

  it('should render section with proper structure', () => {
    const { container } = render(<Summary data={mockSummaryData} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('should render empty state without crashing', () => {
    const emptyData: SummaryContent = {
      paragraphs: [],
    };
    const { container } = render(<Summary data={emptyData} />);
    expect(container).toBeInTheDocument();
  });

  it('should apply correct typography classes to paragraphs', () => {
    const { container } = render(<Summary data={mockSummaryData} />);
    const paragraphs = container.querySelectorAll('p.text-body-md');
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it('should render pull-quote with serif font styling', () => {
    const { container } = render(<Summary data={mockSummaryData} />);
    const pullQuote = container.querySelector('.italic');
    expect(pullQuote).toBeInTheDocument();
  });
});
