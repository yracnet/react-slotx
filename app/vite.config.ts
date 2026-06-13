import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import api from "vite-plugin-api-routes"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    api({
      mode:"isolated"
    })
  ],
})
