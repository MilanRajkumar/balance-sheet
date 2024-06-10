/// <reference types="vitest"/>

import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  test: {
    globals: true,
    includeSource: ['src/**/*.test.{ts, tsx}'],
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
  server: {
    port: 3001,
    host: true,
    watch: {
      usePolling: true,
    },
  },
});
