interface RuleProps {
  variant?: 'default' | 'accent';
  className?: string;
}

export default function Rule({ variant = 'default', className = '' }: RuleProps) {
  const baseClasses = 'border-t';
  const variantClasses = variant === 'accent' ? 'border-accent' : 'border-rule';

  return (
    <hr
      className={`${baseClasses} ${variantClasses} ${className}`}
      data-testid="rule"
    />
  );
}
