// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  modules: ['@vite-pwa/nuxt', 'nuxt-qrcode'],
  vite: {
    plugins: [
      vuetify({ autoImport: true })
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },
  ssr: false,
  app: {
    head: {
      link: [
        { rel:"manifest", href:"/manifest.webmanifest"  }
      ]
    }
  },
  pwa: {
    strategies: 'generateSW',
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    },
    manifest: {
      "short_name": "Audiomark",
      "name": "Audio recorder",
      "icons": [
        {
          "src": "/audiomark192.png",
          "type": "image/png",
          "sizes": "192x192"
        },
        {
          "src": "/audiomark512.png",
          "type": "image/png",
          "sizes": "512x512"
        }
      ],
      "id": "/?source=pwa",
      "start_url": "/?source=pwa",
      "background_color": "#FFFFFF",
      "display": "standalone",
      "scope": "/",
      "theme_color": "#3367D6",
      "description": "Audio recorder"
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    },
    devOptions: {
      enabled: false,
      type: "module"
    }
  },

  runtimeConfig: {
    public: {
      apiBase: ''
    }
  },
  compatibilityDate: '2025-08-04',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 5,
  }
})
