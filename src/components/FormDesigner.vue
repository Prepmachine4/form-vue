<template>
  <v-form-designer  ref="vfdRef">
    <span slot="customToolButtons" class="tool"  >
      <el-button @click="clear">清空</el-button>
      <el-button @click="preview">预览</el-button>
      <el-button @click="save" type="primary" class="empty">保存</el-button>
    </span>
  </v-form-designer>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {ElMessage} from "element-plus";
const vfdRef = ref(null)
const store=useStore()
const router=useRouter()
const route=useRoute()
let user_info = computed(() => store.state.userInfo)
function init(){
  vfdRef.value.setFormJson({"widgetList":[{"key":54006,"type":"static-text","icon":"static-text","formItemFlag":false,"options":{"name":"statictext97702","columnWidth":"200px","hidden":false,"textContent":"表单名称","customClass":[],"onCreated":"","onMounted":"","label":"static-text"},"id":"statictext97702"},{"key":84381,"type":"divider","icon":"divider","formItemFlag":false,"options":{"name":"divider52630","label":"","columnWidth":"200px","direction":"horizontal","contentPosition":"center","hidden":false,"customClass":"","onCreated":"","onMounted":""},"id":"divider52630"}],"formConfig":{"modelName":"formData","refName":"vForm","rulesName":"rules","labelWidth":80,"labelPosition":"left","size":"","labelAlign":"label-left-align","cssCode":"","customClass":[],"functions":"","layoutType":"PC","jsonVersion":3,"onFormCreated":"","onFormMounted":"","onFormDataChange":""}})
}
onMounted(()=>{
  init()
})

const clear = () => {
  vfdRef.value.clearDesigner()
  init()
}
const preview = () => {
  vfdRef.value.previewForm()
}
const save = () => {
  const status =parseInt(route.path.split('/')[3])
  let category=route.query.category
  let struct=JSON.stringify(vfdRef.value.getFormJson())
  console.log(struct)
  let name=vfdRef.value.getFormJson().widgetList[0].options.textContent
  let create_time=new Date()
  axios.post(`/form/${user_info.value._id}`,{struct,category,name,status,create_time}).then(res=>{
    if(res.status!==200) return
    let _id=res.data._id
    ElMessage({
      message: '保存成功',
      type: 'success',
      duration: 2000,
    })
    router.push({path:`/form/design/${status+1}`,query:{_id}})
  })
}
</script>

<style scoped>

</style>