<template>
  <v-form-designer :banned-widgets="['color','html-text','button','time-range','date-range','textarea','alert']" :formTemplates="formTemplates" ref="vfdRef">
    <span slot="customToolButtons" class="tool">
      <el-button @click="clear">清空</el-button>
      <el-button @click="preview">预览</el-button>
      <el-button @click="save(true)" type="primary" class="empty">保存为模板</el-button>
      <el-button @click="save(false)" type="primary" class="empty">保存</el-button>
    </span>
  </v-form-designer>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {ElMessage} from "element-plus";
import moment from "moment";

const vfdRef = ref(null)
const store = useStore()
const router = useRouter()
const route = useRoute()
const formTemplates =ref( [
  {
    title: '问卷调查表',
    imgUrl: 'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t7.png',
    jsonUrl: 'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/json7.txt',
    description: '表单模板详细说明...'
  },
   {
    title: '出差审批表',
    imgUrl: 'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t1.png',
    jsonUrl: axios.defaults.baseURL +'/form/template/0',
    description: '表单模板详细说明...'
  },

  {
    title: '设备购买申请表',
    imgUrl: 'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t2.png',
    jsonUrl: axios.defaults.baseURL +'/form/template/1',
    description: '表单模板详细说明...'
  },
  {
    title: '请假申请表',
    imgUrl: 'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t3.png',
    jsonUrl: axios.defaults.baseURL +'/form/template/2',
    description: '表单模板详细说明...'
  },
  {
    title: '意见调查表',
    imgUrl: 'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t4.png',
    jsonUrl: axios.defaults.baseURL +'/form/template/3',
    description: '表单模板详细说明...'
  },
  {
    title: '信息采集表',
    imgUrl: 'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t5.png',
    jsonUrl: axios.defaults.baseURL +'/form/template/4',
    description: '表单模板详细说明...'
  },
  {
    title: '签到表',
    imgUrl: 'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t6.png',
    jsonUrl: axios.defaults.baseURL +'/form/template/5',
    description: '表单模板详细说明...'
  },

])
let user_info = computed(() => store.state.userInfo)



function init() {
  vfdRef.value.setFormJson({
    "widgetList": [{
      "key": 54006,
      "type": "static-text",
      "icon": "static-text",
      "formItemFlag": false,
      "options": {
        "name": "statictext97702",
        "columnWidth": "200px",
        "hidden": false,
        "textContent": "表单名称",
        "customClass": [],
        "onCreated": "",
        "onMounted": "",
        "label": "static-text"
      },
      "id": "statictext97702"
    }, {
      "key": 84381,
      "type": "divider",
      "icon": "divider",
      "formItemFlag": false,
      "options": {
        "name": "divider52630",
        "label": "",
        "columnWidth": "200px",
        "direction": "horizontal",
        "contentPosition": "center",
        "hidden": false,
        "customClass": "",
        "onCreated": "",
        "onMounted": ""
      },
      "id": "divider52630"
    }],
    "formConfig": {
      "modelName": "formData",
      "refName": "vForm",
      "rulesName": "rules",
      "labelWidth": 80,
      "labelPosition": "left",
      "size": "",
      "labelAlign": "label-left-align",
      "cssCode": "",
      "customClass": [],
      "functions": "",
      "layoutType": "PC",
      "jsonVersion": 3,
      "onFormCreated": "",
      "onFormMounted": "",
      "onFormDataChange": ""
    }
  })
}

onMounted(() => {
  //获取模板
  axios.get(`/form/forms/${user_info.value._id}`).then(res => {
    let formList=res.data.filter((item)=>item.is_template)
    formList.forEach(item=>{
      let form_id=item._id
      formTemplates.value.unshift({
        title: item.name,
        jsonUrl: `${axios.defaults.baseURL}/form/struct/${form_id}`,
      },)
    })
  })

  //如果有结构就加载
  if (route.query._id){
    axios.get(`/form/${route.query._id}`).then(res=>{
      vfdRef.value.setFormJson(JSON.parse(res.data.struct))
    })
    return
  }
  init()
})

const clear = () => {
  vfdRef.value.clearDesigner()
  init()
}
const preview = () => {
  vfdRef.value.previewForm()
}
const save = (is_template) => {
  const status = parseInt(route.path.split('/')[3])
  let category = route.query.category
  let struct = JSON.stringify(vfdRef.value.getFormJson())
  console.log(struct)
  let name = vfdRef.value.getFormJson().widgetList[0].options.textContent
  let create_time = moment().format('YYYY-MM-DD HH:mm:ss')

  if (route.query._id){
  //  修改
    axios.put(`/form`, {_id:route.query._id,struct, name}).then(res => {
      if (res.status !== 200) return
      let query=route.query
      ElMessage({
        message: '修改成功',
        type: 'success',
      })
      if(!is_template) router.push({path: `/form/design/${status + 1}`, query})
    })
  }
  else {
    axios.post(`/form/${user_info.value._id}`, {struct, is_template, category, name, create_time}).then(res => {
      if (res.status !== 200) return
      let query=route.query
      let _id = res.data._id
      query['_id']=_id
      ElMessage({
        message: '保存成功',
        type: 'success',
      })
      if(!is_template) router.push({path: `/form/design/${status + 1}`, query})
    })
  }
}
</script>

<style scoped>

</style>