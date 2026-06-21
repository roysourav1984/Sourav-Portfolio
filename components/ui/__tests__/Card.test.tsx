import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Card from '../Card';

describe('Card component', () => {
  it('should render children content', () => {
    const { getByText } = render(
      <Card>
        <div>Card content</div>
      </Card>
    );
    expect(getByText('Card content')).toBeInTheDocument();
  });

  it('should render empty state without crashing', () => {
    const { container } = render(<Card />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should apply correct base classes', () => {
    const { container } = render(
      <Card>
        <p>Test</p>
      </Card>
    );
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('border');
    expect(div.className).toContain('bg-paper');
  });

  it('should accept custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <p>Test</p>
      </Card>
    );
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('custom-class');
  });

  it('should render with border-rule color', () => {
    const { container } = render(
      <Card>
        <div>Content</div>
      </Card>
    );
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('border-rule');
  });
});
