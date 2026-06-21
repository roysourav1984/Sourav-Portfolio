import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Tag from '../Tag';

describe('Tag component', () => {
  it('should render with label text', () => {
    const { getByText } = render(<Tag label="React" />);
    expect(getByText('React')).toBeInTheDocument();
  });

  it('should apply rule variant styling', () => {
    const { container } = render(<Tag label="TypeScript" variant="rule" />);
    const span = container.querySelector('span');
    expect(span?.className).toContain('border-rule');
  });

  it('should apply accent variant styling', () => {
    const { container } = render(<Tag label="AI/ML" variant="accent" />);
    const span = container.querySelector('span');
    expect(span?.className).toContain('border-accent');
  });

  it('should have correct text color for accent variant', () => {
    const { container } = render(<Tag label="Leadership" variant="accent" />);
    const span = container.querySelector('span');
    expect(span?.className).toContain('text-accent');
  });

  it('should render as a span by default', () => {
    const { container } = render(<Tag label="Test Tag" />);
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
  });
});
