/**
 * Canonical A2P consent copy. This EXACT disclosure is reused at every point
 * where Hanzo collects a phone number for messaging — the public opt-in form at
 * /sms-opt-in, and the phone-login / 2FA step in IAM (iam.hanzo.ai) and
 * hanzo.id. Keep the three surfaces in sync; carriers/Twilio review the wording.
 *
 * It lives here rather than in the page because an App Router route module may
 * only export the route contract (default, metadata, generateStaticParams, …).
 * Anything else fails Next's generated route type — which is the right rule:
 * shared copy is not part of a route's interface.
 */
export const SMS_CONSENT_TEXT =
  "I agree to receive text messages (SMS) from Hanzo AI at the number provided, " +
  "including one-time passcodes and two-factor authentication, account and security " +
  "alerts, and transactional notifications. Message frequency varies. Message and data " +
  "rates may apply. Reply STOP to opt out at any time, or HELP for help. Consent is not " +
  "a condition of any purchase."
