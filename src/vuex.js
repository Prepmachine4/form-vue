import { createStore } from 'vuex'
import axios from "axios";
import {getUserMenuIds} from "@/api/system/user";
// Create a new store instance.
const store = createStore({
    state:{
        userInfo:JSON.parse(localStorage.getItem('user')),
        formList:[],
        menuIds:[]
    },
    getters:{
        formLabels(state){
            let res=[]
            state.formList.forEach(item=>{
                if (item.setting&&item.setting.tags){
                    item.setting.tags.forEach(tag=>{
                        if (!res.includes(tag)) res.push({ text: tag, value: tag })
                    })
                }
            })
            return res
        }
    },
    mutations: {
        setUserInfo(state,value){
            state.userInfo=value
        },
        setFormList(state,value){
            state.formList=value
        },
        setMenuIds(state,value){
            state.menuIds=value
        }
    },
    actions:{
        getFormList({commit},user_id){
            axios.get(`/form/forms/${user_id}`).then(res=>{
                commit("setFormList",res.data)
            })
        },
        getMenuIds({commit},user_id){
            getUserMenuIds(user_id).then(res=>{
                commit("setMenuIds",res.data)
            })
        }
    }
})
export {
    store
}