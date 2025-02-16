import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { plugin as markdown } from 'vite-plugin-markdown'

export default defineConfig({
  base: '/lecture-notes/',
  plugins: [
    react(), 
    markdown({
      mode: 'raw' // or 'html'
    })
  ],
  assetsInclude: ['**/*.md'],
  server: {
    watch: {
      usePolling: true
    }
  }
})
