/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const allowedHosts = ['mm-dev.rcslabs.dev', '.rcslabs.dev', 'localhost', '127.0.0.1'];

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react'
    })
  ],
  server:{
    host: true,
    allowedHosts,
    cors: true,
    hmr: true
  },
  preview: {
    host: true,
    allowedHosts
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