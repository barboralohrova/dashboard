import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/dashboard/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/**/*'],
      manifest: {
        name: 'Forest Dashboard',
        short_name: 'Forest',
        description: 'Komplexní životní organizér s gamifikací',
        theme_color: '#7C9A6E',
        background_color: '#F7F5F0',
        display: 'standalone',
        icons: [
          {
            src: '/dashboard/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/dashboard/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      }
    })
  ],
})
