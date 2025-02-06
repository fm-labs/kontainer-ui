import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
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
  resolve: {
    alias: {
      '~react-toastify': path.resolve(__dirname, 'node_modules/react-toastify'),
    },
  },

  plugins: [react()],
  build: {
    sourcemap: true,
    minify: false,
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
