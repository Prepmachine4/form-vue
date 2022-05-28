<template>
  <div class="box">
    <Data   :form-data="{}"></Data>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
//没登录先登录
const store=useStore()
const router=useRouter()
if(!localStorage.getItem("user")){
  router.push({name:"login"})
}
</script>

<style scoped lang="scss">
.box{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>