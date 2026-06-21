import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import SectionHeader from '../SectionHeader';

describe('SectionHeader component', () => {
  it('should render eyebrow text', () => {
    const { getByText } = render(<SectionHeader eyebrow="FEATURED" title="Work" />);
    expect(getByText('FEATURED')).toBeInTheDocument();
  });

  it('should render title text', () => {
    const { getByText } = render(<SectionHeader eyebrow="FEATURED" title="Initiatives" />);
    expect(getByText('Initiatives')).toBeInTheDocument();
  });

  it('should render rule separator', () => {
    const { container } = render(<SectionHeader eyebrow="EXPERIENCE" title="Career" />);
    const hr = container.querySelector('hr');
    expect(hr).toBeInTheDocument();
  });

  it('should apply correct classes to eyebrow', () => {
    const { getByText } = render(<SectionHeader eyebrow="FOCUS" title="Areas" />);
    const eyebrow = getByText('FOCUS');
    expect(eyebrow.className).toContain('text-accent');
  });

  it('should render both long-form and short-form title variants', () => {
    const { getByText } = render(
      <SectionHeader
        eyebrow="SKILLS"
        title="Technical & Functional"
        shortTitle="Skills"
      />
    );
    expect(getByText('Technical & Functional')).toBeInTheDocument();
  });
});
