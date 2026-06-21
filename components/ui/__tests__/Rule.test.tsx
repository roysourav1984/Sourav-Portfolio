import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Rule from '../Rule';

describe('Rule component', () => {
  it('should render an hr element', () => {
    const { container } = render(<Rule />);
    const hr = container.querySelector('hr');
    expect(hr).toBeInTheDocument();
  });

  it('should apply rule color classes by default', () => {
    const { container } = render(<Rule />);
    const hr = container.querySelector('hr');
    expect(hr?.className).toContain('border-rule');
  });

  it('should accept accent variant', () => {
    const { container } = render(<Rule variant="accent" />);
    const hr = container.querySelector('hr');
    expect(hr?.className).toContain('border-accent');
  });

  it('should render with correct border width', () => {
    const { container } = render(<Rule />);
    const hr = container.querySelector('hr');
    expect(hr?.className).toContain('border-t');
  });
});
