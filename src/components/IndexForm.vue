<template>
  <div class="box">
    <div class="tool-bar">
      <el-dropdown @command="handleCommand">
        <el-button type="primary">
          新建表单<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="问卷型">问卷型</el-dropdown-item>
            <el-dropdown-item command="业务型">业务型</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="search">
        <el-input v-model="search" placeholder="搜索内容" clearable/>
      </div>
    </div>
    <el-table @row-click="showStruct" ref="tableDom" :data="filterTableData" >
      <el-table-column  prop="name" label="表单名称"  />
      <el-table-column  sortable prop="create_time" label="创建时间"  />
      <el-table-column prop="category" label="表单类型"  />
      <el-table-column  label="标签" :filter-method="filterTag" :filters="filterTagData">
        <template #default="scope">
          <el-tag v-if="scope.row.setting" style="margin: 0 2px" v-for="tag in scope.row.setting.tags">{{ tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column  label="状态" >
        <template #default="scope">
          <el-tag effect="dark" type="danger" v-if="scope.row.setting&&(new Date()>new Date(scope.row.setting.end_time))">已截止</el-tag>
          <el-tag effect="dark" type="success" v-else-if="scope.row.setting">已发布</el-tag>
          <el-tag effect="dark" type="info" v-else>正在编辑</el-tag>
        </template>
      </el-table-column>
      <el-table-column  label="操作" >
        <template #default="scope">
          <el-button type="text" @click="handleTool(0,scope.row)">编辑</el-button>
          <el-button type="text" @click="handleTool(1,scope.row)">数据</el-button>
          <el-button v-if="scope.row.category==='问卷型'" type="text" @click="handleTool(2,scope.row)">分析</el-button>
          <el-button v-if="scope.row.category==='业务型'" type="text" @click.stop="handleTool(3,scope.row)">流程</el-button>
          <el-button type="danger" size="small" @click.stop="handleTool(4,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer size="45%" v-model="drawer" :with-header="false" >
      <Data  :form-id="selectForm._id" v-if="drawer" :enable-edit="false"></Data>
    </el-drawer>

    <el-dialog v-model="processDialog" top="40vh">
      <div   style="display: flex;justify-content: center" slot="header"  v-html="processSVG"></div>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";

const route = useRoute()
const router = useRouter()
const store = useStore()
const tableDom=ref()
let drawer = ref(false)
let user_id = route.params.user_id
let selectForm=ref()
const formList=computed(()=>store.state.formList)
let search=ref("")
const processDialog=ref(false)
const processSVG=ref()

const filterTag = (value, row, column) => {
  return row.setting&&row.setting.tags&&row.setting.tags.indexOf(value)!==-1
}
const filterTagData=computed(()=>store.getters.formLabels)


const handleCommand = (command) => {
  let category=command
  router.push({name:"design",query:{category}})
}
const filterTableData = computed(() =>
    formList.value.filter(
        (data) => !data.is_template&&(!search.value || data.name.includes(search.value))
    )
)
const showStruct = (row, column, event) => {
  selectForm.value=row
  drawer.value = true
}


const handleTool = (index,item) => {
  if(index===0){
    if (item.setting)
      router.push({path:`/form/design/${2}`,query:{_id:item._id}})
    else
      router.push({path:`/form/design/${0}`,query:{_id:item._id,category:item.category}})
  }
  else if(index===1){
    router.push({name:"data",params:{form_id:item._id}})
  }
  else if(index===2){
    //分析
    router.push({name:"analysis",query:{_id:item._id}})
  }
  else if(index===3){
    //流程
    console.log(item.setting)
    axios.get(`/process/${item.setting.process_id}`).then(res=>{
      processSVG.value=res.data.svg

      processDialog.value=true
    })

  }
  else{
    //  删除
    axios.delete(`/form/${item._id}`).then(res=>{
      store.dispatch("getFormList",user_id)
    })
  }
}


</script>
<style scoped lang="scss">
.box :deep(.el-table__row){
  height: 60px;
}
.box{
  background-color: white;
  padding: 20px;
  .tool-bar{
    .search{
      display: flex;
    }
    padding: 0 30px;
    height: 50px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
