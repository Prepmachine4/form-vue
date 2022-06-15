<template>
  <div class="box">
    <div class="card">
      <el-form class="form">
        <el-row :gutter="10">
          <el-col :span="5"><span>发布状态:</span></el-col>
          <el-col :span="15">
            <el-tag v-if="editable" type="success">正在发布</el-tag>
            <el-tag v-else type="danger">已截止</el-tag>
          </el-col>
          <el-col v-if="editable&&form.category==='问卷型'" :span="4"><el-button @click="stopPublish" type="danger">停止发布</el-button></el-col>
        </el-row>
        <br>
        <el-row :gutter="10">
          <el-col :span="5"><span>普通链接:</span></el-col>
          <el-col :span="13"><el-input v-model="url" :placeholder="url" disabled></el-input></el-col>
          <el-col :span="3"><el-button  @click="copy">复制</el-button></el-col>
          <el-col :span="3"><el-button type="success" :disabled="!editable" @click="edit">填写</el-button></el-col>
        </el-row>
        <br>
        <el-row :gutter="10">
          <el-col :span="4"><span>二维码:</span></el-col>
          <el-col :span="16"><qrcode-vue :value="url" :size="size" level="H"/>
          </el-col>
        </el-row>
        <br><br>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter,} from "vue-router";
import useClipboard from 'vue-clipboard3'
import QrcodeVue from 'qrcode.vue'
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import axios from 'axios'
import moment from "moment";
import {ElMessage} from "element-plus";
let drawer = ref(false)
const route = useRoute()
const router = useRouter()
const store=useStore()
let userInfo = store.state.userInfo
let _id = route.query._id
let url = location.protocol+'//'+location.host+`/#/form/write?_id=${_id}`

console.log(location.protocol)
let size = 200
let form=ref()
let editable=ref(false)
const emits=defineEmits(["published"])

onMounted(()=>{
  axios.get(`/form/${_id}`).then(res=>{
    form.value=res.data
    editable.value=route.query.categorty==='业务型'||(new Date()<=new Date(form.value.setting.end_time))
    emits("published",editable.value)
  })
})

const copy = () => {
  const { toClipboard } = useClipboard()
  toClipboard(url).then(_=>{
    ElMessage.success("复制成功")
  })

}

const edit = () => {
  router.push(`/form/write?_id=${_id}`)
}

// 停止发布
const stopPublish = () => {
  let old=moment().format('YYYY-MM-DD HH:mm:ss')
  let setting={end_time:old}
  axios.post(`/form/setting/${_id}`,setting).then(res=>{
    editable.value=false
    ElMessage.success("停止发布成功")
  })
}
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .card {
    padding: 30px 0px;
    display: flex;
    width: 50%;
    background-color: white;
    justify-content: center;
    align-items: center;
    .form {
      width: 60%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>