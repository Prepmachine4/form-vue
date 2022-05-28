<template>
  <div class="box">
    <el-table @row-click="showData" :data="tableData" stripe border style="width: 100%">
      <el-table-column type="index"  />
      <el-table-column prop="user.email"  label="用户邮箱"  />
      <el-table-column prop="user.name"  label="用户姓名"  />
      <el-table-column prop="user.deptName"  label="用户部门"  />
      <el-table-column prop="create_time" sortable label="填写时间"  />
      <el-table-column    label="审核结果" >
        <template #default="scope">
          <el-tag effect="dark" type="success" v-if="scope.row['audit_success']">{{ '审核通过' }}</el-tag>
          <el-tag effect="dark" type="info" v-else>{{ '正在审核' }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer size="45%" v-model="drawer" :with-header="false" >
      <div style="text-align: center;" slot="header" v-if="form.category==='业务型'" v-html="statusSvg"></div>
      <Data :change="false" :form-id="form_id" v-if="drawer" :enable-edit="false" :form-data="formData"></Data>
      <el-divider>审核内容</el-divider>
      <el-form style="margin: 0 30px" v-for="item in selectItem['audit_history']" >
        <el-row >
          <el-col :span="12"><el-form-item label="审核人"><div v-html="item.user_name"></div></el-form-item></el-col>
          <el-col :span="12"><el-form-item label="审批意见"><span>{{item.opinion}}</span></el-form-item></el-col>
        </el-row>
        <el-row >
          <el-col :span="12"><el-form-item label="审批时间"><span>{{item.createTime}}</span></el-form-item></el-col>
          <el-col :span="12"><el-form-item label="审批结果"><span>
              <el-tag effect="dark" type="success" v-if="item.result">{{ '通过' }}</el-tag>
              <el-tag effect="dark" type="danger" v-else>{{ '拒绝' }}</el-tag>
            </span>
          </el-form-item></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><el-form-item label="签名"><el-image  :src="item.sign"></el-image></el-form-item></el-col>
        </el-row>
        <el-divider border-style="dashed"></el-divider>
      </el-form>
      <vue-bpmn  v-show="false" product="flowable" :xml="selectItem['process_xml']"  @getStatusSvg="getStatusSvg" ></vue-bpmn>
    </el-drawer>
  </div>
</template>

<script setup>
import axios from "axios";
import VueBpmn from "@/components/bpmn/VueBpmn";
import {reactive, ref} from "vue";
import {useRoute} from "vue-router";
import Data from "./Data";

let tableData=ref([])
const route=useRoute()
let formData=ref('')
let statusSvg=ref(``)
let drawer = ref(false)
let selectItem=ref()
let form=ref()
let form_id= route.params.form_id.toString()
axios.get(`/data/forms/${route.params.form_id}`).then(res=>{
  let data=res.data
  tableData.value=data
})
const showData = (row, column, event) => {
  axios.get(`/form/${form_id}`).then(res=>{
    form.value=res.data


    selectItem.value=row
    formData.value=row.data
    drawer.value = true
  })
}
const getStatusSvg = (svg) => {
  svg=svg.split('\n')[3]
  statusSvg.value=svg
  console.log(statusSvg.value)
}
</script>

<style scoped lang="scss">
.box{
  background-color: white;
  padding: 20px;
}
</style>