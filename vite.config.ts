import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/devstats/', // Relative path for GitHub Pages compatibility
  build: {
    outDir: 'dist', // Output directory
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Entry point
      },
      output: {
        entryFileNames: 'script.js', // Output JavaScript filename
        chunkFileNames: '[name].js', // Dynamic chunks
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'style.css' // Output CSS filename
          }
          return '[name].[ext]'
        },
      },
    },
  },
})
