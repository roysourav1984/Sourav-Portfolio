import Link from 'next/link';
import Masthead from '@/components/sections/Masthead';
import Footer from '@/components/sections/Footer';
import SectionHeader from '@/components/ui/SectionHeader';
import { getCertifications } from '@/lib/data/certifications';
import { getContactInfo } from '@/lib/data/contact';

export const metadata = {
  title: 'Certifications | Portfolio',
};

export const revalidate = 3600;

export default async function CredentialsPage() {
  const [certifications, contact] = await Promise.all([
    getCertifications(),
    getContactInfo(),
  ]);
  const sortedData = [...(certifications || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

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

          <SectionHeader eyebrow="CREDENTIALS" title="All Certifications" />

          {sortedData && sortedData.length > 0 ? (
            <div className="mt-12 space-y-8">
              {sortedData.map((cert) => (
                <div key={cert.id} className="border-l-4 border-accent pl-6">
                  <h3 className="text-heading-sm font-display text-ink">
                    {cert.name}
                  </h3>
                  <p className="text-body-sm text-mid mt-2">
                    {cert.issuer}
                  </p>
                  {cert.year && (
                    <p className="text-body-xs text-mid mt-3 italic">
                      {cert.year}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 text-center text-body-md text-mid italic">
              No certifications defined yet
            </div>
          )}
        </section>
      </main>

      {contact && <Footer data={contact} />}
    </>
  );
}
