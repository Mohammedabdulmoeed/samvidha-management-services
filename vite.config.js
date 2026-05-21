import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Downlevel syntax so react-snap's Puppeteer/Chromium can execute the bundle
    target: 'es2019',
  },
});
