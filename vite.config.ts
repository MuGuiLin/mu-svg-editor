import { resolve } from 'path'
import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
// export default defineConfig({
export default defineConfig((config: UserConfig) => {
  return {
    plugins: [
      vue({
        // https://cn.vuejs.org/guide/extras/reactivity-transform.html#explicit-opt-in
        reactivityTransform: true
      }),
      jsx({
        transformOn: true,
        mergeProps: true,
      })
    ],

    // base: '/',

    // mode: (config.mode || process.env.NODE_ENV),

    // publicDir: 'public',

    // cacheDir: 'node_modules/.vite',

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', 'css', 'less', '.json', '.vue', '*']
    },

    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@import "@nutui/nutui/dist/styles/variables.scss"; @import "src/themes/global.scss";`
    //     }
    //   }
    // },

    server: {
      host: true,
      port: 666,
      strictPort: 888,
      open: false,
      https: false,
      proxy: {
        '/api': {
          target: 'https://www.xxx.com',
          cors: true,
          changeOrigin: true,
          rewrite(path) {
            return path.replace(/^\/api/, '')
          },
        }
      }
    },

    build: {
      outDir: 'dist',
      target: 'modules',
      assetsDir: 'assets',
      assetsInlineLimit: 360000
    }
  }
});
