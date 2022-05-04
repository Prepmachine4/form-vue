import {createRouter, createWebHashHistory} from 'vue-router'
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import NotFound from "./views/NotFound";
import Index from "./views/Index";
import Tmp from "./views/Tmp";
import Design from "./views/Design";
import  Write from "./views/Write"
import FormDesigner from './components/FormDesigner'
import FormSetting from "./components/FormSetting";
import FormPublish from "./components/FormPublish";


const routes = [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    { path: '/auth/login', component: Login,name:'login' },
    { path: '/auth/register', component: Register ,name: 'register'},

    { path: '/user/:user_id', component: Index,children: [

        ]},

    { path: '/form/design/', component: Design,children:[
            {path:'0',component:FormDesigner,name: 'design'},
            {path:'1',component:FormSetting},
            {path:'2',component:FormPublish}
        ]},

    { path: '/form/write',name:'write', component: Write },

    { path: '/tmp', component: Tmp },
    {path:'/',redirect:{name:'login'}}
]


const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes,
})

export {
    router
}