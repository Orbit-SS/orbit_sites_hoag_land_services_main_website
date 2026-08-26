import { apiResponse, companyPayload } from '@/lib/public-api'

/** Business facts: contact, credentials, rating, service area. Read-only. */
export function GET() {
  return apiResponse(companyPayload())
}
