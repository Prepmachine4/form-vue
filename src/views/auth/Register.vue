<template>
  <div class="box">
    <el-card shadow="hover" class="card" :body-style="{height:'60%'}">
      <template #header>
        <div  class="card-header">
          <span style="font-size: 25px;font-weight: bold">注册</span>
        </div>
      </template>
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          class="form"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item label="账号类型">
          <el-radio-group v-model="ruleForm.type">
            <el-radio label="个人" />
            <el-radio label="企业" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-button @click="register" type="primary" size="large" style="width: 200px" >注册</el-button>
    </el-card>
  </div>

<!--  <div className="login-container">-->
<!--    <div className="content">-->
<!--      <div className="title"><span>注册</span></div>-->
<!--      <div className="input-container">-->
<!--        <input v-model="email" type="text" name="username" placeholder="邮箱">-->
<!--        <input v-model="password" type="password" name="password" placeholder="密码">-->
<!--      </div>-->
<!--      <div className="submit">-->
<!--        <el-button @click="register" style="width: 200px" round size="large" type="primary">注册</el-button>-->

<!--        <router-link to="login" style="margin-top: 10px">已有账户&#45;&#45;登录</router-link>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup>
import {reactive, ref} from "vue";
import axios from "axios";
import {useRouter} from 'vue-router'
import {useStore} from "vuex";
import {ElMessage} from "element-plus";

const router = useRouter()
const store=useStore()

const ruleForm = reactive({
  email: 'Hello',
  password:'',
  type:'个人'
})

const rules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})
const register = () => {
  axios.post("/register",ruleForm).then((res) => {
    if (res.status !== 200) return
    ElMessage({
      message: '注册成功',
      type: 'success',
      duration: 1000,
      onClose: () => {
        router.replace({name:'login',query:{email:ruleForm.email}})
      }
    })
  })
}

</script>

<style scoped lang="scss">
.box{
  .card{
    width: 30%;
    height: 50%;
    .form{
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 30px;
      justify-content: center;
    }
  }
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>