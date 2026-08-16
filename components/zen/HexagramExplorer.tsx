'use client'

// The 64-pattern experience. One client island, three views over one dataset:
//   Sequence — the King Wen order, grouped into the eight arcs of change.
//   Matrix   — the 8×8 field of upper/lower trigram pairs.
//   Lenses   — the same patterns read through four interpretive minds.
// Every hexagram is active. Nothing here shows Chinese; the glyph, number and
// English label carry the whole meaning.

import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  HEXAGRAMS,
  GROUPS,
  TRIGRAMS,
  TRIGRAM_ORDER,
  LENSES,
  lensCount,
  hexagramAt,
  displayNum,
  englishLabel,
  glyphAria,
  type LensKey,
  type TrigramKey,
} from "./hexagrams";
import { HexagramCard, HexagramDetail, HexagramHead, TrigramLines } from "./HexagramCard";
import { Box } from '@hanzo/ui'

type View = "sequence" | "matrix" | "lenses";

const VIEWS: { key: View; label: string; hint: string }[] = [
  { key: "sequence", label: "Sequence", hint: "All sixty-four, in the traditional King Wen order." },
  { key: "matrix", label: "Matrix", hint: "The eight forces above and below — every pairing is one condition." },
  { key: "lenses", label: "Lenses", hint: "The same patterns, read through four modern minds." },
];

