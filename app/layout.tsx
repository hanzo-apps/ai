import type { Metadata } from 'next'
import Script from 'next/script'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import IamClientProvider from '@/components/auth/IamClientProvider'
import './globals.css'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const SITE_TITLE = 'Hanzo — Open-source cloud for AI agents'
const SITE_DESCRIPTION = 'Build, deploy, and govern AI agents with unified access to models, MCP tools, memory, vector search, secure sandboxes, IAM, KMS, and audit logs. Open-source. Self-host or use the cloud.'

export const metadata: Metadata = {
  metadataBase: new URL('https://hanzo.ai'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: 'https://hanzo.ai',
    siteName: 'Hanzo AI',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <IamClientProvider>{children}</IamClientProvider>
        </ThemeProvider>
        {/* Hanzo Analytics (Umami) */}
        <Script
          src="https://analytics.hanzo.ai/script.js"
          data-website-id="a323a8ae-c811-4061-9626-22caaffc612f"
          strategy="afterInteractive"
        />
        {/* Hanzo Insights */}
        <Script
          id="hanzo-insights"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e){var o,n,p,r;e.__SV||(window.hi=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="hi",u.people=u.people||[],u.toString=function(t){var e="hi";return"hi"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture captureException identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId setPersonProperties".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.hi||[]);
              hi.init('hi_e16a2d5a8033442d87f090b24c606825', {api_host: 'https://insights.hanzo.ai', person_profiles: 'identified_only'});
              hi.register({app:'hanzo-ai',org:'hanzo'});
            `,
          }}
        />
        {/* Sentry error reporting — enable when sentry.hanzo.ai is deployed */}
        {process.env.NEXT_PUBLIC_SENTRY_DSN && (
          <Script
            id="sentry-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(n,e,t,r,i,o,a,c,s){for(var u=s=n[i]=n[i]||function(){(s.q=s.q||[]).push(arguments)},f=0;f<e.length;f++)u[e[f]]=u[e[f]]||function(n){return function(){u([n].concat(Array.prototype.slice.call(arguments)))}}(e[f]);(o=t.createElement(r)).async=1,o.src="https://browser.sentry-cdn.com/9.1.0/bundle.tracing.min.js",(a=t.getElementsByTagName(r)[0]).parentNode.insertBefore(o,a),o.addEventListener("load",function(){n.Sentry.init({dsn:"${process.env.NEXT_PUBLIC_SENTRY_DSN}"});})}(window,["captureException","captureMessage","captureEvent"],"script",document,"Sentry");
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}
