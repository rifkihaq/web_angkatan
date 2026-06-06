import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const dynamic = 'force-static'

export async function GET() {
  const videoPath = path.join(process.cwd(), 'src/components/molecules/members/012/xaleidintro.mp4')
  const video = await readFile(videoPath)

  return new Response(video, {
    headers: {
      'Content-Type': 'video/mp4',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
