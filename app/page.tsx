import Masthead from '@/components/sections/Masthead';
import Hero from '@/components/sections/Hero';
import Summary from '@/components/sections/Summary';
import FocusAreas from '@/components/sections/FocusAreas';
import Initiatives from '@/components/sections/Initiatives';
import Experience from '@/components/sections/Experience';
import SkillsMatrix from '@/components/sections/SkillsMatrix';
import Certifications from '@/components/sections/Certifications';
import Awards from '@/components/sections/Awards';
import Education from '@/components/sections/Education';
import Footer from '@/components/sections/Footer';

import { getHeroContent } from '@/lib/data/hero';
import { getSummary } from '@/lib/data/summary';
import { getFocusAreas } from '@/lib/data/focusAreas';
import { getInitiatives } from '@/lib/data/initiatives';
import { getExperienceRoles } from '@/lib/data/experience';
import { getSkillCategories, getFunctionalSkills } from '@/lib/data/skills';
import { getCertifications } from '@/lib/data/certifications';
import { getAwards } from '@/lib/data/awards';
import { getEducation } from '@/lib/data/education';
import { getContactInfo } from '@/lib/data/contact';

export const revalidate = 3600;

export default async function HomePage() {
  const [
    hero,
    summary,
    focusAreas,
    initiatives,
    experience,
    skillCategories,
    functionalSkills,
    certifications,
    awards,
    education,
    contact,
  ] = await Promise.all([
    getHeroContent(),
    getSummary(),
    getFocusAreas(),
    getInitiatives(),
    getExperienceRoles(),
    getSkillCategories(),
    getFunctionalSkills(),
    getCertifications(),
    getAwards(),
    getEducation(),
    getContactInfo(),
  ]);

  return (
    <>
      <Masthead />
      {hero && <Hero data={hero} />}
      {summary && <Summary data={summary} />}
      {focusAreas && focusAreas.length > 0 && <FocusAreas data={focusAreas} />}
      {initiatives && initiatives.length > 0 && <Initiatives data={initiatives} />}
      {experience && experience.length > 0 && <Experience data={experience} />}
      <SkillsMatrix categories={skillCategories || []} functionalSkills={functionalSkills || []} />
      {certifications && certifications.length > 0 && <Certifications data={certifications} />}
      {awards && awards.length > 0 && <Awards data={awards} />}
      {education && education.length > 0 && <Education data={education} />}
      {contact && <Footer data={contact} />}
    </>
  );
}
