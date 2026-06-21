import Link from 'next/link';
import Masthead from '@/components/sections/Masthead';
import Footer from '@/components/sections/Footer';
import SectionHeader from '@/components/ui/SectionHeader';
import { getAwards } from '@/lib/data/awards';
import { getContactInfo } from '@/lib/data/contact';

export const metadata = {
  title: 'Awards & Recognition | Portfolio',
};

export const revalidate = 3600;

export default async function RecognitionPage() {
  const [awards, contact] = await Promise.all([
    getAwards(),
    getContactInfo(),
  ]);
  const sortedData = [...(awards || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <>
      <Masthead />

      <main className="min-h-screen bg-paper">
        <section className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-20">
          <div className="mb-12">
            <Link
              href="/"
              className="text-body-sm text-accent hover:text-accent/80 mb-8 inline-block"
            >
              ← Back to Portfolio
            </Link>
          </div>

          <SectionHeader eyebrow="RECOGNITION" title="Awards & Honors" />

          {sortedData && sortedData.length > 0 ? (
            <div className="mt-12 space-y-8">
              {sortedData.map((award) => (
                <div key={award.id} className="border-l-4 border-accent pl-6">
                  <h3 className="text-heading-sm font-display text-ink">
                    {award.title}
                  </h3>
                  <p className="text-body-sm text-mid mt-2">
                    {award.org}
                  </p>
                  {award.description && (
                    <p className="text-body-sm text-ink mt-4 leading-relaxed">
                      {award.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 text-center text-body-md text-mid italic">
              No awards defined yet
            </div>
          )}
        </section>
      </main>

      {contact && <Footer data={contact} />}
    </>
  );
}
