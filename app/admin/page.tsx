import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';

export default function AdminDashboard() {
  const sections = [
    { name: 'Hero Section', href: '/admin/hero', description: 'Headline, subtitle, location, and stats', icon: '◆' },
    { name: 'Professional Summary', href: '/admin/summary', description: 'Bio paragraphs and pull quote', icon: '◆' },
    { name: 'Focus Areas', href: '/admin/focus-areas', description: 'Core practice pillars', icon: '◆' },
    { name: 'Featured Initiatives', href: '/admin/initiatives', description: 'Case studies and programs', icon: '◆' },
    { name: 'Experience Timeline', href: '/admin/experience', description: 'Employment history and roles', icon: '◆' },
    { name: 'Skills', href: '/admin/skills', description: 'Technical and functional skills', icon: '◆' },
    { name: 'Certifications', href: '/admin/certifications', description: 'Professional certifications', icon: '◆' },
    { name: 'Awards & Recognition', href: '/admin/awards', description: 'Awards and achievements', icon: '◆' },
    { name: 'Education', href: '/admin/education', description: 'Academic background', icon: '◆' },
    { name: 'Contact Information', href: '/admin/contact', description: 'Email and social links', icon: '◆' },
  ];

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        {/* Page Header */}
        <div className="mb-8 border-b border-rule pb-8">
          <p className="text-meta-md uppercase text-accent mb-3">Dashboard</p>
          <h1 className="text-display-md font-display text-ink mb-3">Content Management</h1>
          <p className="text-body-md text-mid max-w-2xl">Edit and manage all portfolio sections. Changes take effect immediately on the public site.</p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              className="group relative"
            >
              {/* Accent bar on left */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Card content */}
              <div className="p-6 border border-rule group-hover:border-accent transition-colors h-full">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-accent text-lg flex-shrink-0">{section.icon}</span>
                  <h2 className="text-heading-sm font-display text-ink">{section.name}</h2>
                </div>
                <p className="text-body-sm text-mid">{section.description}</p>

                {/* Hover indicator */}
                <div className="mt-4 text-accent text-body-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Edit →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="border-t border-rule pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-meta-md uppercase text-mid mb-3">Before You Start</p>
              <div className="space-y-3 text-body-sm text-mid">
                <p>• All changes save immediately to the database</p>
                <p>• Public site updates reflect new content instantly</p>
                <p>• Leave fields empty if content isn&apos;t ready yet</p>
              </div>
            </div>
            <div>
              <p className="text-meta-md uppercase text-mid mb-3">Tips</p>
              <div className="space-y-3 text-body-sm text-mid">
                <p>• Use the &quot;order&quot; field to control section sequence</p>
                <p>• Drag to reorder items within each section</p>
                <p>• Hover over cards above to see edit options</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
