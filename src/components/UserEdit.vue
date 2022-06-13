<template>
  <div class="box">
    <div class="search" style="width: 200px">
      <el-input v-model="search" placeholder="搜索内容" clearable/>
    </div>
    <br>
    <el-table @row-click="showData" :data="filterTableData" stripe border style="width: 100%">
      <el-table-column type="index"  />
      <el-table-column prop="form.name"  label="填写表单名称"  />
      <el-table-column prop="form.category" label="表单类型"  />
      <el-table-column  label="标签" :filter-method="filterTag" :filters="filterTagData">
        <template #default="scope">
          <el-tag v-if="scope.row.form.setting" style="margin: 0 2px" v-for="tag in scope.row.form.setting.tags">{{ tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="form.user.email"  label="创建人邮箱"  />
      <el-table-column prop="form.user.name"  label="创建人姓名"  />
      <el-table-column prop="form.create_time" sortable label="填写时间"  />
      <el-table-column    label="审核结果" >
        <template #default="scope">
          <template v-if="scope.row.form.category==='业务型'">
            <el-tag  effect="dark" type="success" v-if="scope.row['audit_success']">{{ '审核通过' }}</el-tag>
            <el-tag effect="dark" type="danger" v-else-if="scope.row['abort']">{{ '已终止' }}</el-tag>
            <el-tag effect="dark" type="info" v-else>{{ '正在审核' }}</el-tag>
          </template>
          <el-tag effect="dark" type="info" v-else>{{ '无需审核' }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer size="45%" v-model="drawer" :with-header="false" >
      <div style="text-align: center;" slot="header" v-if="selectForm.form.category==='业务型'" v-html="statusSvg"></div>
      <Data :formDataId="selectForm._id" :change="change" :form-id="selectFormId" v-if="drawer" :enable-edit="false" :form-data="formData"></Data>
      <el-divider v-if="selectForm.form.category==='业务型'">审核内容</el-divider>
      <el-timeline v-if="selectForm.form.category==='业务型'" style="padding: 0 50px">
        <el-timeline-item center :type="item.result?'success':'danger'" hollow  v-for="item in selectForm['audit_history']" :timestamp="item.createTime" placement="top">
          <el-card>
            <el-form  style="margin: 0 30px"  >
              <el-row >
                <el-col :span="12"><el-form-item label="审核人"><div v-html="item.user_name"></div></el-form-item></el-col>
                <el-col :span="12"><el-form-item label="审批意见"><span>{{item.opinion}}</span></el-form-item></el-col>
              </el-row>
              <el-row >
                <el-col :span="12"><el-form-item label="审批结果"><span>
              <el-tag effect="dark" type="success" v-if="item.result">{{ '通过' }}</el-tag>
              <el-tag effect="dark" type="danger" v-else>{{ '拒绝' }}</el-tag>
            </span>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><el-form-item label="签名"><el-image  :src="item.sign"></el-image></el-form-item></el-col>
              </el-row>
            </el-form>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <vue-bpmn  v-if="selectForm.form.category==='业务型'" v-show="false" product="flowable" :xml="selectForm['process_xml']"  @getStatusSvg="getStatusSvg" ></vue-bpmn>
    </el-drawer>
  </div>
</template>

<script setup>
import VueBpmn from "@/components/bpmn/VueBpmn";
import axios from "axios";
import {computed, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import Data from "./Data";
import {useStore} from "vuex";

const route=useRoute()
const store=useStore()
let selectForm=ref()
let tableData=ref([])
let search=ref("")
let formData=ref('')
let drawer = ref(false)
let selectFormId=ref()
let statusSvg=ref(``)
axios.get(`/data/${route.params.user_id}`).then(res=>{
  let data=res.data
  tableData.value=data
})

// 判断是否修改
const change=computed(()=>{
  if(selectForm.value.form.category!=='业务型') return false
  let index=selectForm.value["audit_history"].length-1
  if(index<0) return false
  return !selectForm.value["audit_history"][index].result
})
const getStatusSvg = (svg) => {
  svg=svg.split('\n')[3]
  statusSvg.value=svg
  console.log(statusSvg.value)
}

const filterTableData = computed(() =>
    tableData.value.filter(
        data => !search.value || data['form'].name.includes(search.value)
    )
)
const showData = (row, column, event) => {
  selectForm.value=row
  formData.value=row.data
  selectFormId.value= row.form._id
  drawer.value = true
}
const filterTag = (value, row, column) => {
  return row.setting&&row.setting.tags&&row.setting.tags.indexOf(value)!==-1
}
const filterTagData=computed(()=>store.getters.formLabels)
</script>

<style scoped lang="scss">
.box{
  background-color: white;
  padding: 20px;
}
</style>