<template>
  <div class="box">
    <el-table @row-click="showData" :data="tableData" stripe border style="width: 100%">
      <el-table-column type="index"  />
      <el-table-column prop="form.name"  label="填写表单名称"  />
      <el-table-column prop="form.user.email"  label="表单创建人"  />
      <el-table-column prop="form.create_time" sortable label="填写时间"  />
    </el-table>
    <el-drawer size="45%" v-model="drawer" :with-header="false" >
      <Data :form-id="selectFormId" v-if="drawer" :enable-edit="false" :form-data="formData"></Data>
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
let selectFormId=ref()
axios.get(`/data/${route.params.user_id}`).then(res=>{
  let data=res.data
  tableData.value=data
  console.log(tableData.value)
})
const showData = (row, column, event) => {
  formData.value=row.data
  selectFormId.value= row.form._id
  drawer.value = true
}
</script>

<style scoped lang="scss">
.box{
  background-color: white;
  padding: 20px;
}
</style>