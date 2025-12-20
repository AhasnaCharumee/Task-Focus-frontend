// Tailwind v4 uses a separate PostCSS integration package: @tailwindcss/postcss
// If you haven't installed it yet, run: npm install -D @tailwindcss/postcss
module.exports = {
  plugins: {
    // Use the new Tailwind PostCSS plugin wrapper for v4+
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
