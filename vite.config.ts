import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path baked at build time. Défaut : `/citoyennete/` (production GH Pages).
// Surchargeable via `VITE_BASE_PATH` pour servir l'app à un autre chemin.
const basePath = process.env.VITE_BASE_PATH ?? '/citoyennete/'

export default defineConfig({
  base: basePath,
  plugins: [react()],
})
