import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import type { ContactInfo } from '@/lib/types';

describe('Footer Component', () => {
  const mockContact: ContactInfo = {
    email: 'contact@example.com',
    linkedIn: 'https://linkedin.com/in/johndoe',
  };

  it('should render email link', () => {
    render(<Footer data={mockContact} />);
    const emailLink = screen.getByText('contact@example.com');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:contact@example.com');
  });

  it('should render LinkedIn link', () => {
    render(<Footer data={mockContact} />);
    const linkedinLink = screen.getByText('LinkedIn');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink.closest('a')).toHaveAttribute('href', 'https://linkedin.com/in/johndoe');
  });

  it('should render copyright text', () => {
    render(<Footer data={mockContact} />);
    expect(screen.getByText(/© 2026/)).toBeInTheDocument();
  });

  it('should have dark background', () => {
    const { container } = render(<Footer data={mockContact} />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-dark');
  });

  it('should have text-paper color for text', () => {
    const { container } = render(<Footer data={mockContact} />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('text-paper');
  });

  it('should render with proper section structure', () => {
    const { container } = render(<Footer data={mockContact} />);
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });
});
