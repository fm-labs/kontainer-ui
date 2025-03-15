import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import { dependencies } from './package.json'
import * as path from 'path'

// https://vitejs.dev/config/

//const vendorChunks = ['react', 'react-router-dom', 'react-dom', 'react-helmet-async'];
const ignoredChunks = []

function renderChunks(deps: Record<string, string>) {
  const chunks = {}
  Object.keys(deps).forEach((key) => {
    if (ignoredChunks.includes(key)) return
    //if (vendorChunks.includes(key)) return;
    chunks[key] = [key]
  })
  return chunks
}

export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  base: './', // this is needed for the app to work in subdirectories

  resolve: {
    alias: {
      '~react-toastify': path.resolve(__dirname, 'node_modules/react-toastify'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
      },
    },
  },

  build: {
    sourcemap: false, // only for debugging
    minify: 'esbuild', // or "terser" (esbuild is faster)
    cssCodeSplit: true, // separate css for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          //vendor: vendorChunks,
          ...renderChunks(dependencies),
        },
      },
    },
  },
})
