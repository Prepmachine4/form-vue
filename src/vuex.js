import { createStore } from 'vuex'
import axios from "axios";
// Create a new store instance.
const store = createStore({
    state:{
        statusMap:{
            0:'创建',
            1:'设计',
            2:'发布'
        },
        userInfo:JSON.parse(localStorage.getItem('user')),
        formList:[],
    },
    mutations: {
        setUserInfo(state,value){
            state.userInfo=value
        },
        removeUserInfo(state){
            state.userInfo={}
        },
        setFormLiSt(state,value){
            state.formList=value
        }
    },
    actions:{
        getFormList({commit},user_id){
            axios.get(`/form/forms/${user_id}`).then(res=>{
                commit("setFormLiSt",res.data)

            })
        }
    }
})
export {
    store
}