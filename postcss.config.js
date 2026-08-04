// Tailwind v4 compiles through Lightning CSS, which already prefixes against
// the project's browser targets. autoprefixer was a second, older prefixer
// running over that same output — it is gone, and one plugin is the whole
// pipeline. This file disappears with the last utility class.
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
