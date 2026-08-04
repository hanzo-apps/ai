# hanzo.ai — the marketing site (Next.js static export). Every target CALLS a
# package.json script; this file carries no build logic of its own.

PNPM ?= pnpm

.PHONY: help build dev test lint clean

help: ## Show this help.
	@awk 'BEGIN{FS=":.*##";printf "\nUsage: make <target>\n\nTargets:\n"} /^[a-zA-Z_-]+:.*##/{printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: node_modules ## Build the static export into out/.
	$(PNPM) build

dev: node_modules ## Run the dev server.
	$(PNPM) dev

# The suite has two projects and they do not have the same subject
# (playwright.config.ts): `gates` serves out/ itself, `chromium` drives a server
# on :8084. Plain `pnpm test` runs both — that is what this repo means by test,
# so it is what runs here rather than a subset make chose for it.
test: node_modules ## Run the Playwright suite.
	$(PNPM) test

lint: node_modules ## eslint .
	$(PNPM) lint

# Exactly the set .gitignore names as generated: .next, plus the NEXT_DIST_DIR
# siblings parallel builds pick for themselves, the export, the incremental tsc
# state, and the two Playwright report dirs. Not one of them is tracked (checked
# with git ls-files), so this cannot delete committed source. The globs are the
# shell's, and an unmatched glob is a name rm -f shrugs at — so it is idempotent.
clean: ## Remove build output. Keeps node_modules.
	rm -rf .next .next-* out *.tsbuildinfo playwright-report test-results

node_modules: ## Install deps (pnpm install --frozen-lockfile).
	$(PNPM) install --frozen-lockfile
