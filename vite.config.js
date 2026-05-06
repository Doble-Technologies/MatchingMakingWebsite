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
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['mm-dev.rcslabs.dev', '.rcslabs.dev'],
    cors: true,
    hmr: {
      host: 'mm-dev.rcslabs.dev',
      clientPort: 443,
      protocol: 'wss',
    },
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: ['mm-dev.rcslabs.dev', '.rcslabs.dev'],
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
