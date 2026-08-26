import { apiResponse, servicesPayload } from '@/lib/public-api'

/** The three service lines and every sub-service under them. Read-only. */
export function GET() {
  return apiResponse(servicesPayload())
}
