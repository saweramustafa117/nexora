import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Vercel injects vars into process.env at build time.
  // loadEnv also reads local .env files for development.
  const fileEnv = loadEnv(mode, process.cwd(), '')
  const apiKey = (process.env.VITE_OPENROUTER_API_KEY || fileEnv.VITE_OPENROUTER_API_KEY || '').trim()
  const model = (process.env.VITE_OPENROUTER_MODEL || fileEnv.VITE_OPENROUTER_MODEL || 'openrouter/free').trim()

  return {
    plugins: [react(), tailwindcss()],
    // Explicitly bake env into the client bundle (reliable on Vercel)
    define: {
      __NEXORA_OPENROUTER_KEY__: JSON.stringify(apiKey),
      __NEXORA_OPENROUTER_MODEL__: JSON.stringify(model),
    },
  }
})
