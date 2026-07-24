'use client'

import { HanzoFooter } from '@hanzogui/shell'

/**
 * Footer — the unified Hanzo ecosystem footer.
 *
 * All columns/links come from the shell registry (`HANZO_FOOTER_COLUMNS` +
 * `HANZO_FOOTER_BOTTOM`); `currentProductId="ai"` highlights hanzo.ai in the
 * PRODUCTS column. The bespoke footer (local link tables, newsletter, chat
 * widget) is retired in favor of this single source.
 */
const Footer = () => <HanzoFooter currentProductId="ai" />

export default Footer
