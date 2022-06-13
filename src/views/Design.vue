<template>
  <div class="box">
    <div class="header">
      <el-button @click="back" text :icon="ArrowLeft">返回</el-button>
      <el-steps class="step" :active="active" finish-status="success" simple >
        <el-step  @click="changeTab(0)" title="编辑" :icon="Edit" />
        <el-step  title="设置" :icon="Setting"/>
        <el-step  title="发布" :icon="Upload"/>
      </el-steps>
      <div></div>
    </div>
    <router-view @published="getPublished"></router-view>
  </div>


</template>

<script setup>
import {ref, computed, watch, reactive} from "vue";
import { Edit, Setting, Upload,ArrowLeft} from '@element-plus/icons-vue'
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {ElMessageBox} from "element-plus";


const store=useStore()
const route=useRoute()
const router=useRouter()
let user_info = computed(() => store.state.userInfo)
const active =ref(parseInt(route.path.split('/')[3]))
const published=ref(false)
watch(() =>route.path,(newValue,_)=> {
  active.value=parseInt(newValue.split('/')[3])
},)
const back = () => {
  router.push(`/user/${user_info.value['_id']}`)
}

// 切换到编辑
const changeTab = (index) => {
  if (!published.value) return
  if(active.value===2&&published.value===true){
    ElMessageBox.alert("该表单已发布，可能已存在一些数据，修改结构后系统会对数据进行自动迁移，您确定要修改表单结构吗?","提示").then(res=>{
      active.value=index
      router.replace({name:'design',query:route.query})
    })
  }
  else router.replace({name:'design',query:route.query})
}
const getPublished = (state) => {
  published.value=state
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