import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Matches GitHub repository name Samu_Electricals
  base: process.env.NODE_ENV === 'production' ? '/Samu_Electricals/' : './',
})
