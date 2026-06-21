import Masthead from '@/components/sections/Masthead';
import Footer from '@/components/sections/Footer';
import { getFocusAreas } from '@/lib/data/focusAreas';
import { getContactInfo } from '@/lib/data/contact';
import FocusAreasView from './FocusAreasView';

export const metadata = {
  title: 'Focus Areas | Portfolio',
  description: 'All focus areas and practice areas',
};

export const revalidate = 3600;

export default async function FocusAreasPage() {
  const [focusAreas, contact] = await Promise.all([
    getFocusAreas(),
    getContactInfo(),
  ]);

  return (
    <>
      <Masthead />
      <main>
        <section className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-16 bg-paper">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-12">
              <h1 className="text-display-lg font-display text-ink mb-2">Focus Areas</h1>
              <div className="h-1 w-16 bg-accent mb-4" />
              <p className="text-body-md text-mid max-w-2xl">
                Complete list of core practice areas and expertise
              </p>
            </div>

            <FocusAreasView items={focusAreas || []} />
          </div>
        </section>
      </main>
      {contact && <Footer data={contact} />}
    </>
  );
}
