import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
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
        }
    },
})
