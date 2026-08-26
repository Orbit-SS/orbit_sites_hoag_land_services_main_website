import { apiResponse, reviewsPayload } from '@/lib/public-api'

/** Aggregate rating plus the published review subset shown on /reviews. */
export function GET() {
  return apiResponse(reviewsPayload())
}
