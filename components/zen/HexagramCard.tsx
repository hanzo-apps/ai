'use client'

// Presentational hexagram pieces, shared across all three explorer views.
// A reader sees only: the Unicode glyph, the number, and an English label.
// Chinese (nameZh / namePinyin) lives in the data module and is never rendered.

import React from "react";
import {
  type Hexagram,
  TRIGRAMS,
  LENSES,
  englishLabel,
  glyphAria,
  displayNum,
} from "./hexagrams";
import { Box } from '@hanzo/ui'

// A single trigram drawn as three stacked lines (top → bottom).
// Yang = solid bar, Yin = broken bar. Purely decorative (aria-hidden).
export function TrigramLines({
  lines,
  className = "",
}: {
  lines: readonly [number, number, number];
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex flex-col items-center justify-center gap-[3px] text-foreground ${className}`}
    >
      {[2, 1, 0].map((i) =>
        lines[i] === 1 ? (
          <span key={i} className="block h-[3px] w-5 rounded-[1px] bg-current" />
        ) : (
          <span key={i} className="flex w-5 justify-between">
            <span className="block h-[3px] w-2 rounded-[1px] bg-current" />
            <span className="block h-[3px] w-2 rounded-[1px] bg-current" />
          </span>
        )
      )}
    </span>
  );
}

function LensTags({ lenses }: { lenses: Hexagram["lenses"] }) {
  if (lenses.length === 0) return null;
  return (
    <Box className="flex flex-wrap gap-1.5">
      {lenses.map((k) => {
        const lens = LENSES.find((l) => l.key === k)!;
        return (
          <span
            key={k}
            title={lens.definition}
            className="rounded-full border border-border bg-white/5 px-2 py-0.5 text-[11px] font-medium text-foreground/80"
          >
            {lens.name}
          </span>
        );
      })}
    </Box>
  );
}

// The expanded content for a hexagram, in canonical order:
// condition → principle → operational rule → diagnostic question → lenses.
export function HexagramDetail({ h }: { h: Hexagram }) {
  const upper = TRIGRAMS[h.upper];
  const lower = TRIGRAMS[h.lower];
  return (
    <div className="space-y-4 text-left">
      <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        <span className="text-foreground/70">{upper.name}</span>
        <span className="text-muted-foreground/40">over</span>
        <span className="text-foreground/70">{lower.name}</span>
      </p>
      <dl className="space-y-3">
        <div>
          <dt className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/50">
            Principle
          </dt>
          <dd className="text-[15px] font-medium text-foreground">{h.statement}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/50">
            In practice
          </dt>
          <dd className="text-sm leading-relaxed text-muted-foreground">{h.rule}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/50">
            Ask
          </dt>
          <dd className="text-sm italic text-foreground/90">{h.question}</dd>
        </div>
        {h.lenses.length > 0 && (
          <div>
            <dt className="mb-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground/50">
              Lenses
            </dt>
            <dd>
              <LensTags lenses={h.lenses} />
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}

// The always-visible header: glyph + number + English label.
export function HexagramHead({
  h,
  glyphClass = "text-3xl",
}: {
  h: Hexagram;
  glyphClass?: string;
}) {
  return (
    <>
      <span
        role="img"
        aria-label={glyphAria(h)}
        className={`${glyphClass} shrink-0 leading-none text-foreground`}
      >
        {h.glyph}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[11px] text-muted-foreground/60">
          {displayNum(h.num)}
        </span>
        <span className="block text-sm font-semibold leading-snug text-foreground">
          {englishLabel(h)}
        </span>
      </span>
    </>
  );
}

// A self-contained, keyboard-accessible disclosure card (native <details>).
// Works without JavaScript; content is present in the HTML for search + a11y.
export function HexagramCard({ h }: { h: Hexagram }) {
  return (
    <details className="group rounded-xl border border-border bg-secondary/20 transition-colors open:bg-secondary/40 hover:border-white/20">
      <summary className="flex cursor-pointer list-none items-center gap-4 p-4 [&::-webkit-details-marker]:hidden">
        <HexagramHead h={h} />
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <Box className="border-t border-border/60 px-4 pb-4 pt-4">
        <HexagramDetail h={h} />
      </Box>
    </details>
  );
}
