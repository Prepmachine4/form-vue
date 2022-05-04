<template>
  <div class="box">
    <div class="header">
      <el-button @click="back" type="text" :icon="ArrowLeft">表单名称</el-button>
      <el-steps class="step" :active="active" finish-status="success" simple>
        <el-step title="编辑" :icon="Edit" />
        <el-step title="设置" :icon="Setting"/>
        <el-step title="发布" :icon="Upload"/>
      </el-steps>
      <div></div>
    </div>
    <router-view ></router-view>
  </div>


</template>

<script setup>
import {ref, computed, watch, reactive} from "vue";
import { Edit, Setting, Upload,ArrowLeft} from '@element-plus/icons-vue'
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";


const store=useStore()
const route=useRoute()
const router=useRouter()
let user_info = computed(() => store.state.userInfo)
const active =ref(parseInt(route.path.split('/')[3]))
watch(() =>route.path,(newValue,_)=> {
  active.value=parseInt(newValue.split('/')[3])
},)
const back = () => {
  console.log(user_info)
  router.push(`/user/${user_info.value['_id']}`)
}
</script>

<style scoped lang="scss">
.box :deep(.right-toolbar .right-toolbar-con){
  text-align: right;
  width: 1000px;
}
.box{
  height: 100%;
}
.header{
  .title{
    font-weight: bold;
  }
  .step{
    background-color: white;
    width: 30%;
    justify-self: center;
  }
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
}
</style>