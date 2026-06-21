import Masthead from '@/components/sections/Masthead';
import Footer from '@/components/sections/Footer';
import { getInitiatives } from '@/lib/data/initiatives';
import { getContactInfo } from '@/lib/data/contact';
import InitiativesView from './InitiativesView';

export const metadata = {
  title: 'All Initiatives | Portfolio',
  description: 'Explore all featured initiatives and case studies',
};

export const revalidate = 3600;

export default async function InitiativesPage() {
  const [initiatives, contact] = await Promise.all([
    getInitiatives(),
    getContactInfo(),
  ]);

  return (
    <>
      <Masthead />
      <main>
        <section className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-16 bg-paper">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-12">
              <h1 className="text-display-lg font-display text-ink mb-2">All Initiatives</h1>
              <div className="h-1 w-16 bg-accent mb-4" />
              <p className="text-body-md text-mid max-w-2xl">
                Featured initiatives and case studies
              </p>
            </div>

            <InitiativesView items={initiatives || []} />
          </div>
        </section>
      </main>
      {contact && <Footer data={contact} />}
    </>
  );
}
