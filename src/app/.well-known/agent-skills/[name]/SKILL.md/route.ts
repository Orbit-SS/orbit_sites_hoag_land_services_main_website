import { skillByName } from '@/lib/agent-skills'

export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> },
) {
  const { name } = await context.params
  const skill = skillByName(name)

  if (!skill) {
    return new Response(`# Not found\n\nNo skill named ${name}\n`, {
      status: 404,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    })
  }

  return new Response(skill.markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
