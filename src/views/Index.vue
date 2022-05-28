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
              <el-icon><svg t="1653233716704" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3086" width="200" height="200"><path d="M352 288h-64a32 32 0 0 0 0 64h64a32 32 0 0 0 0-64zM352 416h-64a32 32 0 0 0 0 64h64a32 32 0 0 0 0-64zM352 544h-64a32 32 0 0 0 0 64h64a32 32 0 0 0 0-64zM352 672h-64a32 32 0 0 0 0 64h64a32 32 0 0 0 0-64zM544 288h-64a32 32 0 0 0 0 64h64a32 32 0 0 0 0-64zM544 416h-64a32 32 0 0 0 0 64h64a32 32 0 0 0 0-64zM544 544h-64a32 32 0 0 0 0 64h64a32 32 0 0 0 0-64zM544 672h-64a32 32 0 0 0 0 64h64a32 32 0 0 0 0-64z" fill="" p-id="3087"></path><path d="M960 864h-64v-576a64 64 0 0 0-64-64h-128v-64a64 64 0 0 0-64-64H192a64 64 0 0 0-64 64v704H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64z m-768 0v-704h448v704H192z m512 0v-576h128v576h-128z" fill="" p-id="3088"></path></svg></el-icon>
              <span>企业管理</span>
            </template>
            <el-menu-item index="3-0">用户管理</el-menu-item>
            <el-menu-item index="3-1">角色管理</el-menu-item>
            <el-menu-item index="3-2">部门管理</el-menu-item>
            <el-menu-item index="3-3">岗位管理</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="4">
            <el-icon><svg t="1653233801039" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4096" width="200" height="200"><path d="M960 480H615.8L512 376.2 408.2 480H128V224h160v96h640V64H288v96H64v384h344.2L512 647.8 615.8 544H896v256H768v-96H128v256h640v-96h192V480zM352 128h512v128H352V128z m352 768H192V768h512v128z" fill="#ffffff" p-id="4097"></path></svg></el-icon>
            <span>流程管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon><svg t="1653228590322" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3062" width="16" height="16"><path d="M812 618.5H692c-6.9-4.8-13.4-10.3-19.3-16.4-24.5-25.2-26-46.8-25.5-54.9l0.1-5.6v-0.2c0-2.4 3.9-13.9 13.7-30.6 3.7-6.3 7.6-12.5 11.7-18.6 8.9-13.5 18.6-26.7 28.6-39.3 35-41.7 54.2-94.8 54.2-149.4 0-127.8-103-232.8-234.5-239h-17.9c-132.1 6.2-235.7 111.2-235.7 239 0.1 54.9 19.5 108.2 54.6 150.2l1.8 2.3c9.6 12.2 18.7 24.8 27.4 37.7 17.5 26.6 24.6 44.4 24.4 47.6v5.7c0.5 8-0.9 29.2-24.2 54l-1.4 1.4c-5.5 5.7-11.9 11.2-19.2 16.2H211.2c-79.9-0.1-115.5 31.2-115.5 101.4v156.2c0 22.1 8.6 42.9 24.3 58.6 15.7 15.5 36.4 24.2 58.4 24.2l666.2-1.4c45.6-0.2 82.5-37.1 82.5-82.7V720c0.1-70.2-35.4-101.6-115.1-101.5zM156.9 876.2V720.1c0-18.9 2.4-27.8 8.9-32.9 7-5.4 19.8-7.6 45.4-7.6h138l7.4-4.8c13.6-8.5 26.2-18.6 37.5-30 39.8-41 43.9-80.9 42.8-101.3 0.8-20.9-9.6-46-34.5-83.9a630.37 630.37 0 0 0-33.7-46c-25.7-31-39.8-70-39.9-110.3 0-95 77.3-173.1 175.9-177.8h14.8c98 4.7 174.7 82.7 174.7 177.7 0 40.4-14.3 79.5-40.2 110.5-11.4 14.3-22.3 29.2-32.4 44.4-4.7 7.1-9.2 14.4-13.5 21.8-16 27.6-22.6 46.6-22 63.6-1.1 20.3 3 60.2 42.7 101.2 11.3 11.5 23.9 21.6 37.5 30.2l7.6 4.8h138.5c49 0 53.6 7.1 53.6 40.3v154.8c0 5.7-2.2 11.1-6.3 15.2-4 4-9.5 6.3-15.2 6.3l-666.2 1.4c-5.7 0-11.2-2.2-15.2-6.3-3.9-3.9-6.1-9.4-6.2-15.2z m0 0" p-id="3063" fill="#ffffff"></path><path d="M351 767.6h321.7v61.3H351z" p-id="3064" fill="#ffffff"></path></svg></el-icon>
            <span>审核管理</span>
          </el-menu-item>
<!--          <el-menu-item index="6">-->
<!--            <el-icon><Bell /></el-icon>-->
<!--            <span>通知管理</span>-->
<!--          </el-menu-item>-->
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
              <el-menu-item index="1-1">退出登录</el-menu-item>
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
  else if(index==='5') router.replace({name:'audit'})
  else if(index==='6') router.replace({name:'info'})

}
const headerSelect = (index) => {
  if(index=='1-1'){
    localStorage.removeItem("user")
    localStorage.removeItem('token')
    router.replace({name:'login'})
  }
}

store.dispatch("getFormList",user_info.value._id)
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