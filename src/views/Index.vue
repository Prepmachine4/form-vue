<template>
    <el-container>
      <el-aside  width="200px">
        <el-menu @select="selectMenu" style="height: 100vh;" active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="0" text-color="#fff">
          <el-menu-item index="0">
            <el-icon><collection/></el-icon>
            <span>表单管理</span>
          </el-menu-item>
          <el-menu-item index="1">
            <el-icon><edit-pen/></el-icon>
            <span>我的填写</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><setting /></el-icon>
            <span>账户设置</span>
          </el-menu-item>
          <el-sub-menu  index="3">
            <template #title>
              <el-icon><avatar /></el-icon>
              <span>企业管理</span>
            </template>
            <el-menu-item index="3-0">用户管理</el-menu-item>
            <el-menu-item index="3-1">角色管理</el-menu-item>
            <el-menu-item index="3-2">部门管理</el-menu-item>
            <el-menu-item index="3-3">岗位管理</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="4">
            <el-icon><SetUp /></el-icon>
            <span>流程管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon><Bell /></el-icon>
            <span>任务管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="padding: 0">
          <el-menu @select="headerSelect" class="header" mode="horizontal">
            <el-sub-menu  index="1">
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
          <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script setup>
import {EditPen, Menu as IconMenu, View as IconView,} from '@element-plus/icons-vue'
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, ref} from "vue";
const router = useRouter()
const route = useRoute()
const store = useStore()
let user_id = route.params.user_id
let user_info = computed(() => store.state.userInfo)
const selectMenu = (index) => {
  if (index==0) router.replace({name:'form'})
  else if(index==1) router.replace({name:'edit'})
  else if(index==2) router.replace({name:'profile'})
  else if(index[0]==='3'){
    if(index==='3-0') router.replace({name:'systemUser'})
    if(index==='3-1') router.replace({name:'systemRole'})
    if(index==='3-2') router.replace({name:'systemDept'})
    if(index==='3-3') router.replace({name:'systemPosition'})
  }
  else if(index==='4') router.replace({name:'process'})

}
const headerSelect = (index) => {
  if(index=='1-2'){
    localStorage.removeItem("user")
    router.replace({name:'login'})
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

}


</style>