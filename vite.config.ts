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

    define: {
      'process.env': {}
    },

    base: './',

    // mode: (config.mode || process.env.NODE_ENV),

    // publicDir: 'public',

    // cacheDir: 'node_modules/.vite',

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', 'css', 'less', '.json', '.vue', '*']
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            /* 默认样式，【注:这里是用作于全局antdv样式，可自定义修改哦！注：当使用antd.variable.min.css时，这里的设置是无效的哦！】
            * https://www.antdv.com/docs/vue/customize-theme-cn
            'primary-color': `#1890ff`,                         // 全局主色
            'link-color': `#1890ff`,                            // 链接色
            'success-color': `#52c41a`,                         // 成功色
            'warning-color': `#faad14`,                         // 警告色
            'error-color': `#f5222d`,                           // 错误色
            'font-size-base': `14px`,                           // 主字号
            'heading-color': `rgba(0, 0, 0, 0.85)`,             // 标题色
            'text-color': `rgba(0, 0, 0, 0.65)`,                // 主文本色
            'text-color-secondary': `rgba(0, 0, 0, 0.45)`,      // 次文本色
            'disabled-color': `rgba(0, 0, 0, 0.25)`,            // 失效色
            'border-radius-base': `4px`,                        // 组件/浮层圆角
            'border-color-base': ` #d9d9d9`,                    // 边框色
            'box-shadow-base': `0 2px 8px rgba(0, 0, 0, 0.15)`, // 浮层阴影
            *
            */
          },
          javascriptEnabled: true
        }
      }
    },

    server: {
      host: true,
      port: 666,
      strictPort: 888,
      open: true,
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
      outDir: 'dist',   // export path
      target: 'modules',
      assetsDir: 'assets',
      assetsInlineLimit: 360000  // 360kb
    }
  }
});
