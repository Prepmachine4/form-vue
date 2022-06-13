<template>
   <div class="app-container">
      <el-row :gutter="10" class="mb8">
         <el-col :span="1.5">
            <el-button
               type="primary"
               plain
               icon="Plus"
               @click="handleAdd"
               v-hasPermi="'1022'"
            >新增</el-button>
         </el-col>
      </el-row>

      <el-table v-hasPermi="'1021'" v-loading="loading" :data="postList" >
         <el-table-column type="index" align="center"  />删除
         <el-table-column label="岗位编码" align="center" prop="postCode" />
         <el-table-column label="岗位名称" align="center" prop="postName" />
         <el-table-column label="岗位排序" align="center" prop="postSort" />
         <el-table-column label="创建时间" align="center" prop="createTime" width="180">
            <template #default="scope">
               <span>{{ scope.row.createTime }}</span>
            </template>
         </el-table-column>
         <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button
                   link
                  icon="Edit"
                  @click="handleUpdate(scope.row)"
                  v-hasPermi="'1023'"
               >修改</el-button>
               <el-button
                   link
                   type="danger"
                  icon="Delete"
                  @click="handleDelete(scope.row)"
                  v-hasPermi="'1024'"
               >删除</el-button>
            </template>
         </el-table-column>
      </el-table>

      <!-- 添加或修改岗位对话框 -->
      <el-dialog :title="title" v-model="open" width="500px" append-to-body>
         <el-form ref="postRef" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="岗位名称" prop="postName">
               <el-input v-model="form.postName" placeholder="请输入岗位名称" />
            </el-form-item>
            <el-form-item label="岗位编码" prop="postCode">
               <el-input v-model="form.postCode" placeholder="请输入编码名称" />
            </el-form-item>
            <el-form-item label="岗位顺序" prop="postSort">
               <el-input-number v-model="form.postSort" controls-position="right" :min="0" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
               <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
            </el-form-item>
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="submitForm">确 定</el-button>
               <el-button @click="cancel">取 消</el-button>
            </div>
         </template>
      </el-dialog>
   </div>
</template>

<script setup name="Post">
import {getCurrentInstance, reactive, ref, toRefs} from "vue";
import { listPost, addPost, delPost, getPost, updatePost } from "@/api/system/post";
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";
const { proxy } = getCurrentInstance();

const postList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  rules: {
    postName: [{ required: true, message: "岗位名称不能为空", trigger: "blur" }],
    postCode: [{ required: true, message: "岗位编码不能为空", trigger: "blur" }],
    postSort: [{ required: true, message: "岗位顺序不能为空", trigger: "blur" }],
  }
});

const {  form, rules } = toRefs(data);

/** 查询岗位列表 */
function getList() {
  loading.value = true;
  listPost().then(response => {
    postList.value = response.data;
    loading.value = false;
  });
}
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
/** 表单重置 */
function reset() {
  form.value = {
    _id: undefined,
    postCode: undefined,
    postName: undefined,
    postSort: 0,
    remark: undefined
  }
}


/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加岗位";
}
/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const postId = row._id || ids.value;
  getPost(postId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改岗位";
  });
}
/** 删除按钮操作 */
function handleDelete(row) {
  const postIds = row._id || ids.value;
  ElMessageBox.confirm('是否确认删除岗位名称为"' + row.postName + '"的数据项？', "系统提示", {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: "warning",
  }).then(function() {
    return delPost(postIds);
  }).then(() => {
    getList();
    ElMessage.success("删除成功");
  }).catch(() => {});
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs["postRef"].validate(valid => {
    if (valid) {
      if (form.value._id != undefined) {
        updatePost(form.value).then(response => {
          ElMessage.success("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addPost(form.value).then(response => {
          ElMessage.success("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

getList();
</script>
<style scoped lang="scss">
.app-container{
  background-color: white;
  padding: 30px;
}
</style>