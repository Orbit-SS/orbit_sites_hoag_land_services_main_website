import { skillsIndex } from '@/lib/agent-skills'

/**
 * Agent Skills Discovery index (RFC v0.2.0).
 *
 * Digests are recomputed from the SKILL.md bodies on every request, so the
 * index cannot drift from the documents it points at.
 */
export function GET() {
  return Response.json(skillsIndex(), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
