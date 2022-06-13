<template>
  <div class="box">
    <div class="card">
      <el-form class="form">
        <!--        共有-->
        <el-form-item label="标签">
          <el-tag
              v-for="tag in tags"
              :key="tag"
              class="mx-1"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              style="margin-right: 5px"
          >
            {{ tag }}
          </el-tag>
          <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              style="width: 80px"
              size="small"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
          />
          <el-button v-else size="small" style="width: 80px" @click="showInput">
            添加新标签
          </el-button>
        </el-form-item>

        <!--        问卷型特有-->
        <template v-if="route.query.category==='问卷型'">
          <el-form-item label="可填写用户范围">
            <el-select v-model="setting.user_range" placeholder="请选择">
              <el-option label="所有人" :value="0"/>
              <el-option label="已注册用户" :value="1"/>
              <el-option label="需要秘钥" :value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item label="填写秘钥" v-if="setting.user_range===2">
            <el-input v-model="setting.password" type="password" show-password clearable></el-input>
          </el-form-item>
          <el-form-item label="是否可重复填写">
            <el-radio-group v-model="setting.repeat_edit" size="small">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否可被别人搜索到">
            <el-radio-group v-model="setting.enable_search" size="small">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="填写用户是否可查看别人填写结果">
            <el-radio-group v-model="setting.look_result" size="small">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="填写用户是否可浏览汇总结果">
            <el-radio-group v-model="setting.look_analysis" size="small">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发布截止时间">
            <el-date-picker v-model="setting.end_time" type="datetime" placeholder="选择发布截止时间"/>
          </el-form-item>
        </template>

        <!--        业务型特有-->
        <template v-else>
          <el-form-item label="选择的流程">
            <el-select v-model="setting.process_id" placeholder="请选择业务流程">
              <el-option
                  v-for="item in processOptions"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
              />
            </el-select>
          </el-form-item>
        </template>


        <el-button @click="save" type="primary" class="empty">保存</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {nextTick, reactive, ref, toRef} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
import {computed} from "vue";
import {useStore} from "vuex";
import {listProc} from "@/api/process";
import moment from "moment";

const route = useRoute()
const router = useRouter()
const store = useStore()
let user_info = computed(() => store.state.userInfo)
const processOptions = ref([])
const setting = reactive({
  tags: [],
  end_time: "",
  process_id: undefined,
  user_range: undefined,
  password: undefined,
  repeat_edit: undefined,
  enable_search: undefined,
  look_result: undefined,
  look_analysis: undefined,
})
const inputValue = ref('')
const tags = toRef(setting, "tags")
const inputVisible = ref(false)
const InputRef = ref()

const handleClose = (tag) => {
  tags.value.splice(tags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}
const init = () => {
  listProc().then(res => {
    processOptions.value = res.data
  })
  axios.get(`/form/setting/${route.query._id}`).then(res => {
    let data = res.data
    if (res.data.end_time) setting.end_time = data.end_time
    if (res.data.tags) setting.tags = data.tags
    if (res.data.user_range) setting.user_range = data.user_range
    if (res.data.password) setting.password = data.password
    if (res.data.repeat_edit) setting.repeat_edit = data.repeat_edit
    if (res.data.enable_search) setting.enable_search = data.enable_search
    if (res.data.look_result) setting.look_result = data.look_result
    if (res.data.look_analysis) setting.look_analysis = data.look_analysis
    if (res.data.process_id) setting.process_id = data.process_id
  })

}

const handleInputConfirm = () => {
  if (inputValue.value) {
    tags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

const save = () => {
  if (route.query.category === '业务型') setting.end_time = "2994-09-05 06:03:31"

  const status = parseInt(route.path.split('/')[3])
  let _id = route.query._id
  if(setting.end_time) setting.end_time=moment(setting.end_time).format('YYYY-MM-DD HH:mm:ss')
  axios.post(`/form/setting/${_id}`, setting).then(res => {
    if (res.status !== 200) return
    ElMessage({
      message: '保存成功',
      type: 'success',
      duration: 2000,
    })
    router.push({path: `/form/design/${status + 1}`, query: route.query})
  })
}

init()
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    display: flex;
    width: 50%;
    background-color: white;
    justify-content: center;
    align-items: center;

    .form {
      margin: 50px 0;
      display: flex;
      flex-direction: column;

    }
  }
}

</style>