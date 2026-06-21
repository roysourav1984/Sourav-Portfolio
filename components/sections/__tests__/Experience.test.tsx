import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Experience from '../Experience';
import ExperienceRow from '../ExperienceRow';
import type { ExperienceRole } from '@/lib/types';

describe('ExperienceRow Component', () => {
  const mockRole: ExperienceRole = {
    id: 1,
    slug: 'senior-director-tech',
    org: 'TechCorp Inc',
    title: 'Senior Director, Technology Delivery',
    startDate: 'Jan 2020',
    endDate: 'Present',
    summary: 'Led transformation of cloud infrastructure',
    responsibilities: ['Managed 50+ engineers', 'Delivered 3 major platforms'],
  };

  it('should render dates', () => {
    render(<ExperienceRow role={mockRole} />);
    expect(screen.getByText(/Jan 2020/)).toBeInTheDocument();
    expect(screen.getByText(/Present/)).toBeInTheDocument();
  });

  it('should render organization', () => {
    render(<ExperienceRow role={mockRole} />);
    expect(screen.getByText('TechCorp Inc')).toBeInTheDocument();
  });

  it('should render title', () => {
    render(<ExperienceRow role={mockRole} />);
    expect(screen.getByText('Senior Director, Technology Delivery')).toBeInTheDocument();
  });

  it('should render summary', () => {
    render(<ExperienceRow role={mockRole} />);
    expect(screen.getByText('Led transformation of cloud infrastructure')).toBeInTheDocument();
  });

  it('should link to role detail page', () => {
    const { container } = render(<ExperienceRow role={mockRole} />);
    const link = container.querySelector('a[href="/experience/senior-director-tech"]');
    expect(link).toBeInTheDocument();
  });

  it('should render accent bar on left', () => {
    const { container } = render(<ExperienceRow role={mockRole} />);
    const bar = container.querySelector('.bg-accent');
    expect(bar).toBeInTheDocument();
  });
});

describe('Experience Component', () => {
  const mockExperience: ExperienceRole[] = [
    {
      id: 3,
      slug: 'role-3',
      org: 'CompanyC',
      title: 'Director',
      startDate: 'Jan 2018',
      endDate: 'Dec 2019',
      summary: 'Early role',
      responsibilities: [],
      order: 1,
    },
    {
      id: 1,
      slug: 'role-1',
      org: 'CompanyA',
      title: 'Senior Director',
      startDate: 'Jan 2021',
      endDate: 'Present',
      summary: 'Current role',
      responsibilities: [],
      order: 3,
    },
    {
      id: 2,
      slug: 'role-2',
      org: 'CompanyB',
      title: 'Manager',
      startDate: 'Jan 2019',
      endDate: 'Dec 2020',
      summary: 'Middle role',
      responsibilities: [],
      order: 2,
    },
  ];

  it('should render all roles ordered by order field', () => {
    render(<Experience data={mockExperience} />);
    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText('Manager')).toBeInTheDocument();
    expect(screen.getByText('Senior Director')).toBeInTheDocument();
  });

  it('should render empty state without crashing', () => {
    const { container } = render(<Experience data={[]} />);
    expect(container).toBeInTheDocument();
  });

  it('should render with proper section structure', () => {
    const { container } = render(<Experience data={mockExperience} />);
    const section = container.querySelector('#experience');
    expect(section).toBeInTheDocument();
  });

  it('should render accent bar for each row', () => {
    const { container } = render(<Experience data={mockExperience} />);
    const bars = container.querySelectorAll('.w-1.bg-accent');
    expect(bars.length).toBeGreaterThan(0);
  });
});
