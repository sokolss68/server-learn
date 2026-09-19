import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5015',                    // Your backend server URL
        changeOrigin: true,                                 // Changes the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''),      // Removes '/api' from the forwarded request path
      },
   },
  }
})
