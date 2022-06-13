<template>
  <div class="box">
    <div class="tool-bar">
      <el-dropdown @command="handleCommand">
        <el-button type="primary">
          新建表单
          <el-icon class="el-icon--right">
            <arrow-down/>
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="问卷型">
              <el-button link v-hasPermi="'002'">问卷型</el-button>
            </el-dropdown-item>
            <el-dropdown-item v-if="store.state.userInfo.enterprise_id" command="业务型">
              <el-button link v-hasPermi="'003'">业务型</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-radio-group ref="myOrGlobal" v-model="formRange" @change="getList()">
        <el-radio :label="0" border>我的创建</el-radio>
        <el-radio :label="1" border>全局表单</el-radio>
      </el-radio-group>


      <div class="search">
        <el-input v-model="search" placeholder="搜索内容" clearable/>
      </div>
    </div>
    <el-table v-hasPermi="'000'" @row-click="showStruct" ref="tableDom" :data="filterTableData">
      <el-table-column prop="name" label="表单名称"/>
      <el-table-column sortable prop="create_time" label="创建时间"/>
      <el-table-column prop="category" label="表单类型"/>
      <el-table-column label="标签" :filter-method="filterTag" :filters="filterTagData">
        <template #default="scope">
          <el-tag v-if="scope.row.setting" style="margin: 0 2px" v-for="tag in scope.row.setting.tags">{{
              tag
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <template v-if="scope.row.category==='问卷型'">
            <el-tag effect="dark" type="danger"
                    v-if="scope.row.setting&&(new Date()>new Date(scope.row.setting.end_time))">已截止
            </el-tag>
            <el-tag effect="dark" type="success" v-else-if="scope.row.setting">已发布</el-tag>
            <el-tag effect="dark" type="info" v-else>正在编辑</el-tag>
          </template>
          <template v-else>
            <el-tag effect="dark" type="success" v-if="scope.row.setting">已发布</el-tag>
            <el-tag effect="dark" type="info" v-else>正在编辑</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button link v-if="myOrGlobal.modelValue===0" v-hasPermi="'004'" @click="handleTool(0,scope.row)">编辑
          </el-button>
          <el-button link v-hasPermi="'001'"
                     :disabled="formRange===1&&scope.row.setting&&!scope.row.setting.look_result"
                     @click="handleTool(1,scope.row)">数据
          </el-button>
          <el-button link v-if="scope.row.category==='问卷型'"
                     :disabled="formRange===1&&scope.row.setting&&!scope.row.setting.look_analysis"
                     @click="handleTool(2,scope.row)">分析
          </el-button>
          <el-button link v-if="scope.row.category==='业务型'" @click.stop="handleTool(3,scope.row)">流程</el-button>
          <el-button link v-if="myOrGlobal.modelValue===0" v-hasPermi="'005'" type="danger"
                     @click.stop="handleTool(4,scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer size="45%" v-model="drawer" :with-header="false">
      <Data :form-data="'{}'" :form-id="selectForm._id" v-if="drawer" :enable-edit="false"></Data>
    </el-drawer>

    <el-dialog v-model="processDialog" top="40vh">
      <div style="display: flex;justify-content: center" slot="header" v-html="processSVG"></div>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";

const route = useRoute()
const router = useRouter()
const store = useStore()
const tableDom = ref()
const formRange = ref(0)
let drawer = ref(false)
let user_id = route.params.user_id
let selectForm = ref()
const formList = ref([])
let search = ref("")
const processDialog = ref(false)
const processSVG = ref()
const myOrGlobal = ref()

const getList = () => {
  if (formRange.value === 0) {
    axios.get(`/form/forms/${user_id}`).then(res => {
      formList.value = res.data
    })
  } else {
    axios.get(`/form/forms/list`).then(res => {
      formList.value = res.data
    })
  }
}


const filterTag = (value, row, column) => {
  return row.setting && row.setting.tags && row.setting.tags.indexOf(value) !== -1
}

const filterTagData = computed(() => {
  let res = []
  formList.value.forEach(item => {
    if (item.setting && item.setting.tags) {
      item.setting.tags.forEach(tag => {
        if (!res.includes(tag)) res.push({text: tag, value: tag})
      })
    }
  })
  return res
})

// 创建表单
const handleCommand = (command) => {
  let category = command
  router.push({name: "design", query: {category}})
}

const filterTableData = computed(() =>
    formList.value.filter(
        (data) => !data.is_template && (!search.value || data.name.includes(search.value))
    )
)
const showStruct = (row, column, event) => {
  selectForm.value = row
  drawer.value = true
}


const handleTool = (index, item) => {
  if (index === 0) {
    if (!item.setting)
      router.push({path: `/form/design/${1}`, query: {_id: item._id, category: item.category}})
    else
      router.push({path: `/form/design/${2}`, query: {_id: item._id, category: item.category}})
  } else if (index === 1) {
    router.push({name: "data", params: {form_id: item._id}})
  } else if (index === 2) {
    //分析
    router.push({name: "analysis", query: {_id: item._id}})
  } else if (index === 3) {
    //流程
    axios.get(`/process/${item.setting.process_id}`).then(res => {
      processSVG.value = res.data.svg

      processDialog.value = true
    })
  } else {
    //  删除
    axios.delete(`/form/${item._id}`).then(res => {
      ElMessage.success("删除成功")
      getList()
    })
  }
}

getList()

</script>
<style scoped lang="scss">
.box :deep(.el-table__row) {
  height: 60px;
}

.box {
  background-color: white;
  padding: 20px;

  .tool-bar {
    .search {
      display: flex;
    }

    padding: 0 30px;
    height: 50px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
