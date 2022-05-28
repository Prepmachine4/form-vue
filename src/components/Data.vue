<template>
  <div class="box">
    <div class="card">
      <span v-if="props.enableEdit" style="width:60%;display: flex;justify-content: right"><el-button @click="onStage">暂存</el-button></span>
      <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData"
                     ref="vFormRef"></v-form-render>
      <el-button v-if="props.change" type="primary" style="width: 200px" @click="changeForm">修改</el-button>
      <el-button v-if="props.enableEdit" type="primary" style="width: 200px" @click="submitForm">提交</el-button>
    </div>
  </div>
</template>

<script setup>

import {ref, reactive, onMounted, computed, nextTick} from 'vue'
import {ElMessage} from 'element-plus'
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import moment from "moment";

const route = useRoute()
const router = useRouter()
const store = useStore()

let formJson = reactive({})
let formData = reactive({})
let optionData = reactive({})
const vFormRef = ref(null)
const form=ref()


const props = defineProps({
      enableEdit: {type: Boolean, default: true},
      formData: String,
      formId: String,
      formDataId: String,
      change:{type: Boolean, default: false},
    }
)
let form_id = route.query._id || props.formId
const userInfo = store.state.userInfo
onMounted(async () => {
  let option_data = ""
  form.value=(await axios.get(`/form/${form_id}`)).data
  formJson = form.value.struct
  vFormRef.value.setFormJson(formJson)
  await nextTick(() => {
    if (localStorage.getItem("formData")) vFormRef.value.setFormData(JSON.parse(localStorage.getItem("formData")))
    else if (props.formData) vFormRef.value.setFormData(JSON.parse(props.formData))

    if (!props.change) vFormRef.value.disableForm()

  })

})
const onStage = () => {
  vFormRef.value.getFormData().then(formData => {
    let data = JSON.stringify(formData)
    localStorage.setItem("formData", data)
  })
}
const submitForm = () => {
  vFormRef.value.getFormData().then(formData => {
    let data = JSON.stringify(formData)
    let user_id = userInfo._id
    let create_time = moment().format('YYYY-MM-DD HH:mm:ss')
    axios.post(`/data/${form_id}`, {create_time, user_id, data}).then(res => {
      if (res.status !== 200) ElMessage.error("提交失败！")
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

const changeForm = () => {
  vFormRef.value.getFormData().then(formData => {
    let data = JSON.stringify(formData)
    let user_id = userInfo._id
    console.log(props)
    axios.put(`/data/${props.formDataId}`, {data}).then(res => {
      if (res.status !== 200) ElMessage.error("提交失败！")
      else {
        ElMessage.success("提交成功！")
      }
    })
  })
}
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    flex-direction: column;
    background-color: white;
    width: 60%;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>