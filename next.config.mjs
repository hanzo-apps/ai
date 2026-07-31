// Plain ESM, not TypeScript: the config is a plain object and never needed the
// TypeScript compiler API to load it. Keeping it that way also keeps one of the
// two TypeScript-7 blockers permanently shut.

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig = {
  output: 'export',
  // TypeScript 7 is the native compiler; its JavaScript API is not the one Next's
  // default backend drives, so on 15.x a TS7 build died before reading a page and
  // tsconfig `paths` stopped resolving. Next 16.2 ships `useTypeScriptCli`, which
  // shells out to the project's own tsc instead of driving the API (vercel/next.js
  // #95639, backported to stable). That is the supported way to run TS7 today.
  experimental: {
    useTypeScriptCli: true,
  },
  poweredByHeader: false,
  // @hanzo/gui and its primitives ship untranspiled ESM with react-native module
  // resolution; Next has to compile them and resolve `react-native` to the web
  // implementation. This is the whole browser story for the gui substrate.
  transpilePackages: ['@hanzo/gui', '@hanzo/ui', '@hanzo/data', 'react-native-web'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    }
    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      ...(config.resolve.extensions || []),
    ]
    return config
  },
  // Allow per-build override so a parallel `next dev` (sibling agent on the
  // same branch) doesn't clobber our build artifacts. Defaults to `.next`.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}

export default nextConfig
