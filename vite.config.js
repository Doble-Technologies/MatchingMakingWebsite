/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react'
    })
  ],
  server:{
    host: true,
    allowedHosts: "mm-dev.rcslabs.dev",
    cors: true,
    hmr: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@src': path.resolve(__dirname, './src'),
    }
  }
})