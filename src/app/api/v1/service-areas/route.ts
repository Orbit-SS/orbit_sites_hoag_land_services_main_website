import { apiResponse, coverageFor, serviceAreasPayload } from '@/lib/public-api'

/**
 * Coverage. With no query, returns every county and city. With `?q=` (a city
 * name, a slug, or a ZIP), answers the coverage question for that one place.
 */
export function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q')
  if (query) return apiResponse(coverageFor(query))
  return apiResponse(serviceAreasPayload())
}
