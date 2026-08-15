/**
 * The part of a file a reader of the site can see.
 *
 * The audits beside this one forbid a fact being typed where it should be read.
 * Both scan lines, and a comment is where the rule gets explained, so comment
 * spans are blanked here — line numbers kept, strings left alone, because a
 * string is copy.
 *
 * `//` opens a comment only when no colon precedes it, so a URL keeps its path.
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
