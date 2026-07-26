export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: '#090a0f',
        paper: '#f4f1eb',
        signal: '#c8ff4a',
        ember: '#ff5f38',
        aqua: '#6ee7f9',
        plum: '#8b5cf6',
      },
      boxShadow: {
        glass: '0 20px 70px rgba(0, 0, 0, 0.28)',
      },
    },
  },
  plugins: [],
};
