module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class', // для темной темы
  theme: {
    extend: {
      colors: {
        'green-primary': '#0DBE8A',
        'green-secondary': '#00A38B',
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'border-custom': 'var(--border-color)',
        'accent-primary': 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(90deg, #0DBE8A 0%, #00A38B 100%)',
        'green-gradient-vertical': 'linear-gradient(180deg, #0DBE8A 0%, #00A38B 100%)',
        'green-gradient-diagonal': 'linear-gradient(45deg, #0DBE8A 0%, #00A38B 100%)',
      }
    },
  },
  plugins: [],
}