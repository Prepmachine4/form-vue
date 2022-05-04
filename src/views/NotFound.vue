<template>
  <div class="box">
    <div class="title">您找的页面不存在！</div>
    <div class="icon"><img src="/404.png"></div>
  </div>
</template>

<script>
export default {
  name: "404"
}
</script>

<style scoped lang="scss">
.box{
  background-color: rgba(100, 149, 237, 0.96);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title{
    font-size: 70px;
    font-weight: bold;
  }
}
</style>