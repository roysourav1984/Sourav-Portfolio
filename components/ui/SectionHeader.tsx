import Rule from './Rule';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  shortTitle?: string;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="text-meta-md text-accent font-sans uppercase tracking-wide">
          {eyebrow}
        </span>
        <Rule variant="accent" />
      </div>
      <h2 className="text-display-md font-display font-bold text-ink">
        {title}
      </h2>
      <Rule />
    </div>
  );
}
