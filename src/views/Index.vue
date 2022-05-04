<template>

  <el-container>
    <el-aside  width="200px">
      <el-menu
          style="height: 100vh;"
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="1"
          text-color="#fff"
      >
        <el-menu-item index="1">
          <el-icon><collection/></el-icon>
          <span>表单管理</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><icon-menu/></el-icon>
          <span>用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="padding: 0">
        <el-menu
            class="header"
            mode="horizontal"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <user-filled/>
              </el-icon>
              {{ user_info.email }}
            </template>
            <el-menu-item index="1-1">个人信息</el-menu-item>
            <el-menu-item index="1-2">退出登录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-main>
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
            <el-input v-model="search" placeholder="搜索内容" />
            <el-button>搜索</el-button>
          </div>
        </div>
        <el-card shadow="always" class="box-card">
          <template #header>
            <div class="card-header">
              <span>表单名称</span>
              <span>表单类型</span>
              <span>表单状态</span>
              <span>创建时间</span>
              <span>创建人</span>
              <span>操作</span>
            </div>
          </template>
          <div  v-for="item in formList" :key="item._id" class="item">
            <span>{{ item.name }}</span>
            <span>{{ item.category }}</span>
            <span>{{ store.state.statusMap[item.status] }}</span>
            <span>{{ item['create_time']}}</span>
            <span>{{ user_info.email }}</span>
            <el-row class="tool-box" :gutter="10">
              <el-col @click="handleTool(0,item)" class="tool-item" :span="6" ><el-icon><icon-view /></el-icon>查看</el-col>
              <el-col @click="handleTool(1,item)" class="tool-item" :span="6" ><el-icon><edit /></el-icon>编辑</el-col>
              <el-col @click="handleTool(2,item)" class="tool-item" :span="6" ><el-icon><histogram /></el-icon>数据</el-col>
              <el-col @click="handleTool(3,item)" class="tool-item" :span="6" ><el-icon><delete /></el-icon>删除</el-col>
            </el-row>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </el-container>

</template>

<script setup>
import {Menu as IconMenu,View as IconView,} from '@element-plus/icons-vue'
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import axios from "axios";
import {computed, ref} from "vue";
import { v4 as uuid } from 'uuid';
const router = useRouter()
const route = useRoute()
const store = useStore()
let user_id = route.params.user_id
let user_info = computed(() => store.state.userInfo)
let formList=computed(() => store.state.formList)
store.dispatch("getFormList",user_id)
let search=ref("")
const toFormCollect = (index) => {
  router.push({name:"",params:{}})
}
const handleCommand = (command) => {
  let category=command
  router.push({name:"design",query:{category}})
}

const handleTool = (index,item) => {
  if(index===0){
    router.push({name:"write",query:{_id:item._id}})
  }
  else if(index===1){
    router.push(`/form/design/${item.status}`)
  }
  else if(index===2){
    router.push({name:"data"})
  }
  else{
  //  删除
    axios.delete(`/form/${user_id}/${item._id}`).then(res=>{
      store.dispatch("getFormList")
    })
  }
}
</script>

<style scoped lang="scss">


.el-container {
  .el-main{
    padding: 0;
  }
  width: 100%;
  height: 100%;
  .header {
    justify-content: right;
  }
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
  .box-card{
    margin: 30px;
    padding: 0 40px;
    .card-header {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .item {
      display: flex;
      border-bottom: 0.5px solid var(--el-border-color);
      .tool-box{
        width: 250px;
        text-align: center;
        .tool-item{
          display: flex;
          align-items: center;
          &:hover{
            color: $app-blue;
          }
        }
      }
      align-items: center;
      justify-content: space-around;
      display: flex;
      height: 60px;
    }
  }
}


</style>