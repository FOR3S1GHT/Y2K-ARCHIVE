import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Deep links such as /closet must resolve on refresh during development.
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  },
})
