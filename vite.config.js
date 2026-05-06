/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiProxyTarget = env.VITE_API_URL;
  return {
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
      proxy: {
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
          secure: true,
          configure: (proxy) => {
            proxy.on('proxyRes', (proxyRes) => {
              proxyRes.headers['access-control-allow-origin'] = '*';
              proxyRes.headers['access-control-allow-methods'] = 'GET,POST,PUT,PATCH,DELETE,OPTIONS';
              proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Authorization';
            });
          },
        },
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
  };
})
