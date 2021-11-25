import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['favicon.png', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],  
      manifest: {
        // name: '考試了 Examler',
        // short_name: 'Examler',
        // start_url: "/index.html",
        // description: '題庫練習及考試平台',
        // theme_color: '#ffffff',
        // icons: [
        //   {
        //     src: 'pwa-192x192.png',
        //     sizes: '192x192',
        //     type: 'image/png',
        //   },
        //   {
        //     src: 'pwa-512x512.png',
        //     sizes: '512x512',
        //     type: 'image/png',
        //   },
        //   {
        //     src: 'pwa-512x512.png',
        //     sizes: '512x512',
        //     type: 'image/png',
        //     purpose: 'any maskable',
        //   }
        // ]

        "background_color": "#ffffff",
        "description": "題庫練習及考試平台",
        "dir": "ltr",
        "display": "standalone",
        "name": "考試了 Examler",
        "orientation": "any",
        "scope": "/",
        "short_name": "Examler",
        "start_url": "/index.html",
        "theme_color": "#ffffff",
        "categories": [],
        "screenshots": [],
        "icons": [
          {
            "src": "/favicon-32x32.png",
            "type": "image/png",
            "sizes": "32x32"
          },
          {
            "src": "/favicon-16x16.png",
            "type": "image/png",
            "sizes": "16x16"
          },
          {
            "src": "/apple-touch-icon.png",
            "type": "image/png",
            "sizes": "180x180"
          },
          {
            "src": "/safari-pinned-tab.svg"
          },
          {
            "src": "/favicon.ico",
            "type": "image/x-icon"
          }
        ],
        "shortcuts": [] 
      },
    })
  ]
})
