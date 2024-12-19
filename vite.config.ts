
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      protocol: 'wss',
      host: '0.0.0.0',
      clientPort: 443,
      port: 443
    },
    watch: {
      usePolling: true,
      interval: 1000
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['@replit/database'],
    force: true
  },
  esbuild: {
    logLimit: 0,
    logLevel: 'error'
  }
});
