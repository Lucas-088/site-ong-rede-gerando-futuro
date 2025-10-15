import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sobre: resolve(__dirname, 'sobre.html'),
        projetos: resolve(__dirname, 'projetos.html'),
        voluntariado: resolve(__dirname, 'voluntariado.html'),
        doacoes: resolve(__dirname, 'doacoes.html'),
        transparencia: resolve(__dirname, 'transparencia.html'),
        blog: resolve(__dirname, 'blog.html'),
        contato: resolve(__dirname, 'contato.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
      }
    }
  }
})