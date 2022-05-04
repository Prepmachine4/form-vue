<template>
    <div class="box">
      <div class="card">
        <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef"></v-form-render>
        <el-button type="primary" style="width: 200px" @click="submitForm">提交</el-button>
      </div>
    </div>
</template>

<script setup>

import {ref, reactive, onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
const route=useRoute()
const router=useRouter()
const store=useStore()
let form_id=route.query._id
let formJson = reactive({})
const formData = reactive({})
const optionData = reactive({})
const vFormRef = ref(null)
//没登录先登录
if(!store.state.userInfo._id){
  router.push({name:"login"})
}
const userInfo=store.state.userInfo
onMounted(()=>{
  axios.get(`/form/${form_id}`).then(res=>{
    let data=res.data
    vFormRef.value.setFormJson(data.struct)
  })
})
const submitForm = () => {
  vFormRef.value.getFormData().then(formData => {
    console.log(JSON.stringify(formData))
    let data=JSON.stringify(formData)
    let user_id=userInfo._id
    axios.post(`/data/${form_id}`,{form_id,user_id,data}).then(res=>{
      if(res.status!==200)     ElMessage.error("提交失败！")
      else {
        ElMessage.success("提交成功！")
        router.push(`/user/${user_id}`)
      }
    })
  }).catch(error => {
    // Form Validation failed
    ElMessage.error(error)
  })
}
</script>

<style scoped lang="scss">
.box{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .card{
    flex-direction: column;
    background-color: white;
    width: 60%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>