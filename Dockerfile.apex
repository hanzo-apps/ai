# hanzo.ai apex — image ghcr.io/hanzoai/hanzo-ai-www, served by ghcr.io/hanzoai/static.
#
# This is the same static export Dockerfile.production builds for cloud.hanzo.ai;
# the ONLY difference is the root. cloud promotes out/cloud.html to out/index.html
# because its root is app/cloud-site/page.tsx. The apex root is app/page.tsx, which
# already exports to out/index.html, so nothing is promoted here.
#
# It exists to get hanzo.ai off Cloudflare Pages. The apex was the one Hanzo site
# still deployed with `wrangler pages deploy` while every sibling — cloud.hanzo.ai,
# ui.hanzo.ai, papers.hanzo.ai — already shipped as an image behind hanzoai/ingress.
# One serving mechanism for every static surface, on our own stack.

# ---- build stage: Next.js static export ----------------------------------
FROM node:20-bookworm-slim AS build
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .

# NEXT_PUBLIC_* is inlined at build time, so the ingest key has to be present for
# the bundle to carry it — same contract as the Cloudflare build this replaces.
ARG NEXT_PUBLIC_EVENT_INGEST_KEY=""
ENV NEXT_PUBLIC_EVENT_INGEST_KEY=${NEXT_PUBLIC_EVENT_INGEST_KEY}

RUN pnpm build

# Clean URLs on hanzoai/static. The Next export is FLAT (out/pricing.html,
# out/enso.html, …); static serves a DIRECTORY's index.html, so every top-level
# page is also written as <name>/index.html. Identical to the cloud image.
RUN set -eu; \
    for f in out/*.html; do \
      [ "$f" = "out/index.html" ] && continue; \
      [ "$f" = "out/404.html" ] && continue; \
      d="${f%.html}"; mkdir -p "$d"; cp "$f" "$d/index.html"; \
    done

# ---- serve stage: hanzoai/static (scratch + single Go binary) ------------
FROM ghcr.io/hanzoai/static:v0.5.1
COPY --from=build /app/out /srv
# static (>=0.4.0) is configured by FLAGS, not env: --root, --port, --spa.
# --spa so the export's 404.html fallback keeps client-side routing working.
ENTRYPOINT ["/static"]
CMD ["--root=/srv", "--port=3000", "--spa"]
