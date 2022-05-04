import { createApp } from 'vue'
import {store} from "./vuex";
import {router} from "./routers";
import App from './App.vue'
import axios from 'axios';
import VueAxios from 'vue-axios'

import ElementPlus from 'element-plus'  //引入element-plus库
import 'element-plus/dist/index.css'  //引入element-plus样式
import VForm3 from '@/../lib/vform/designer.umd.js'
import '../lib/vform/designer.style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


// axios.defaults.baseURL="http://127.0.0.1:5000/api/"
axios.defaults.baseURL="http://127.0.0.1:4523/mock/918626"


const app=createApp(App)
    .use(VueAxios,axios)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(VForm3)  //全局注册VForm 3(同时注册了v-form-designer和v-form-render组件)

for (const iconName in ElementPlusIconsVue) {
    if (Reflect.has(ElementPlusIconsVue, iconName)) {
        const item = ElementPlusIconsVue[iconName]
        app.component(iconName, item)
    }
}
app.mount('#app')

