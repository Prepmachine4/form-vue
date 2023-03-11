import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/static/', // 打包后的文件路径
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, './src')
        },
        dedupe: ['vue']

    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: [
                'vue',
                'vue-router',
                {
                    'vuex': ['useStore']
                }
            ],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/assets/global.scss";' // 全局公共样式
            }
        },
        postcss: {
            plugins: [
                {
                    postcssPlugin: 'internal:charset-removal',
                    AtRule: {
                        charset: (atRule) => {
                            if (atRule.name === 'charset') {
                                atRule.remove();
                            }
                        }
                    }
                }
            ],
        },
    },
    optimizeDeps: {
        include: ['@/../lib/vform/designer.umd.js']  //此处路径必须跟main.js中import路径完全一致！
    },
    build: {
        /* 其他build生产打包配置省略 */
        //...
        commonjsOptions: {
            include: /node_modules|lib/
        },

    },
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:13145', // 后台服务器地址
                changeOrigin: true, // 是否改变请求头中的 Origin 字段值，默认为 true
                // rewrite: (path) => path.replace(/^\/api/, ''), // 将请求路径中的 /api 前缀去掉
            },
            '/static': {
                target: 'http://127.0.0.1:13145', // 后台服务器地址
                changeOrigin: true, // 是否改变请求头中的 Origin 字段值，默认为 true
            },
        },
    },
})
