import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   base:process.env.VITE_GEMINI_API_KEY || "/akhil_intel",
  envPrefix: 'VITE_',
  server: {
    port: 3000,
    open: true
  }
})
