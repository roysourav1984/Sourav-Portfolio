import { ReactNode } from 'react';

interface CardProps {
  children?: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ children, className = '', hoverable = false }: CardProps) {
  const baseClasses = 'border border-rule bg-paper p-6';
  const hoverClasses = hoverable ? 'hover:border-accent hover:bg-paper transition-colors' : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} data-testid="card">
      {children || <div className="text-mid text-body-sm">Empty</div>}
    </div>
  );
}
