import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   base:process.env.VITE_BASE_PATH || "/akhil_intel",
  envPrefix: 'VITE_',
  server: {
    port: 3000,
    open: true
  }
})
