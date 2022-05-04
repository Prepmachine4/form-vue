<template>
  <div class="box">
    <div class="card">
      <el-form class="form">
        <el-row :gutter="10">
          <el-col :span="5"><span>普通链接:</span></el-col>
          <el-col :span="16"><el-input v-model="url" :placeholder="url" disabled></el-input></el-col>
          <el-col :span="3"><el-button @click="edit">填写</el-button></el-col>
        </el-row>
        <br>
        <el-row :gutter="10">
          <el-col :span="4"><span>二维码:</span></el-col>
          <el-col :span="16">          <qrcode-vue :value="url" :size="size" level="H"/>
          </el-col>
        </el-row>
        <br><br>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import QrcodeVue from 'qrcode.vue'
import {useStore} from "vuex";

const route = useRoute()
const router = useRouter()
let userInfo = useStore().state.userInfo
let _id = route.query._id
let url = `http://localhost:3000/#/form/write?_id=${_id}`
let size = 200

const edit = () => {
  router.push(`/form/write?_id=${_id}`)
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