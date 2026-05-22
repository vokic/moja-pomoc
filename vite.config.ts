import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-192.svg', 'icon-512.svg'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2,json}'],
        runtimeCaching: [
          {
            urlPattern: /\/catalog\/katalog\.json$/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'mp-catalog' },
          },
        ],
      },
      manifest: {
        name: 'Moja Pomoć',
        short_name: 'Moja Pomoć',
        description: 'Otkrijte sva državna prava koja vam pripadaju u Srbiji.',
        lang: 'sr-Latn',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#162e51',
        icons: [
          { src: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
          { src: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
