// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import { VitePWA } from 'vite-plugin-pwa';

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       manifest: {
//         name: 'My React App',
//         short_name: 'ReactApp',
//         start_url: '/',
//         display: 'standalone',
//         background_color: '#ffffff',
//         theme_color: '#000000',
//         icons: [
//           {
//             src: 'pwa-192x192.png',
//             sizes: '192x192',
//             type: 'image/png',
//           },
//           {
//             src: 'pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png',
//           },
//         ],
//       },
//     }),
//   ],
// });


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My React App',
        short_name: 'ReactApp',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: 'icon(192).png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon(512).png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:5000', // replace with your backend port
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
    },
    },
  },
})
