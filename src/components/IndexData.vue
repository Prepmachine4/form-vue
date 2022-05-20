<template>
  <div class="box">
    <el-table @row-click="showData" :data="tableData" stripe border style="width: 100%">
      <el-table-column type="index"  />
      <el-table-column prop="user.email"  label="填写用户"  />
      <el-table-column prop="create_time" sortable label="填写时间"  />
    </el-table>
    <el-drawer size="45%" v-model="drawer" :with-header="false" >
      <Data v-if="drawer" :enable-edit="false" :form-data="formData"></Data>
    </el-drawer>
  </div>
</template>

<script setup>
import axios from "axios";
import {reactive, ref} from "vue";
import {useRoute} from "vue-router";
import Data from "./Data";
let tableData=ref([])
const route=useRoute()
let formData=ref('')
let drawer = ref(false)
axios.get(`/data/forms/${route.params.form_id}`).then(res=>{
  let data=res.data
  tableData.value=data
})
const showData = (row, column, event) => {
  formData.value=row.data
  drawer.value = true
}
</script>

<style scoped lang="scss">
.box{
  background-color: white;
  padding: 20px;
}
</style>