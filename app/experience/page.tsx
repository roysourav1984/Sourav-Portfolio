import Masthead from '@/components/sections/Masthead';
import Footer from '@/components/sections/Footer';
import { getExperienceRoles } from '@/lib/data/experience';
import { getContactInfo } from '@/lib/data/contact';
import ExperienceView from './ExperienceView';

export const metadata = {
  title: 'Experience | Portfolio',
  description: 'Complete employment history and career timeline',
};

export const revalidate = 3600;

export default async function ExperiencePage() {
  const [experience, contact] = await Promise.all([
    getExperienceRoles(),
    getContactInfo(),
  ]);

  return (
    <>
      <Masthead />
      <main>
        <section className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-16 bg-paper">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-12">
              <h1 className="text-display-lg font-display text-ink mb-2">Experience Timeline</h1>
              <div className="h-1 w-16 bg-accent mb-4" />
              <p className="text-body-md text-mid max-w-2xl">
                Complete career history
              </p>
            </div>

            <ExperienceView items={experience || []} />
          </div>
        </section>
      </main>
      {contact && <Footer data={contact} />}
    </>
  );
}
