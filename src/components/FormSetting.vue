<template>
  <div class="box">
    <div class="card">
      <el-form class="form">
        <el-form-item label="发布截止时间">
          <el-date-picker v-model="setting.end_time" type="datetime" placeholder="选择发布截止时间"/>
        </el-form-item>
        <el-button @click="save" type="primary" class="empty">保存</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {reactive} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
import {computed} from "vue";
import {useStore} from "vuex";
const route=useRoute()
const router=useRouter()
const store=useStore()
let user_info = computed(() => store.state.userInfo)
const setting=reactive({
  end_time:""
})
const save = () => {
  const status =parseInt(route.path.split('/')[3])
  let _id=route.query._id
  axios.post(`/form/${user_info.value._id}`,{_id,setting}).then(res=>{
    if(res.status!==200) return
    ElMessage({
      message: '保存成功',
      type: 'success',
      duration: 2000,
    })
    router.push({path:`/form/design/${status+1}`,query:{_id}})
  })
}
</script>

<style scoped lang="scss">
.box{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .card{
    display: flex;
    width: 50%;
    height: 50%;
    background-color: white;
    justify-content: center;
    align-items: center;
    .form{
      display: flex;
      flex-direction: column;

    }
  }
}

</style>