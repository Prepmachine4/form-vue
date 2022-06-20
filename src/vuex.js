import { createStore } from 'vuex'
import axios from "axios";
import {getUserMenuIds} from "@/api/system/user";
// Create a new store instance.
const store = createStore({
    state:{
        userInfo:JSON.parse(localStorage.getItem('user')),
        menuIds:[]
    },
    mutations: {
        setUserInfo(state,value){
            state.userInfo=value
        },
        setMenuIds(state,value){
            state.menuIds=value
        }
    },
    actions:{
        getMenuIds({commit},user_id){
            return getUserMenuIds(user_id).then(res=>{
                commit("setMenuIds",res.data)

            })
        }
    }
})
export  {
    store
}