/**
 * The lint gate.
 *
 * Parsed by @babel/eslint-parser, NOT typescript-eslint. typescript-eslint
 * hard-refuses TypeScript 7 — it throws at import time, in the meta package and
 * in `@typescript-eslint/parser` alike ("typescript-eslint does not support TS
 * 7.0"), so no version of it loads here and bumping does not help: 8.66, the
 * latest, still declares `typescript: >=4.8.4 <6.1.0`. Support is tracked at
 * typescript-eslint#10940 and is scoped to TS >= 7.1. That left this gate red on
 * every run, which is why nobody was reading it.
 *
 * Nothing is lost by the swap: every `@typescript-eslint/*` rule in this file
 * was already `off`, so the family was contributing a PARSER and nothing else.
 * Babel parses the same syntax without involving the TypeScript compiler at all,
 * which is also why it is indifferent to which major TypeScript is on.
 *
 * Type errors are not this gate's job and never were — `pnpm typecheck` (tsc 7,
 * the native compiler) checks the whole tree in about a second, and `pnpm build`
 * fails on a type error because next.config.mjs sets no ignore flags.
 */
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import babelParser from '@babel/eslint-parser'

export default [
  // `.claude/worktrees` holds other agents' checkouts of this same repo — their
  // findings are theirs, and linting them doubles every count reported here.
  { ignores: ['dist', 'out', '.next*', 'node_modules', 'public', '.claude', '**/*.d.ts'] },
  {
    ...js.configs.recommended,
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parser: babelParser,
      parserOptions: {
        // No babel.config: this project compiles through Next's own pipeline and
        // the parser needs presets only to recognise the syntax. preset-typescript
        // reads JSX from the .tsx extension on its own in Babel 8 — `isTSX` and
        // `allExtensions` were removed there.
        requireConfigFile: false,
        babelOptions: { presets: ['@babel/preset-typescript', '@babel/preset-react'] },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // The two base rules typescript-eslint used to switch off on our behalf.
      // TypeScript already answers both, and it answers them correctly: to a
      // JS-only parser every imported type is an undefined global, and every
      // type-only import is an unused variable.
      'no-undef': 'off',
      'no-unused-vars': 'off',

      // Marketing site lint mode: warnings, not errors. Codebase is
      // designer-velocity; strict lint blocks design-iteration shipping.
      'react-refresh/only-export-components': 'off',
      'no-shadow-restricted-names': 'off',
      'no-useless-escape': 'off',
      'no-empty': 'off',
      'no-empty-pattern': 'off',
      'no-prototype-builtins': 'off',
      'no-case-declarations': 'off',
      'no-constant-binary-expression': 'off',
      'prefer-const': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'warn',
    },
  },
]
