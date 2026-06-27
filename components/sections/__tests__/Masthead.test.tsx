import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Masthead from '../Masthead';

describe('Masthead Component', () => {
  beforeEach(() => {
    window.scrollY = 0;
  });

  it('should render name/title on the left', () => {
    render(<Masthead />);
    const nameElement = screen.getByText(/sourav roy/i);
    expect(nameElement).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Masthead />);
    expect(screen.getByText(/work/i)).toBeInTheDocument();
    expect(screen.getByText(/experience/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('should render with double hairline rule (border-bottom)', () => {
    const { container } = render(<Masthead />);
    const masthead = container.querySelector('header');
    expect(masthead).toBeInTheDocument();
    expect(masthead).toHaveClass('border-b-2', 'border-rule');
  });

  it('should have sticky positioning classes', () => {
    const { container } = render(<Masthead />);
    const masthead = container.querySelector('header');
    expect(masthead).toHaveClass('sticky', 'top-0', 'z-50', 'bg-paper');
  });

  it('should render with proper flexbox layout (name left, nav right)', () => {
    const { container } = render(<Masthead />);
    const masthead = container.querySelector('header > div');
    expect(masthead).toHaveClass('flex', 'items-center', 'justify-between');
  });

  it('should render nav links as a navigation element', () => {
    const { container } = render(<Masthead />);
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });
});
