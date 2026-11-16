// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: 'https://electricidad-matias-vallejos.vercel.app',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://electricidad-matias-vallejos.vercel.app/#servicios',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://electricidad-matias-vallejos.vercel.app/#por-que-elegirme',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://electricidad-matias-vallejos.vercel.app/#zonas-y-horarios',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://electricidad-matias-vallejos.vercel.app/#resenas',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://electricidad-matias-vallejos.vercel.app/#contacto',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
