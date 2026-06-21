'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Admin Header */}
      <header className="border-b border-rule">
        <div className="px-gutter py-6 flex justify-between items-center">
          <div>
            <h1 className="text-heading-lg font-display text-ink">Admin Panel</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2 border border-rule text-ink hover:bg-ink hover:text-paper transition-colors text-body-sm font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Admin Navigation */}
      <nav className="border-b border-rule sticky top-0 bg-paper z-50">
        <div className="px-gutter py-4">
          <ul className="flex flex-wrap gap-6 text-body-sm">
            <li>
              <Link href="/admin" className="text-ink hover:text-accent transition-colors font-medium">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/hero" className="text-mid hover:text-accent transition-colors">
                Hero
              </Link>
            </li>
            <li>
              <Link href="/admin/summary" className="text-mid hover:text-accent transition-colors">
                Summary
              </Link>
            </li>
            <li>
              <Link href="/admin/focus-areas" className="text-mid hover:text-accent transition-colors">
                Focus Areas
              </Link>
            </li>
            <li>
              <Link href="/admin/initiatives" className="text-mid hover:text-accent transition-colors">
                Initiatives
              </Link>
            </li>
            <li>
              <Link href="/admin/experience" className="text-mid hover:text-accent transition-colors">
                Experience
              </Link>
            </li>
            <li>
              <Link href="/admin/skills" className="text-mid hover:text-accent transition-colors">
                Skills
              </Link>
            </li>
            <li>
              <Link href="/admin/certifications" className="text-mid hover:text-accent transition-colors">
                Certs
              </Link>
            </li>
            <li>
              <Link href="/admin/awards" className="text-mid hover:text-accent transition-colors">
                Awards
              </Link>
            </li>
            <li>
              <Link href="/admin/education" className="text-mid hover:text-accent transition-colors">
                Education
              </Link>
            </li>
            <li>
              <Link href="/admin/contact" className="text-mid hover:text-accent transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-gutter py-12">
        {children}
      </main>
    </div>
  );
}
