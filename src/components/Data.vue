<template>
  <div class="box">
    <div class="card">
      <span v-if="props.enableEdit" style="width:60%;display: flex;justify-content: right"><el-button @click="onStage">暂存</el-button></span>
      <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef"></v-form-render>
      <el-button v-if="props.enableEdit" type="primary" style="width: 200px" @click="submitForm">提交</el-button>
    </div>
  </div>
</template>

<script setup>

import {ref, reactive, onMounted, computed, nextTick} from 'vue'
import { ElMessage } from 'element-plus'
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import moment from "moment";
const route=useRoute()
const router=useRouter()
const store=useStore()

let formJson = reactive({})
let formData = reactive({})
let optionData = reactive({})
const vFormRef = ref(null)
const props=defineProps(['enableEdit','formData','formId'])
let form_id=route.query._id||props.formId
const userInfo=store.state.userInfo
onMounted(async ()=>{
  let option_data= ""
  formJson= (await axios.get(`/form/${form_id}`)).data.struct
  vFormRef.value.setFormJson(formJson)
  await nextTick(() => {
    if(!props.enableEdit) vFormRef.value.disableForm()
    if(!props.enableEdit) vFormRef.value.setFormData(JSON.parse(props.formData))
    if(props.enableEdit&&localStorage.getItem("formData")) vFormRef.value.setFormData(JSON.parse(localStorage.getItem("formData")))
  })

})
const onStage = () => {
  vFormRef.value.getFormData().then(formData => {
    let data=JSON.stringify(formData)
    localStorage.setItem("formData",data)
  })
}
const submitForm = () => {
  vFormRef.value.getFormData().then(formData => {
    let data=JSON.stringify(formData)
    let user_id=userInfo._id
    let create_time=moment().format('YYYY-MM-DD HH:mm:ss')
    axios.post(`/data/${form_id}`,{form_id,create_time,user_id,data}).then(res=>{
      if(res.status!==200)     ElMessage.error("提交失败！")
      else {
        ElMessage.success("提交成功！")
        router.push(`/user/${user_id}`)
      }
    })
    localStorage.removeItem("formData")
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
    height: 90%;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>