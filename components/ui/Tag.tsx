interface TagProps {
  label: string;
  variant?: 'rule' | 'accent';
  className?: string;
}

export default function Tag({ label, variant = 'rule', className = '' }: TagProps) {
  const baseClasses = 'inline-block px-3 py-1 border text-body-sm';
  const variantClasses =
    variant === 'accent'
      ? 'border-accent text-accent'
      : 'border-rule text-ink';

  return (
    <span
      className={`${baseClasses} ${variantClasses} ${className}`}
      data-testid="tag"
    >
      {label}
    </span>
  );
}
