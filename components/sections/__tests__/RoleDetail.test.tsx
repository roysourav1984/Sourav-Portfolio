import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RoleDetail from '../RoleDetail';
import type { ExperienceRole } from '@/lib/types';

const mockRole: ExperienceRole = {
  id: 1,
  slug: 'senior-delivery-lead',
  org: 'TechCorp Inc',
  title: 'Senior Delivery Manager',
  startDate: '2021-01-15',
  endDate: 'Present',
  summary: 'Led enterprise-scale cloud transformation initiatives',
  responsibilities: [
    'Managed cross-functional teams of 50+ engineers',
    'Delivered $5M+ cost savings through platform optimization',
    'Established Agile governance across 10 product teams',
    'Led quarterly business reviews with C-suite stakeholders',
  ],
  order: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('RoleDetail', () => {
  it('should render organization and title', () => {
    render(<RoleDetail role={mockRole} />);
    expect(screen.getByText('TechCorp Inc')).toBeInTheDocument();
    expect(screen.getByText('Senior Delivery Manager')).toBeInTheDocument();
  });

  it('should render date range with Present', () => {
    render(<RoleDetail role={mockRole} />);
    expect(screen.getByText(/2021/)).toBeInTheDocument();
    expect(screen.getByText(/Present/)).toBeInTheDocument();
  });

  it('should render summary', () => {
    render(<RoleDetail role={mockRole} />);
    expect(screen.getByText('Led enterprise-scale cloud transformation initiatives')).toBeInTheDocument();
  });

  it('should render all responsibilities', () => {
    render(<RoleDetail role={mockRole} />);
    expect(screen.getByText('Managed cross-functional teams of 50+ engineers')).toBeInTheDocument();
    expect(screen.getByText('Delivered $5M+ cost savings through platform optimization')).toBeInTheDocument();
    expect(screen.getByText('Established Agile governance across 10 product teams')).toBeInTheDocument();
    expect(screen.getByText('Led quarterly business reviews with C-suite stakeholders')).toBeInTheDocument();
  });

  it('should render responsibilities section header', () => {
    render(<RoleDetail role={mockRole} />);
    expect(screen.getByText('Key Responsibilities')).toBeInTheDocument();
  });

  it('should render back link', () => {
    render(<RoleDetail role={mockRole} />);
    const backLink = screen.getByText('← Back to Portfolio');
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/');
  });
});
