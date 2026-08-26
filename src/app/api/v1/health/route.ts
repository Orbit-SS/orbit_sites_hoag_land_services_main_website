import { apiResponse } from '@/lib/public-api'

/**
 * Health endpoint. Referenced by the `status` link relation in
 * /.well-known/api-catalog, which RFC 9727 expects to resolve.
 *
 * Deliberately trivial: this API reads from compiled-in data with no database
 * and no upstream, so "the route executed" is the whole of what there is to
 * report. Anything more would be theatre.
 */
export function GET() {
  return apiResponse({ status: 'ok', service: 'hls-public-api', version: '1.0.0' }, 60)
}
