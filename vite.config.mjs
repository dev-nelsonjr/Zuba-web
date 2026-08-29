import { fileURLToPath } from 'node:url'
import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const src = fileURLToPath(new URL('./src', import.meta.url))

const jsxInJs = {
  name: 'jsx-in-js',
  enforce: 'pre',
  transform(code, id) {
    if (!id.includes('/src/') || !id.endsWith('.js')) return null

    return transformWithOxc(code, id, {
      lang: 'jsx',
      jsx: {
        runtime: 'automatic',
      },
    })
  },
}

export default defineConfig({
  plugins: [
    jsxInJs,
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'named',
        namedExport: 'ReactComponent',
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      '~': src,
    },
  },
  optimizeDeps: {
    entries: ['index.html'],
    rolldownOptions: {
      moduleTypes: {
        '.js': 'jsx',
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupVitest.js',
  },
})
