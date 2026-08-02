import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 30000,

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8084',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Two suites, because they have two different subjects and only one of them
  // can gate a merge.
  //
  //   gates    — assert against `out/`, the bytes that ship. They need `pnpm
  //              build` and nothing else: they serve the export themselves, so
  //              CI can run them and a failure is always the repo's fault.
  //   chromium — the older specs. They drive a dev server on :8084 or the live
  //              site, so they cannot gate a build and are run by hand.
  projects: [
    {
      name: 'gates',
      testDir: './e2e/gates',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium',
      testDir: './e2e',
      testIgnore: '**/gates/**',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // webServer disabled - run `pnpm dev` manually before tests
  // webServer: {
  //   command: 'pnpm run dev',
  //   url: 'http://localhost:8084',
  //   reuseExistingServer: true,
  //   timeout: 120000,
  // },
});
