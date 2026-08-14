/**
 * The part of a file a reader of the SITE can see.
 *
 * The audits beside this one forbid a fact being typed where it should be read —
 * a model count, a price. Both scan raw lines, so both also read the comments,
 * and a comment is where you explain the rule. `audit-model-counts.mjs` failed on
 * its own explanation of why "400+ models" is wrong, quoted inside a doc comment
 * in hooks/useModelCount.ts. A gate that fires on the sentence describing it
 * teaches people to phrase around it, which is how a gate stops being trusted.
 *
 * Comment spans are blanked rather than removed, so a line number still points at
 * the line it came from.
 *
 * `//` only opens a comment when a colon is not in front of it, or `https://…`
 * would swallow the rest of the line. Getting that wrong can only blank MORE
 * text, never less, so it cannot manufacture a pass — but it could hide one, and
 * this gate has to be right about the one thing it claims.
 */
const blank = (s) => s.replace(/[^\n]/g, " ");

export function code(text) {
  let out = "";
  let i = 0;
  let quote = null; // ' " ` — a comment opener inside a string is just text
  while (i < text.length) {
    const c = text[i];
    const two = text.slice(i, i + 2);
    if (quote) {
      if (c === "\\") { out += text.slice(i, i + 2); i += 2; continue; }
      if (c === quote) quote = null;
      out += c; i++; continue;
    }
    if (c === "'" || c === '"' || c === "`") { quote = c; out += c; i++; continue; }
    if (two === "/*") {
      const end = text.indexOf("*/", i + 2);
      const stop = end === -1 ? text.length : end + 2;
      out += blank(text.slice(i, stop)); i = stop; continue;
    }
    if (two === "//" && text[i - 1] !== ":") {
      const nl = text.indexOf("\n", i);
      const stop = nl === -1 ? text.length : nl;
      out += blank(text.slice(i, stop)); i = stop; continue;
    }
    out += c; i++;
  }
  return out;
}

/** Markdown and MDX carry no code comments — their prose IS the copy. */
export const isCode = (path) => /\.(ts|tsx|js|jsx|mjs|cjs)$/.test(path);
