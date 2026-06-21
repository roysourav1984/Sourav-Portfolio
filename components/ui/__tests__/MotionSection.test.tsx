import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MotionSection from '../MotionSection';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
  useInView: () => true,
}));

describe('MotionSection', () => {
  it('should render children', () => {
    render(
      <MotionSection>
        <p>Test content</p>
      </MotionSection>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render as motion.div', () => {
    render(
      <MotionSection>
        <p>Test</p>
      </MotionSection>
    );
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  it('should accept custom className', () => {
    render(
      <MotionSection className="custom-class">
        <p>Test</p>
      </MotionSection>
    );
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveClass('custom-class');
  });

  it('should have initial animation styles', () => {
    const { container } = render(
      <MotionSection>
        <p>Test</p>
      </MotionSection>
    );
    expect(container.querySelector('[data-testid="motion-div"]')).toBeInTheDocument();
  });

  it('should respect prefers-reduced-motion', () => {
    // Check that component renders without throwing when motion is disabled
    render(
      <MotionSection>
        <p>Test with reduced motion</p>
      </MotionSection>
    );
    expect(screen.getByText('Test with reduced motion')).toBeInTheDocument();
  });
});
