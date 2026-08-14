'use client'


import React, { useState } from 'react';
import { motion } from "framer-motion";
import { ArrowRight, User, UserCheck, Shield, Lock, UserCog, Key, Fingerprint, History } from "lucide-react";
import { Button } from "@hanzo/ui";
import ChromeText from "@/components/ui/chrome-text";
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner";

const Identity = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-primary/5 border border-border rounded-full px-4 py-1 inline-block mb-4">
              <span className="text-foreground/70 text-sm font-medium">Identity surface</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white/20 to-white/10">
              Hanzo Identity
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              The sign-in your users actually see. Hanzo IAM is the service; Identity is the surface in front of
              it — the sign-in page, the sign-up, the account screen, and the SDK that puts them in your app.
              Your application redirects, a person signs in, and your code gets back a signed token. It never
              sees the password.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary/10 hover:bg-primary/10 text-[var(--white)] px-8 py-6 text-lg">
                Get Started
              </Button>
              <Button variant="outline" className="border-border text-[var(--white)] hover:bg-primary/10 px-8 py-6 text-lg">
                View Documentation
              </Button>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-primary/10 border border-border rounded-xl p-6 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-foreground/70" />
              </div>
              <h3 className="text-lg font-bold mb-2">Signing in</h3>
              <p className="text-foreground/80 text-center">
                A password, a passkey, or a Google or GitHub account. A second factor when the organization asks for one.
              </p>
            </div>
            
            <div className="md:col-span-1 bg-primary/10 border border-border rounded-xl p-6 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-10 w-10 text-foreground/70" />
              </div>
              <h3 className="text-lg font-bold mb-2">What the token carries</h3>
              <p className="text-foreground/80 text-center">
                Who signed in, which organizations they belong to, and the role they hold where they asked to act.
              </p>
            </div>
            
            <div className="md:col-span-1 bg-primary/10 border border-border rounded-xl p-6 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Lock className="h-10 w-10 text-foreground/70" />
              </div>
              <h3 className="text-lg font-bold mb-2">One sign-in, every app</h3>
              <p className="text-foreground/80 text-center">
                Sign in once and the session is good across every app in the organization, including ours.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ChromeText as="h2" className="text-3xl font-bold mb-4">
              What it does
            </ChromeText>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Standards, not a proprietary protocol. If your framework can read an OpenID Connect discovery
              document, it can already talk to this.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-border rounded-xl p-6"
            >
              <UserCheck className="h-10 w-10 text-foreground/70 mb-4" />
              <h3 className="text-xl font-bold mb-2">A second factor</h3>
              <p className="text-foreground/80">
                An authenticator app, a code by SMS or email, or a passkey. Enrolment sends the material and then
                demands it back before it writes anything, and the destination is never taken from the request —
                an enrolment that let the caller name the phone would enrol the attacker&apos;s.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-border rounded-xl p-6"
            >
              <UserCog className="h-10 w-10 text-foreground/70 mb-4" />
              <h3 className="text-xl font-bold mb-2">Accounts and membership</h3>
              <p className="text-foreground/80">
                Create people, put them in an organization, give them a role there. SCIM 2.0 does the same thing
                from a directory you already run, so joiners and leavers arrive without a script of your own.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-border rounded-xl p-6"
            >
              <Key className="h-10 w-10 text-foreground/70 mb-4" />
              <h3 className="text-xl font-bold mb-2">Single sign-on</h3>
              <p className="text-foreground/80">
                Every application registers under its own client id and redirects to the same authorize endpoint,
                so a person who is already signed in comes straight back with a code and never sees a form twice.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-border rounded-xl p-6"
            >
              <Shield className="h-10 w-10 text-foreground/70 mb-4" />
              <h3 className="text-xl font-bold mb-2">Roles that travel</h3>
              <p className="text-foreground/80">
                A role is granted at a place — an organization, a workspace under it, a single project. The token
                carries the one that applies to the request, so your service decides without asking us anything.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-border rounded-xl p-6"
            >
              <Fingerprint className="h-10 w-10 text-foreground/70 mb-4" />
              <h3 className="text-xl font-bold mb-2">Passkeys</h3>
              <p className="text-foreground/80">
                A WebAuthn credential registered to the account, unlocked by whatever the device already uses —
                a fingerprint, a face, a PIN. Nothing that can be phished, because there is nothing to type.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-border rounded-xl p-6"
            >
              <History className="h-10 w-10 text-foreground/70 mb-4" />
              <h3 className="text-xl font-bold mb-2">A record of what happened</h3>
              <p className="text-foreground/80">
                Actions are written once to an append-only log scoped to the organization they happened in. The
                write path exists; there is no edit path for normal operation, which is the point of keeping one.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Enterprise Section */}
      <section className="py-20 bg-gradient-to-b from-background to-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ChromeText as="h2" className="text-3xl font-bold mb-4">
              Running it for a large organization
            </ChromeText>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              The same service, wearing your name, on hardware you choose.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary/5 border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Where the data sits</h3>
              <p className="text-foreground/80 mb-4">
                An organization is a tenancy boundary, and the boundary is enforced by the code that reads the
                token rather than by a column somebody has to remember to filter on.
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>Enterprise security with GDPR and privacy controls</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>Self-host it, in your own region, on your own cluster</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>One Go binary, embedded SQLite by default — nothing to run beside it</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-primary/5 border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Bring the identity you already have</h3>
              <p className="text-foreground/80 mb-4">
                Point Identity at your own issuer and it becomes the front door without becoming the record.
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>Federate to any OpenID Connect issuer by naming its discovery URL</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>SCIM 2.0 provisioning, so joiners and leavers arrive from your directory</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>White-labelled by hostname — your mark on your domain, never ours</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-primary/5 border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Signing up your customers</h3>
              <p className="text-foreground/80 mb-4">
                An organization can hold its own customers as sub-organizations, so a business you serve manages
                its people without any of it reaching yours.
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>Sign in with Google or GitHub, or with any issuer you add</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>A consent screen the person has to pass before an app gets a token</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>Org admins manage their own members without platform access</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-primary/5 border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">What you write</h3>
              <p className="text-foreground/80 mb-4">
                Almost nothing. Nobody should be hand-rolling OAuth in 2026, and with this you do not.
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>One SDK with an entry point per runtime — server, React, browser, Next.js, Passport</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>An OpenAPI 3.1 description generated from the handlers themselves</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>The sign-in page is hosted and already built — you send people to it</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-white/20 to-white/10 rounded-2xl p-8 md:p-12 border border-border">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Add sign-in</h2>
              <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
                Register the app, set the callback your framework already uses, install the SDK. That is the
                whole integration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary/10 hover:bg-primary/10 text-[var(--white)] px-8 py-6 text-lg">
                  Sign Up Free
                </Button>
                <Button variant="outline" className="border-border text-[var(--white)] hover:bg-primary/10 px-8 py-6 text-lg">
                  Read Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Identity</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/services/identity" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Identity;