const CARD_GRID = "grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export default function HexagramExplorer() {
  const [view, setView] = useState<View>("sequence");
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKey = useCallback(
    (e: React.KeyboardEvent, i: number) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
      e.preventDefault();
      const last = VIEWS.length - 1;
      let next = i;
      if (e.key === "ArrowRight") next = i === last ? 0 : i + 1;
      if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = last;
      setView(VIEWS[next].key);
      tabsRef.current[next]?.focus();
    },
    []
  );

  return (
    <div>
      <Box
        role="tablist"
        aria-label="Ways to explore the sixty-four patterns"
        className="inline-flex flex-wrap gap-1 rounded-full border border-border bg-secondary/30 p-1"
      >
        {VIEWS.map((v, i) => {
          const active = view === v.key;
          return (
            <button
              key={v.key}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              role="tab"
              id={`tab-${v.key}`}
              aria-selected={active}
              aria-controls={`panel-${v.key}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setView(v.key)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v.label}
            </button>
          );
        })}
      </Box>

      <p className="mt-4 text-sm text-muted-foreground">{VIEWS.find((v) => v.key === view)!.hint}</p>

      <Box className="mt-8">
        <div role="tabpanel" id="panel-sequence" aria-labelledby="tab-sequence" hidden={view !== "sequence"}>
          {view === "sequence" && <SequenceView />}
        </div>
        <div role="tabpanel" id="panel-matrix" aria-labelledby="tab-matrix" hidden={view !== "matrix"}>
          {view === "matrix" && <MatrixView />}
        </div>
        <div role="tabpanel" id="panel-lenses" aria-labelledby="tab-lenses" hidden={view !== "lenses"}>
          {view === "lenses" && <LensesView />}
        </div>
      </Box>
    </div>
  );
}

// ── Sequence ──────────────────────────────────────────────────────
function SequenceView() {
  return (
    <div className="space-y-12">
      {GROUPS.map((g) => (
        <section key={g.roman} aria-labelledby={`group-${g.roman}`}>
          <Box className="mb-4 flex items-baseline gap-3 border-b border-border/60 pb-2">
            <span className="font-mono text-xs text-muted-foreground/50">{g.roman}</span>
            <h3 id={`group-${g.roman}`} className="text-lg font-semibold text-foreground">
              {g.name}
            </h3>
            <span className="font-mono text-xs text-muted-foreground/40">
              {displayNum(g.from)}–{displayNum(g.to)}
            </span>
          </Box>
          <div className={CARD_GRID}>
            {HEXAGRAMS.filter((h) => h.num >= g.from && h.num <= g.to).map((h) => (
              <HexagramCard key={h.num} h={h} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

// ── Lenses ────────────────────────────────────────────────────────
function chip(active: boolean) {
  return `rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
    active
      ? "border-transparent bg-primary text-primary-foreground"
      : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
  }`;
}

function LensesView() {
  const [lens, setLens] = useState<LensKey | null>(null);
  const active = lens ? LENSES.find((l) => l.key === lens)! : null;
  const shown = useMemo(
    () =>
      lens
        ? HEXAGRAMS.filter((h) => h.lenses.includes(lens))
        : HEXAGRAMS.filter((h) => h.lenses.length > 0),
    [lens]
  );

  return (
    <div>
      <Box className="flex flex-wrap gap-2">
        <button aria-pressed={lens === null} onClick={() => setLens(null)} className={chip(lens === null)}>
          All lensed patterns
        </button>
        {LENSES.map((l) => (
          <button
            key={l.key}
            aria-pressed={lens === l.key}
            onClick={() => setLens(l.key)}
            className={chip(lens === l.key)}
          >
            {l.name} <span className="opacity-50">{lensCount(l.key)}</span>
          </button>
        ))}
      </Box>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {active ? (
          <>
            <span className="font-medium text-foreground">{active.name}.</span> {active.definition}
          </>
        ) : (
          "Four modern minds read the same sixty-four patterns. Select one to see the conditions it illuminates."
        )}
      </p>

      <div className={`mt-6 ${CARD_GRID}`}>
        {shown.map((h) => (
          <HexagramCard key={h.num} h={h} />
        ))}
      </div>
    </div>
  );
}

// ── Matrix ────────────────────────────────────────────────────────
function MatrixView() {
  const [sel, setSel] = useState<number>(1);
  const [axisUpper, setAxisUpper] = useState<TrigramKey | null>(null);
  const [axisLower, setAxisLower] = useState<TrigramKey | null>(null);
  const [focus, setFocus] = useState<[number, number]>([0, 0]);
  const cellRefs = useRef<(HTMLButtonElement | null)[][]>(
    TRIGRAM_ORDER.map(() => TRIGRAM_ORDER.map(() => null))
  );

  const selected = HEXAGRAMS.find((h) => h.num === sel)!;

  const inAxis = (upper: TrigramKey, lower: TrigramKey) =>
    (axisUpper === null || upper === axisUpper) && (axisLower === null || lower === axisLower);

  const moveFocus = useCallback((r: number, c: number) => {
    const nr = Math.max(0, Math.min(7, r));
    const nc = Math.max(0, Math.min(7, c));
    setFocus([nr, nc]);
    cellRefs.current[nr][nc]?.focus();
  }, []);

  const onCellKey = useCallback(
    (e: React.KeyboardEvent, r: number, c: number) => {
      switch (e.key) {
        case "ArrowUp": e.preventDefault(); moveFocus(r - 1, c); break;
        case "ArrowDown": e.preventDefault(); moveFocus(r + 1, c); break;
        case "ArrowLeft": e.preventDefault(); moveFocus(r, c - 1); break;
        case "ArrowRight": e.preventDefault(); moveFocus(r, c + 1); break;
        case "Home": e.preventDefault(); moveFocus(r, 0); break;
        case "End": e.preventDefault(); moveFocus(r, 7); break;
        default: break;
      }
    },
    [moveFocus]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <p className="mb-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Each hexagram stacks two trigrams — the lower force (bottom three lines) beneath the upper
          force (top three lines). Select a row or column to see how one force meets every other.
        </p>

        <Box className="overflow-x-auto pb-2">
          <div
            role="group"
            aria-label="The sixty-four hexagrams arranged by upper and lower trigram"
            className="inline-grid"
            style={{ gridTemplateColumns: "2.75rem repeat(8, minmax(2.5rem, 1fr))" }}
          >
            {/* corner */}
            <Box className="flex items-end justify-center pb-1 text-[9px] font-mono uppercase leading-tight text-muted-foreground/40">
              U/L
            </Box>
            {/* column headers = lower trigram */}
            {TRIGRAM_ORDER.map((lk) => {
              const t = TRIGRAMS[lk];
              const on = axisLower === lk;
              return (
                <button
                  key={`col-${lk}`}
                  onClick={() => setAxisLower(on ? null : lk)}
                  aria-pressed={on}
                  title={`Lower: ${t.name}`}
                  className={`flex flex-col items-center gap-0.5 rounded-md py-1 text-xl leading-none transition-colors ${
                    on ? "bg-primary/15 text-foreground" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  <span role="img" aria-label={`Lower trigram ${t.name}`}>{t.glyph}</span>
                </button>
              );
            })}

            {/* rows = upper trigram */}
            {TRIGRAM_ORDER.map((uk, r) => {
              const tu = TRIGRAMS[uk];
              const onU = axisUpper === uk;
              return (
                <React.Fragment key={`row-${uk}`}>
                  <button
                    onClick={() => setAxisUpper(onU ? null : uk)}
                    aria-pressed={onU}
                    title={`Upper: ${tu.name}`}
                    className={`flex items-center justify-center rounded-md text-xl leading-none transition-colors ${
                      onU ? "bg-primary/15 text-foreground" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    <span role="img" aria-label={`Upper trigram ${tu.name}`}>{tu.glyph}</span>
                  </button>
                  {TRIGRAM_ORDER.map((lk, c) => {
                    const h = hexagramAt(uk, lk)!;
                    const isSel = h.num === sel;
                    const lit = inAxis(uk, lk);
                    return (
                      <button
                        key={`cell-${uk}-${lk}`}
                        ref={(el) => {
                          cellRefs.current[r][c] = el;
                        }}
                        tabIndex={focus[0] === r && focus[1] === c ? 0 : -1}
                        onFocus={() => setFocus([r, c])}
                        onKeyDown={(e) => onCellKey(e, r, c)}
                        onClick={() => setSel(h.num)}
                        title={`${displayNum(h.num)} · ${englishLabel(h)}`}
                        aria-label={`${glyphAria(h)}. ${tu.name} over ${TRIGRAMS[lk].name}.`}
                        className={`flex aspect-square flex-col items-center justify-center rounded-md border text-center transition-all ${
                          isSel
                            ? "border-white/40 bg-white/10"
                            : "border-transparent hover:border-border hover:bg-secondary/40"
                        } ${lit ? "opacity-100" : "opacity-25"}`}
                      >
                        <span role="img" aria-hidden="true" className="text-lg leading-none text-foreground">
                          {h.glyph}
                        </span>
                        <span className="mt-0.5 font-mono text-[9px] text-muted-foreground/60">
                          {displayNum(h.num)}
                        </span>
                      </button>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </Box>

        {/* Trigram legend / how to read */}
        <Box className="mt-6 rounded-xl border border-border bg-secondary/20 p-4">
          <p className="mb-3 text-[11px] font-mono uppercase tracking-wider text-muted-foreground/50">
            The eight trigrams
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
            {TRIGRAM_ORDER.map((k) => {
              const t = TRIGRAMS[k];
              return (
                <li key={k} className="flex items-center gap-2.5">
                  <span role="img" aria-label={t.name} className="text-lg leading-none text-foreground/80">
                    {t.glyph}
                  </span>
                  <TrigramLines lines={t.lines} />
                  <span className="text-sm text-muted-foreground">{t.name}</span>
                </li>
              );
            })}
          </ul>
        </Box>
      </div>

      {/* Selected detail */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <Box className="rounded-xl border border-border bg-secondary/20 p-5">
          <Box className="mb-4 flex items-center gap-4">
            <HexagramHead h={selected} glyphClass="text-4xl" />
          </Box>
          <Box className="border-t border-border/60 pt-4">
            <HexagramDetail h={selected} />
          </Box>
        </Box>
      </aside>
    </div>
  );
}
