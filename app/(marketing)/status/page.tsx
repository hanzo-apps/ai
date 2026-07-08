'use client'

// Live status is served by status.hanzo.ai — this route only forwards there.
// The site is statically exported (output: 'export'), so the redirect is
// client-side with a visible fallback link.

import { useEffect } from "react";
import { Activity, ArrowRight } from "lucide-react";

const STATUS_URL = "https://status.hanzo.ai";

export default function StatusPage() {
  useEffect(() => {
    window.location.replace(STATUS_URL);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="text-center">
        <Activity className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-medium mb-2">Hanzo Status</h1>
        <p className="text-muted-foreground mb-6">
          Redirecting to the live status page&hellip;
        </p>
        <a
          href={STATUS_URL}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
        >
          Open status.hanzo.ai
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
