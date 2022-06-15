<template>
  <div class="box">
    <el-card class="card">
      <template #header>
        <div class="card-header"><span>{{ formStruct.name }}</span></div>
      </template>
      <span style="font-weight: bold">共有{{ dataList.length }}人填写</span>
      <div v-for="(_,index) in titleList.length" class="item">
        <span>{{titleList[index].title}}<span style="color: #8c939d">[{{titleList[index].type=='radio'?'单选':'多选' }}]</span></span>
        <el-table :data="questionList[index]" border style="width: 100%">
          <el-table-column prop="option" label="选项"/>
          <el-table-column prop="count" label="小计"/>
          <el-table-column label="比例">
            <template #default="scope">
              <el-progress :percentage="scope.row.percentage"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import axios from 'axios'

const store = useStore()
const router = useRouter()
const route = useRoute()
let formStruct = ref({})
let dataList = ref([])
let titleList=ref([
])
let questionList = ref([
])

const struct = computed(() => JSON.parse(formStruct.value['struct']))

function getQuestionItem(options,index){
  let res=[]
  let title=titleList.value[index]
  options.optionItems.forEach(item=>{
    let value=item['value']
    let count=(title.options.filter(it=>it[value]!==undefined))[0][value]
    let percentage=Math.round(count/dataList.value.length * 10000) / 10000 *100
    res.push({
      option: item['label'],
      count,
      percentage,
    })
  })
  return res
}
async function init() {
  formStruct.value = JSON.parse((await axios.get(`/form/${route.query._id}`)).data.struct)
  dataList.value = (await axios.get(`/data/forms/${route.query._id}`)).data
  formStruct.value["widgetList"].forEach((item, index) => {
    if (item.type == "radio"||item.type == "checkbox") {
      let before=formStruct.value["widgetList"][index-1]
      let options=[]
      item.options.optionItems.forEach(it=>{
        let tmp={}
        tmp[it.value]=0
        options.push(tmp)
      })
      titleList.value.push({title:before.options.textContent, type:item.type,name:before.options.name,options})
    }
  })
   // 构造数据
  dataList.value.forEach(item=>{
    let data=JSON.parse(item['data'])
    let index=0
    for (let key in data) {
      let value=data[key]
      if(key.startsWith("radio")){
        titleList.value[index].options.forEach(it=>{
          if(it[value]!==undefined)  it[value]=it[value]+1
        })
      }
      else if(key.startsWith("checkbox")){
        console.log(titleList.value[index].options)
        value.forEach(t=>{
          titleList.value[index].options.forEach(it=>{
            if(it[t]!==undefined)  it[t]=it[t]+1
          })
        })
      }
      index+=1
    }
  })
  //  构造questionList
  formStruct.value["widgetList"].filter(item=>item.type == "radio"||item.type == "checkbox").forEach((item,index) => {
    questionList.value.push(getQuestionItem(item.options,index))
  })


}
init()


</script>

<style scoped lang="scss">
.box {
  .card {
    width: 50%;

    .card-header {
      text-align: center;
      font-size: 25px;
      font-weight: bold;
    }

    .item {
      margin: 40px 10px;
    }
  }

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>