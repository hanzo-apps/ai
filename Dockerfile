# Hanzo Cloud marketing site (cloud.hanzo.ai) — image ghcr.io/hanzoai/cloud-www.
# Builds the @hanzo/site static export and promotes the monochrome marketing
# CloudLanding (/cloud) to the site root, served via ghcr.io/hanzoai/static.
# CTAs point to console.hanzo.ai; /signin & /signup are handled by the hanzo.id
# routers.
#
# Build (BuildKit, on-cluster — no GHA):
#   --opt=filename=Dockerfile
#   --output=type=image,name=ghcr.io/hanzoai/cloud-www:<tag>,push=true

# ---- build stage: Next.js static export ----------------------------------
# Node 22, because `engines` says >=22.18 and this stage runs the same
# `pnpm build` the floor was declared for: its second half, `scripts/noindex.mjs`,
# imports `lib/routes.ts` directly and needs the type stripping Node does for
# itself only from 22.18. On Node 20 that throws ERR_UNKNOWN_FILE_EXTENSION
# AFTER every page has rendered, so the export looks complete right up until the
# build exits non-zero. The floor was raised in `.nvmrc`, `engines`, `hanzo.yml`
# and the CF-Pages workflow together; this file was the one lane that kept 20.
FROM node:22-bookworm-slim AS build
WORKDIR /app

# Enable pnpm via corepack, pinned to the version that generated the lockfile.
# Avoids corepack pulling an incompatible latest pnpm.
RUN corepack enable && corepack prepare pnpm@10.33.4 --activate

# Install deps against the committed lockfile for reproducible builds.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# NEXT_PUBLIC_* is inlined by Next at build time, so the key arrives as a build
# arg; an env var on the serve stage is too late. Sourced from KMS
# (deploy/EVENT_INGEST_KEY) by the BuildKit invocation:
#   --opt build-arg:EVENT_INGEST_KEY=pk-…
# It is publishable and write-only — it ships in the client bundle — so it is a
# build arg rather than a secret mount.
#
# Omitted is REFUSED, because omitted is how the live 401 shipped: cloud no
# longer files credential-less traffic under a $public tenant (that lane is
# retired — cloud apps/analytics/public.go), so a keyless bundle has every
# anonymous POST /v1/event answered 401 ingest_key_required — all pageviews and
# errors dropped, and the refusal is a console error on every visit.
#
# EVENT_INGEST_KEY is the name in KMS and on the --build-arg; NEXT_PUBLIC_ is
# added here because that prefix is what makes Next inline a var.
ARG EVENT_INGEST_KEY
ENV NEXT_PUBLIC_EVENT_INGEST_KEY=$EVENT_INGEST_KEY
RUN case "$EVENT_INGEST_KEY" in \
      pk-*) : ;; \
      '')   echo "EVENT_INGEST_KEY is empty - pass --opt build-arg:EVENT_INGEST_KEY=pk-... (KMS deploy/EVENT_INGEST_KEY, env prod)" >&2; exit 1 ;; \
      *)    echo "EVENT_INGEST_KEY is not a publishable key (expected a pk- prefix)" >&2; exit 1 ;; \
    esac

# Build the static export (next.config.ts: output: 'export' -> ./out).
# Large export (hundreds of pages): the default Node heap OOMs it — same
# headroom the CF-Pages deploy lane uses (.hanzo/workflows/deploy.yml).
COPY . .
RUN NODE_OPTIONS=--max-old-space-size=8192 pnpm build

# Prove the key was INLINED, not merely supplied: a bundler change that stopped
# reading the env var would rebuild the exact keyless artifact the ARG check
# above exists to prevent, while both it and the build stayed green.
RUN grep -rqF "$NEXT_PUBLIC_EVENT_INGEST_KEY" out/_next/static || \
    { echo "EVENT_INGEST_KEY was supplied but is NOT in out/_next/static" >&2; exit 1; }

# Promote the monochrome marketing CloudLanding (/cloud — Hanzo-Cloud branding:
# the products mega-menu, the "Open-weight model garden" / "On-demand GPU
# compute" primitive grid, the WebGL point-globe hero, and the "Open Console"
# CTA that deep-links to console.hanzo.ai) to cloud.hanzo.ai's web root. This is
# app/(marketing)/cloud/page.tsx wrapped by the (marketing) Navbar/Footer. With
# trailingSlash:false Next emits out/cloud.html (flat file); _next assets are
# absolute so they resolve from / unchanged. (The old detailed /overview
# homepage stays served at its own /overview route on the same export.)
# Which exported page is `/`. cloud.hanzo.ai=cloud, apex=index (already the root).
ARG SITE_ROOT=index
RUN set -eu; \
    if [ "${SITE_ROOT}" != "index" ]; then \
      [ -f "out/${SITE_ROOT}.html" ] || { echo "FATAL: out/${SITE_ROOT}.html not exported"; exit 1; }; \
      cp "out/${SITE_ROOT}.html" out/index.html; \
    fi; \
    [ -f out/index.html ] || { echo "FATAL: no out/index.html"; exit 1; }

# Clean URLs on hanzoai/static. The Next export is FLAT (trailingSlash:false →
# out/pricing.html, out/enso.html, …). hanzoai/static serves a *directory's*
# index.html, and in --spa mode a MISS (extensionless /pricing) falls through to
# index.html (the homepage) — so every deep page rendered the homepage instead of
# itself. Materialize a directory index per page (out/pricing/index.html, …) so
# `root.Open("/pricing")` finds a directory and serves the real page; the flat
# .html files stay too (so /pricing and /pricing.html both work).
RUN cd out && for f in $(find . -type f -name '*.html' ! -name 'index.html' ! -name '404.html'); do \
      d="${f%.html}"; mkdir -p "$d"; cp "$f" "$d/index.html"; \
    done

# ---- serve stage: hanzoai/static (scratch + single Go binary) ------------
FROM ghcr.io/hanzoai/static:v0.5.1
COPY --from=build /app/out /srv
# static (>=0.4.0) is configured by FLAGS: --root, --port, --spa.
ENTRYPOINT ["/static"]
CMD ["--root=/srv", "--spa", "--port=3000"]
