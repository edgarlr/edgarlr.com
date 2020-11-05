import fs from 'fs'
import { join } from 'path'

export function getProjects() {
  const fileDir = join(process.cwd(), 'lib/projects.json')
  const content = fs.readFileSync(fileDir, 'utf-8')
  const response = JSON.parse(content)

  return response
}
