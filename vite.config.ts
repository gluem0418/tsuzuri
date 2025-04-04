import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // plugins: [
  //   vue({
  //     script: {
  //       propsDestructure: true,
  //     }
  //   })
  // ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: { 'process.env': {} },
  server: {
    host: true,
    // port: 5174,
    proxy: {
      '/api': {
        target: 'https://tsuzuriback.dayes3010.workers.dev',
        changeOrigin: true,
      },
    },
  }
})
