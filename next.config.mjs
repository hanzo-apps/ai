// Plain ESM, not TypeScript. Next loads a .ts config by calling into the
// TypeScript compiler API, which is a moving part this file never needed — the
// config is a plain object. It is also what blocks TypeScript 7 today: under
// 7.0.2 that call fails with `Cannot read properties of undefined (reading
// 'fileExists')` before Next reads a single page, and tsconfig `paths` stop
// resolving too, so `@/…` imports go unresolved. The compiler itself is fine
// (identical 551 pre-existing errors on 5.9.3 and 7.0.2); it is Next's
// TypeScript integration that is not ported. One less reason to care.

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig = {
  output: 'export',
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
