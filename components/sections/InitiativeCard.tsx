import Link from 'next/link';
import Tag from '../ui/Tag';
import Card from '../ui/Card';
import type { Initiative } from '@/lib/types';

interface InitiativeCardProps {
  initiative: Initiative;
}

export default function InitiativeCard({ initiative }: InitiativeCardProps) {
  return (
    <Link href={`/work/${initiative.slug}`}>
      <Card hoverable className="cursor-pointer h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <h3 className="text-heading-md font-display text-ink flex-1">
              {initiative.title}
            </h3>
            <span className="text-body-sm text-mid ml-2 flex-shrink-0">
              {initiative.year}
            </span>
          </div>

          <p className="text-body-sm text-mid">
            {initiative.oneLiner}
          </p>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-rule">
            {initiative.tags.map((tag) => (
              <Tag key={tag} label={tag} variant="rule" />
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
