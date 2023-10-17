import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/

import { dependencies } from './package.json';
import * as path from 'path'

//const vendorChunks = ['react', 'react-router-dom', 'react-dom', 'react-bootstrap', 'bootstrap', 'react-helmet-async'];
const ignoredChunks = ['@tauri-apps/api'];

function renderChunks(deps: Record<string, string>) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (ignoredChunks.includes(key)) return;
    //if (vendorChunks.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}


export default defineConfig({

  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '~react-toastify': path.resolve(__dirname, 'node_modules/react-toastify'),
      '~react-tabulator': path.resolve(__dirname, 'node_modules/react-tabulator'),
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
