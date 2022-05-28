<template>
  <div>
    <vue-esign ref="esign" :isClearBgColor="false" bgColor="#ffffff" :width="300" :height="150" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" v-model:bgColor="bgColor" />
    <button @click="handleReset">清空画板</button>
    <button @click="handleGenerate">生成图片</button>
    <div class="esigh-result">
      <img v-if="resultImg" :src="resultImg" alt="">
    </div>
  </div>
</template>
<script >
import vueEsign from 'vue-esign'
export default {
  data () {
    return {
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '',
      isCrop: false
    }
  },
  components:{vueEsign},
  methods: {
    handleReset () {
      this.$refs.esign.reset()
    },
    handleGenerate () {
      this.$refs.esign.generate().then(res => {
        this.resultImg = res
        console.log(this.resultImg)
      }).catch(err => {
        alert(err) // 画布没有签字时会执行这里 'Not Signned'
      })
    }
  }
}

</script>
<style>

</style>


