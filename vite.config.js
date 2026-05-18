import { defineConfig } from 'vite';

export default defineConfig({
  base: '/frontend-kurs2026/',
  server: {
    host: '127.0.0.1',
    port: 5173
  },
  preview: {
    host: '127.0.0.1',
    port: 4173
  }
});

