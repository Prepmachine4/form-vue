<template>
  <div class="box">
    <el-form
        label-width="100px"
        :model="data"
        :rules="rules"
        class="card"
        ref="form"
    >
      <el-form-item  label="邮箱">
        <el-input disabled v-model="data.email" />
      </el-form-item>
      <el-form-item  label="姓名" prop="name">
        <el-input  v-model="data.name" />
      </el-form-item>
      <el-form-item  label="昵称" prop="nick_name">
        <el-input  v-model="data.nick_name" />
      </el-form-item>
      <el-form-item  label="手机号" prop="phone">
        <el-input  v-model="data.phone" />
      </el-form-item>
      <el-form-item  prop="password" label="更改密码">
        <el-input v-model="data.password" type="password" />
      </el-form-item>
      <el-form-item  prop="rePassword" label="确认密码">
        <el-input v-model="data.rePassword" type="password"/>
      </el-form-item>
      <el-form-item >
        <el-button @click="save" style="width: 100%;margin: 0px 70px" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script  setup>
import {computed, reactive, ref} from 'vue'
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
import axios from "axios";
import {getUser, updateUser} from "@/api/system/user";
const store=useStore()
const userInfo=computed(()=>store.state.userInfo)
const data = reactive({
  _id:userInfo.value._id,
  email: userInfo.value.email,
  nick_name: userInfo.value.nick_name,
  name: userInfo.value.name,
  phone: userInfo.value.phone,
  password: undefined,
  rePassword: undefined,
})
const form=ref()
const rules=reactive({
  name: {required:true},
  nick_name: {required:true},
  phone: [{ required:true,pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }],
})
const save = () => {
  form.value.validate(valid=>{
    if (valid){
      if(data.password!=data.rePassword) {ElMessage.error("密码不一致");return}
      updateUser(data).then(res=>{
        if(res.status===200) {
          ElMessage.success("保存成功")
          getUser(store.state.userInfo._id).then(res=>{
            let user=res.data
            localStorage.setItem("user", JSON.stringify(user))
            store.commit("setUserInfo",user)
          })
        }
      })
    }
  })
}
</script>
<style scoped lang="scss">
.box{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .card{
    padding: 30px 60px;
    width: 40%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}


</style>