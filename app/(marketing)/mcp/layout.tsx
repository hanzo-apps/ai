import { pageMeta } from '@/lib/page-meta'
export { default } from '@/lib/meta-layout'

export const metadata = pageMeta({
  title: 'An MCP server with thirteen tools',
  description: "A shell, a filesystem, a code index, git, HTTP and your project's own context, over stdio or streamable HTTP. Point any MCP client at it and the tools show up.",
  path: '/mcp',
})
