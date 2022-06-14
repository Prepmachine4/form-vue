<template>
  <div class="common-layout">
    <el-container style="background-color: white;padding: 30px">
      <el-header class="header" >初始化企业系统引导程序</el-header>
      <el-main class="card" >
        <el-form ref="form" style="width: 50%" :rules="rules" :model="data">
          <el-form-item prop="name" label="企业名称">
            <el-input v-model="data.name"> </el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="data.email" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="data.password" />
          </el-form-item>
          <el-form-item label="部门员工" prop="fileList">
            <el-tag v-for="file in data.fileList">{{file.name}}</el-tag>
            <el-button v-if="data.fileList.length===0" @click="handleImport">导入</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer style="text-align: center">
        <el-button type="success" @click="commit">开始初始化</el-button>
      </el-footer>
    </el-container>
  </div>

  <!-- 用户导入对话框 -->
  <el-dialog :title="upload.title" v-model="upload.open" width="400px" append-to-body>
    <el-upload
        :file-list="data.fileList"
        ref="uploadRef"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip text-center">
          <span>仅允许导入xls、xlsx格式文件。</span>
        </div>
      </template>
    </el-upload>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="upload.open = false">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>



<script setup>
import {reactive, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
import {getUser} from "@/api/system/user";
import {useRouter} from "vue-router";
const uploadRef = ref()
const form = ref()
const router=useRouter()
const data=reactive({
  name:"",
  email:"",
  password:"",
  fileList:[]
})
const rules=reactive({
  name: {required:true},
  email:{required:true},
  password:{required:true},
  fileList:{required:true},
})
/*** 用户导入参数 */
const upload = reactive({
  // 是否显示弹出层（用户导入）
  open: false,
  // 弹出层标题（用户导入）
  title: "",
  // 是否禁用上传
  isUploading: false,
})
/** 导入按钮操作 */
function handleImport() {
  upload.title = "用户导入";
  upload.open = true;
};
/**文件上传中处理 */
const handleFileUploadProgress = (event, file, fileList) => {
  upload.isUploading = true;
};

/** 文件上传成功处理 */
const handleFileSuccess = (response, file, fileList) => {
  upload.open = false;
  upload.isUploading = false;
  uploadRef.value.clearFiles();
  ElMessage.success("系统初始化成功")
  router.replace({name:'login',query:{email:data.email}})
};
const commit = () => {
  form.value.validate(valid => {
    if (valid) {
      axios.post("/user/register",{
        email: data.email,
        password:data.password,
        type:'企业',
        name:data.name
      }).then((res) => {
        if (res.status !== 200) {
          ElMessage.error(res.data.message)
          return
        }
        axios.post("/user/login",{email:data.email,password:data.password}).then((res) => {
          let _id = res.data['user_info']._id
          localStorage.setItem("token",res.data.token)
          getUser(_id).then(res=>{
            let user=res.data
            upload.url= axios.defaults.baseURL + "/system/user/batch/"+user.enterprise_id
            upload.headers={ Authorization: "Bearer " + res.data.token },

            uploadRef.value.submit()
          })
        })

      })
    }
  })

}
</script>

<style scoped lang="scss">
.common-layout{
  height: 100%;
  padding: 100px 400px;
  display: flex;
  justify-items: center;
  .header{
    text-align: center;
    font-size: 30px;
  }
  .card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>