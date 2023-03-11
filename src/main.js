
import { createApp } from 'vue'
import {store} from "./vuex";
import {router} from "./routers";
import App from './App.vue'
import VueAxios from 'vue-axios'

import ElementPlus from 'element-plus'  //引入element-plus库
import 'element-plus/dist/index.css'  //引入element-plus样式
import VForm3 from '@/../lib/vform/designer.umd.js'
import '../lib/vform/designer.style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel } from '@/utils/ruoyi'
import axios from "axios";
import directive from "./directive";




axios.defaults.validateStatus=function (status) {
    return status < 500 // default
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.common["Authorization"]=`Bearer ${localStorage.getItem("token")}`
    // 加上/api路径
    config.url = `/api${config.url}`;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

const app=createApp(App)
    .use(VueAxios,axios)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(VForm3)  //全局注册VForm 3(同时注册了v-form-designer和v-form-render组件)

directive(app)
for (const iconName in ElementPlusIconsVue) {
    if (Reflect.has(ElementPlusIconsVue, iconName)) {
        const item = ElementPlusIconsVue[iconName]
        app.component(iconName, item)
    }
}

// 全局方法挂载
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel

// 全局配置
// 私有化 or 公有化
app.config.globalProperties.deplolyMethod = 'public'

app.mount('#app')

export default app

