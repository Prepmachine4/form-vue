<template>
  <div class="app-container">
    <el-tabs tab-position="left">
      <el-tab-pane label="等待审批">
        <el-table :data="nowDataList">
          <el-table-column type="index" align="center"/>
          <el-table-column label="业务名称" align="center" prop="form.name"/>
          <el-table-column label="填写人" align="center" prop="user.name"/>
          <el-table-column label="填写者部门" align="center" prop="user.deptName"/>
          <el-table-column label="填写时间" align="center" prop="create_time" width="180"></el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
              <el-button
                  text
                  icon="View"
                  @click="handleAudit(scope.row)"
              >审核
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="审批历史">
        <el-table :data="historyDataList">
          <el-table-column type="index" align="center"/>
          <el-table-column label="业务名称" align="center" prop="form.name"/>
          <el-table-column label="填写人" align="center" prop="user.name"/>
          <el-table-column label="填写者部门" align="center" prop="user.deptName"/>
          <el-table-column label="填写时间" align="center" prop="create_time" width="180"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog top="5vh" title="审核" v-model="dialogVisible" width="80vw">
      <Data :form-id="formId" :enable-edit="false" :form-data="formData"></Data>
      <el-divider>审批意见</el-divider>
      <span style="display: flex;width: 100%;justify-content: center">
        <el-form style="width: 30vw;border: 1px dashed gray;padding: 20px">
          <el-form-item label="意见">
            <el-input v-model="opinion"></el-input>
          </el-form-item>
          <el-form-item required label="签名">
            <vue-esign ref="sign" :isClearBgColor="false" bgColor="#eceef1" :width="300" :height="150" :isCrop="false"
                       :lineWidth="6" lineColor="#000000"/>
          </el-form-item>
        </el-form>
      </span>
      <br>
      <div style="text-align: center">
        <el-button type="info" @click="handleReset">清空</el-button>
        <el-button type="success" @click="onsubmit(true)">通过</el-button>
        <el-button type="danger" @click="onsubmit(false)">不通过</el-button>
      </div>
      <br>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref} from "vue";
import Data from "@/components/Data";
import {listAudit, listNeedAudit, postAudit} from "@/api/audit";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";

const nowDataList = ref([])
const historyDataList = ref([])
const dialogVisible = ref(false)
const formData = ref()
const formId = ref()
const sign = ref()
const opinion = ref('')
const selectRow = ref()
const store = useStore()

const handleAudit = (row) => {
  selectRow.value = row
  formData.value = row.data
  formId.value = row.form._id
  dialogVisible.value = true
}

function getList() {
  listNeedAudit().then(res => nowDataList.value = res.data)
  listAudit().then(res => historyDataList.value = res.data)
}

const handleReset = () => {
  opinion.value = ""
  sign.value.reset()
}

const onsubmit = (result) => {
  //  产生签名图片
  sign.value.generate().then(sign => {
    console.log(sign)
    postAudit(selectRow.value._id, {
      user_id: store.state.userInfo._id,
      index: selectRow.value.audit_user_index,
      opinion: opinion.value,
      sign,
      result
    })
        .then(res => {
          dialogVisible.value = false
          ElMessage.success("审核成功")
          getList()
        })
  })
}
getList()
</script>

<style scoped>
.app-container {
  background-color: white;
  padding: 30px;
}
</style>