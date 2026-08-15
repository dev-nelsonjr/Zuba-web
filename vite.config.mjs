import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv, transformWithOxc } from 'vite'
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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
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
    define: {
      'process.env.REACT_APP_API_ENV': JSON.stringify(env.REACT_APP_API_ENV),
      'process.env.REACT_APP_CUSTOM_URL': JSON.stringify(
        env.REACT_APP_CUSTOM_URL
      ),
    },
  }
})
