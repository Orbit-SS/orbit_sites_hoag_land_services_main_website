import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import LocationPage from '@/components/LocationPage'
import { ALL_LOCATIONS, getLocation, isStaticServiceSlug } from '@/data/locations'
import { generateLocationPageData } from '@/data/location-content'

const SERVICE: 'site' = 'site'

type Props = {
  params: Promise<{ location: string }>
}

export async function generateStaticParams() {
  return ALL_LOCATIONS
    .filter(loc => !isStaticServiceSlug(loc.slug, SERVICE))
    .map(loc => ({ location: loc.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location: slug } = await params
  const loc = getLocation(slug)
  if (!loc || isStaticServiceSlug(slug, SERVICE)) return {}

  const data = generateLocationPageData(loc, SERVICE)

  return {
    title: data.title,
    description: data.metaDescription,
    alternates: { canonical: data.canonicalUrl },
    openGraph: {
      type: 'website',
      title: data.title,
      description: data.metaDescription,
      url: data.canonicalUrl,
      siteName: 'Hoag Land Services',
      locale: 'en_US',
      images: [{ url: data.ogImage, width: 1200, height: 630, alt: `${data.serviceCategoryName} in ${data.location} ${data.stateAbbr}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.metaDescription,
      images: [data.ogImage],
    },
  }
}

export default async function SiteWorkLocationPage({ params }: Props) {
  const { location: slug } = await params
  const loc = getLocation(slug)
  if (!loc || isStaticServiceSlug(slug, SERVICE)) notFound()

  const data = generateLocationPageData(loc, SERVICE)

  return <LocationPage data={data} />
}
