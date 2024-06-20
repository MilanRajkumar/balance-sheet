/// <reference types="vitest"/>
/// <reference types="vite/client"/>

import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, '.');
  return {
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
      proxy: {
        '^/reports/.*': {
          target: viteEnv.VITE_BASE_URL,
          changeOrigin: false,
          secure: false,
          proxyTimeout: 300000,
        },
      },
    },
  };
});
