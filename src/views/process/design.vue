<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <div class="toolbar">
          <el-button type="primary" @click="procDialogVisible = true">添加流程</el-button>
        </div>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="procList" >
      <el-table-column type="index" align="center"  />删除
      <el-table-column label="流程ID" align="center" prop="_id" />
      <el-table-column label="流程名称" align="center" prop="name" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
              type="text"
              icon="View"
              @click="handleView(scope.row)"
          >查看</el-button>
          <el-button
              type="text"
              icon="Delete"
              @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog top="5vh" title="流程图" v-model="procDialogVisible" width="80vw" >
      <vue-bpmn  product="flowable"  @getStatusSvg="getStatusSvg" @processSave="processSave"></vue-bpmn>
    </el-dialog>

    <el-dialog  title="流程图" v-model="svgDialogVisible" >
      <div style="text-align: center" v-html="svgData"></div>
    </el-dialog>
  </div>
</template>

<script setup>
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import VueBpmn from "@/components/bpmn/VueBpmn";

import {defineComponent, ref} from "vue";
import {deleteProc, listProc, saveProc} from "@/api/process";
import {ElMessage} from "element-plus";
defineComponent([VueBpmn])
const procDialogVisible=ref(false)
const svgDialogVisible=ref(false)
const loading = ref(true);
const svgData = ref("");
const procList=ref([])


function getList() {
  loading.value = true;
  listProc().then(response => {
    procList.value = response.data;
    loading.value = false;
  });
}

//保存流程图
const processSave = (data) => {
  const {name,procId,svgStr,xmlStr} =data
  let svg=svgStr.split('\n')[3]
  console.log(svg)
  saveProc({name,xml:xmlStr,svg}).then(res=>{
    ElMessage.success("保存成功")
    getList()
  })
  procDialogVisible.value=false

}

const getStatusSvg = (svg) => {

  console.log(svg)
}

const handleView = (row) => {
  svgData.value=row.svg
  svgDialogVisible.value=true
}
const handleDelete = (row) => {
  deleteProc(row._id).then(res=>{
    ElMessage.success("删除成功")
    getList()
  })
}
getList()
</script>

<style scoped lang="scss">
.app-container{
  background-color: white;
  padding: 30px;
}
</style>