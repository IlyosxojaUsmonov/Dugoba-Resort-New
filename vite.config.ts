import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion-vendor': ['gsap', 'lenis', 'framer-motion'],
        },
      },
    },
  },
  experimental: {
    renderBuiltUrl(filename, { type, hostType }) {
      if (type === 'asset' && hostType !== 'html') {
        return `https://dugobaresort.b-cdn.net/${filename}`;
      }
    },
  },
});
