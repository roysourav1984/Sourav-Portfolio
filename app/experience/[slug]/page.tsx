import { notFound } from 'next/navigation';
import Masthead from '@/components/sections/Masthead';
import RoleDetail from '@/components/sections/RoleDetail';
import Footer from '@/components/sections/Footer';
import { getRoleBySlug, getExperienceRoles } from '@/lib/data/experience';
import { getContactInfo } from '@/lib/data/contact';

interface ExperienceDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const roles = await getExperienceRoles();
  return (roles || []).map((role) => ({
    slug: role.slug,
  }));
}

export const revalidate = 3600;

export default async function ExperienceDetailPage({ params }: ExperienceDetailPageProps) {
  const resolvedParams = await params;
  const [role, contact] = await Promise.all([
    getRoleBySlug(resolvedParams.slug),
    getContactInfo(),
  ]);

  if (!role) {
    notFound();
  }

  return (
    <>
      <Masthead />
      <RoleDetail role={role} />
      {contact && <Footer data={contact} />}
    </>
  );
}
