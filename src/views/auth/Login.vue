<template>
  <div class="login-container">
    <div class="content">
      <div class="title"><span>登录</span></div>
      <div class="input-container">
        <input v-model="email" type="text" name="email" placeholder="邮箱">
        <input v-model="password" type="password" name="password" placeholder="密码">
      </div>
      <div class="submit">
        <el-button @click="login" style="width: 200px" round size="large" type="primary">登录</el-button>
        <router-link to="register" style="margin-top: 10px">----立即注册----</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter,useRoute} from 'vue-router'
import {ElMessage} from "element-plus";
import {useStore} from "vuex";

const router = useRouter()
const route = useRoute()
const store=useStore()
let email = route.query.email || ref("")
let password = ref("")
const login = () => {

  axios.get("/login").then((res) => {
    if (res.status !== 200) {
      ElMessage({
        message: '邮箱或者密码无效',
        type: 'error',
        duration: 2000,
      })
    }
    let data = res.data
    let user=data['user_info']
    localStorage.setItem("token", data.token)
    store.commit("setUserInfo",user)
    ElMessage({
      message: '登录成功',
      type: 'success',
      duration: 1000,
      onClose: () => {
        router.replace(`/user/${user['_id']}`)
      }
    })
  })
}
</script>

<style scoped>
.submit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  padding: 60px;
  width: 400px;
  height: 200px;
  margin: 0 auto;
  border-radius: 15px;
  box-shadow: 0 10px 50px 0px rgb(59, 45, 159);
  background-color: rgb(95, 76, 194);
}

.login-container {
  background: #59C173; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #5D26C1, #a17fe0, #59C173); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #5D26C1, #a17fe0, #59C173); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
}


.title {
  color: #fff;
  font-size: 18px;
  font-weight: 200;
}

.title span {
  border-bottom: 3px solid rgb(237, 221, 22);
}

.input-container {
  padding: 20px 0;
}

input {
  border: 0;
  background: none;
  outline: none;
  color: #fff;
  margin: 20px 0;
  display: block;
  width: 100%;
  padding: 5px 0;
  transition: .2s;
  border-bottom: 1px solid rgb(199, 191, 219);
}

input:hover {
  border-bottom-color: #fff;
}

::-webkit-input-placeholder {
  color: rgb(199, 191, 219);
}


.regist-container span {
  border-bottom: 3px solid rgb(237, 221, 22);
}


.action-container span {
  border: 1px solid rgb(237, 221, 22);
  padding: 10px;
  display: inline;
  line-height: 20px;
  border-radius: 20px;
  position: absolute;
  bottom: 10px;
  left: calc(72px - 20px);
  transition: .2s;
  cursor: pointer;
}

.action-container span:hover {
  background-color: rgb(237, 221, 22);
  color: rgb(95, 76, 194);
}

</style>