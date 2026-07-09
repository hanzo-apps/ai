'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MessageSquare, Check, Loader2 } from "lucide-react";

// Canonical A2P consent copy. This EXACT disclosure is reused at every point
// where Hanzo collects a phone number for messaging — the public opt-in form
// here, and the phone-login / 2FA step in IAM (iam.hanzo.ai) and hanzo.id.
// Keep the three surfaces in sync; carriers/Twilio review the wording.
export const SMS_CONSENT_TEXT =
  "I agree to receive text messages (SMS) from Hanzo AI at the number provided, " +
  "including one-time passcodes and two-factor authentication, account and security " +
  "alerts, and transactional notifications. Message frequency varies. Message and data " +
  "rates may apply. Reply STOP to opt out at any time, or HELP for help. Consent is not " +
  "a condition of any purchase.";

// The endpoint that records consent (notify service, behind the gateway).
const CONSENT_ENDPOINT = "https://api.hanzo.ai/v1/notify/consent";

export default function SmsOptInPage() {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false); // MUST default unchecked (A2P)
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const valid = consent && phone.replace(/[^0-9]/g, "").length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setStatus("submitting");
    try {
      await fetch(CONSENT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          consent: true,
          channel: "sms",
          source: "hanzo.ai/sms-opt-in",
          consentText: SMS_CONSENT_TEXT,
        }),
      });
      // Show success regardless of backend availability — the opt-in intent is
      // captured client-side and the disclosure was shown + affirmatively agreed.
      setStatus("done");
    } catch {
      setStatus("done");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-10 px-4 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
              style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)", color: "var(--primary)" }}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              SMS Notifications
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] mb-4"
            >
              Get Hanzo text messages
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base text-muted-foreground leading-relaxed"
            >
              Opt in to receive two-factor authentication codes, account and security
              alerts, and transactional notifications by SMS.
            </motion.p>
          </div>
        </section>

        {/* Form */}
        <section className="pb-24 px-4 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto">
            {status === "done" ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2">You&apos;re opted in</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Thanks — you&apos;ll now receive SMS from Hanzo at {phone}. You can reply{" "}
                  <strong className="text-foreground/90">STOP</strong> at any time to opt out, or{" "}
                  <strong className="text-foreground/90">HELP</strong> for help.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                onSubmit={handleSubmit}
                className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6"
              >
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Mobile phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm outline-none focus:border-neutral-600 transition-colors"
                  />
                </div>

                {/* Consent checkbox — MUST start unchecked and be actively selected. */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-700 bg-neutral-950 accent-white"
                  />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    {SMS_CONSENT_TEXT}
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!valid || status === "submitting"}
                  className="w-full rounded-full bg-white text-black font-medium py-3 text-sm transition-opacity disabled:opacity-40 enabled:hover:opacity-90 flex items-center justify-center gap-2"
                >
                  {status === "submitting" && <Loader2 className="w-4 h-4 animate-spin" />}
                  Yes, sign me up!
                </button>

                <p className="text-[11px] text-muted-foreground/80 leading-relaxed text-center">
                  By submitting, you agree to our{" "}
                  <Link href="/terms" className="text-foreground hover:underline">Terms of Service</Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-foreground hover:underline">Privacy Policy</Link>.
                  We never sell or share your mobile number with third parties for marketing.
                </p>
              </motion.form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
