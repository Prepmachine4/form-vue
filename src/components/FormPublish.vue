<template>
  <div class="box">
    <div class="card">
      <el-form class="form">
        <el-row :gutter="10">
          <el-col :span="5"><span>发布状态:</span></el-col>
          <el-col :span="15">
            <el-tag v-if="publishState" type="success">正在发布</el-tag>
            <el-tag v-else type="danger">已截止</el-tag>
          </el-col>
          <el-col :span="4"><el-button @click="stopPublish" type="danger">停止发布</el-button></el-col>
        </el-row>
        <br>
        <el-row :gutter="10">
          <el-col :span="5"><span>普通链接:</span></el-col>
          <el-col :span="16"><el-input v-model="url" :placeholder="url" disabled></el-input></el-col>
          <el-col :span="3"><el-button :disabled="!publishState" @click="edit">填写</el-button></el-col>
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
import QrcodeVue from 'qrcode.vue'
import {useStore} from "vuex";
import {computed, onMounted, reactive, ref} from "vue";
import axios from 'axios'
import moment from "moment";
let drawer = ref(false)
const route = useRoute()
const router = useRouter()
const store=useStore()
let userInfo = store.state.userInfo
let _id = route.query._id
let url = `https://ustbxwt.com/static/index.html#/form/write?_id=${_id}`
let size = 200
let setting=reactive({
  end_time:'2022-06-06 16:00:54'
})
let publishState=computed(()=>new Date()<=new Date(setting.end_time))

onMounted(()=>{
  axios.get(`/form/${_id}`).then(res=>{
    let data=res.data
    setting.end_time=data.setting.end_time
  })
})

const edit = () => {
  router.push(`/form/write?_id=${_id}`)
}


const stopPublish = () => {
  let old=moment().format('YYYY-MM-DD HH:mm:ss')
  let loads={setting:{end_time:old}}
  axios.put(`/form/setting/${_id}`,loads).then(res=>{
    setting.end_time=old
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
    display: flex;
    width: 50%;
    height: 50%;
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