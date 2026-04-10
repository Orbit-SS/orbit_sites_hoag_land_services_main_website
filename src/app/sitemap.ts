import type { MetadataRoute } from 'next'
import { ALL_LOCATIONS, SERVICE_CATEGORIES, type ServiceCategory } from '@/data/locations'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hlsdeland.com'
  const now = new Date().toISOString()

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/join`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/service-areas`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  // Service category landing pages
  const serviceCategories = Object.keys(SERVICE_CATEGORIES) as ServiceCategory[]
  const serviceCategoryPages: MetadataRoute.Sitemap = serviceCategories.map(key => ({
    url: `${baseUrl}/services/${SERVICE_CATEGORIES[key].slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // Sub-service pages (static)
  const subServicePages: MetadataRoute.Sitemap = serviceCategories.flatMap(key => {
    const cat = SERVICE_CATEGORIES[key]
    return cat.services.map(svc => ({
      url: `${baseUrl}${svc.href}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  })

  // Location pages — 123 locations × 3 services = 369 pages
  const locationPages: MetadataRoute.Sitemap = serviceCategories.flatMap(key => {
    const cat = SERVICE_CATEGORIES[key]
    return ALL_LOCATIONS.map(loc => ({
      url: `${baseUrl}/services/${cat.slug}/${loc.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: loc.priority === 'high' ? 0.8 : loc.priority === 'medium' ? 0.6 : 0.5,
    }))
  })

  return [...corePages, ...serviceCategoryPages, ...subServicePages, ...locationPages]
}
