import Link from 'next/link';

const navLinks = [
  { label: 'Work', href: '#initiatives' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#summary' },
  { label: 'Contact', href: '#contact' },
];

export default function Masthead() {
  return (
    <header className="sticky top-0 z-50 bg-paper border-b-2 border-rule">
      <div className="flex items-center justify-between px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-4 sm:py-6">
        <Link href="/" className="text-heading-sm sm:text-display-sm font-display text-ink hover:text-accent transition-colors">
          [&nbsp;Sourav Roy&nbsp;]
        </Link>
        <nav className="hidden sm:flex gap-4 sm:gap-6 md:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-body-xs sm:text-body-sm text-ink hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
