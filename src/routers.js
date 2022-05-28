import {createRouter, createWebHashHistory} from 'vue-router'
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import NotFound from "./views/NotFound";
import Index from "./views/Index";
import Tmp from "./views/Tmp";
import Write from "./views/Write";
import Analysis from "./views/Analysis";
import Design from "./views/Design";
import FormDesigner from './components/FormDesigner'
import FormPublish from "./components/FormPublish";
import FormSetting from "./components/FormSetting";
import IndexData from "./components/IndexData";
import IndexForm from "./components/IndexForm";
import profile from "./components/FormPublish";
import UserEdit from "./components/UserEdit";
import UserProfile from "./components/UserProfile";
import {useStore} from "vuex";


const routes = [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    { path: '/auth/login', component: Login,name:'login' },
    { path: '/auth/register', component: Register ,name: 'register'},

    { path: '/user/:user_id', component: Index,children: [
            {path:"",name:'form',component: IndexForm},
            { path: 'data/:form_id',name:'data', component: IndexData },
            { path: 'profile',name:'profile', component: UserProfile },
            { path: 'edit',name:'edit', component: UserEdit },
            { path: 'process',name:'process', component: () => import('@/views/process/design') },
            { path: 'audit',name:'audit', component: () => import('@/views/audit') },
            { path: 'info',name:'info', component: () => import('@/views/info') },
            //    系统管理
            {path: 'system/user',name:'systemUser',component: () => import('@/views/system/user/index')},
            {path: 'system/role',name:'systemRole',component: () => import('@/views/system/role/index')},
            {path: 'system/dept',name:'systemDept',component: () => import('@/views/system/dept/index')},
            {path: 'system/position',name:'systemPosition',component: () => import('@/views/system/post/index')},
        ]},

    { path: '/form/design/', component: Design,children:[
            {path:'0',component:FormDesigner,name: 'design'},
            {path:'1',component:FormSetting,name: 'setting'},
            {path:'2',component:FormPublish,name: 'publish'}
        ]},

    { path: '/form/write',component: Write},
    { path: '/form/analysis',name: 'analysis',component: Analysis},
    { path: '/tmp', component: Tmp },
    {path:'/',redirect:{name:'login'}}


]


const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to,from,next)=>{
    const store=useStore()
    if (to.path.startsWith('/auth')||from.path=='/'||from.path.startsWith('/auth')) {
        next()
    } else {
        let user = localStorage.getItem("user")
        if (!user) {
            next({
                name: 'login'
            })
        } else {
            next()
        }
    }
})
export {
    router
}