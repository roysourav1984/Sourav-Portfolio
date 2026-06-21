import { notFound } from 'next/navigation';
import Masthead from '@/components/sections/Masthead';
import InitiativeDetail from '@/components/sections/InitiativeDetail';
import Footer from '@/components/sections/Footer';
import { getInitiativeBySlug, getInitiatives } from '@/lib/data/initiatives';
import { getContactInfo } from '@/lib/data/contact';

interface WorkDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const initiatives = await getInitiatives();
  return (initiatives || []).map((init) => ({
    slug: init.slug,
  }));
}

export const revalidate = 3600;

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const resolvedParams = await params;
  const [initiative, contact] = await Promise.all([
    getInitiativeBySlug(resolvedParams.slug),
    getContactInfo(),
  ]);

  if (!initiative) {
    notFound();
  }

  return (
    <>
      <Masthead />
      <InitiativeDetail initiative={initiative} />
      {contact && <Footer data={contact} />}
    </>
  );
}
