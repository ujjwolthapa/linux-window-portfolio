import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'apples-macbook-pro-1.tail3df8ae.ts.net',
      'localhost',
      '127.0.0.1',
      '0.0.0.0'
    ],
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173,
    strictPort: false, // Allow different port if 5173 is taken
    open: false, // Don't auto-open browser
    hmr: {
      host: 'apples-macbook-pro-1.tail3df8ae.ts.net', // Use Tailscale host for HMR
      protocol: 'ws',
      port: 5173
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 5173
  }
})
