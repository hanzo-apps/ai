import { pageMeta } from '@/lib/page-meta'
export { default } from '@/lib/meta-layout'

export const metadata = pageMeta({
  title: 'A code editor with the agent inside it',
  description: 'Hanzo Code is a fork of VS Code. Your extensions and settings carry over, and the agent that opens files and runs the tests is already there.',
  path: '/code',
})
