import type { MetadataRoute } from 'next';
import { getInitiatives } from '@/lib/data/initiatives';
import { getExperienceRoles } from '@/lib/data/experience';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://souravroy.dev';

  const initiatives = await getInitiatives();
  const roles = await getExperienceRoles();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...(initiatives || []).map((init) => ({
      url: `${baseUrl}/work/${init.slug}`,
      lastModified: init.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...(roles || []).map((role) => ({
      url: `${baseUrl}/experience/${role.slug}`,
      lastModified: role.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
