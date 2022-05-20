<template>
   <div class="app-container">
     <el-row :gutter="20">
       <!--部门数据-->
       <el-col :span="4" :xs="24">
         <div class="head-container">
           <el-input
               v-model="search"
               placeholder="请输入部门名称"
               clearable
               prefix-icon="Search"
               style="margin-bottom: 20px"
           />
         </div>
         <div class="head-container">
           <el-tree
               :data="deptOptions"
               :props="{ label: 'label', children: 'children' }"
               :expand-on-click-node="false"
               ref="deptTreeRef"
               default-expand-all
               @node-click="handleNodeClick"
           />
         </div>
       </el-col>
       <!--用户数据-->
       <el-col :span="20" :xs="24">

         <el-row :gutter="10" class="mb8">
           <el-col :span="1.5">
             <el-button
                 type="primary"
                 plain
                 icon="Plus"
                 @click="handleAdd"
                 v-hasPermi="['system:user:add']"
             >添加用户</el-button>
           </el-col>
           <el-col :span="1.5">
             <el-button
                 type="primary"
                 plain
                 icon="Plus"
                 @click="handleAddExist"
                 v-hasPermi="['system:user:add']"
             >关联已有用户</el-button>
           </el-col>
           <el-col :span="1.5">
             <el-button
                 type="warning"
                 plain
                 icon="Download"
                 @click="handleExport"
                 v-hasPermi="['system:user:export']"
             >导出</el-button>
           </el-col>
         </el-row>

         <el-table v-loading="loading" :data="filterTableData" >
           <el-table-column type="index"></el-table-column>
           <el-table-column label="用户邮箱" align="center" key="email" prop="email"  :show-overflow-tooltip="true" />
           <el-table-column label="用户姓名" align="center" key="name" prop="name"  :show-overflow-tooltip="true" />
           <el-table-column  label="部门" align="center" key="deptName" prop="dept.deptName"  :show-overflow-tooltip="true" />
           <el-table-column label="角色" >
             <template #default="scope">
               <el-tag style="margin: 0 2px" v-for="roleId in scope.row.roleIds">{{ getRoleNameById(roleId) }}</el-tag>
             </template>
           </el-table-column>
           <el-table-column label="岗位" >
             <template #default="scope">
               <el-tag style="margin: 0 2px" v-for="postId in scope.row.postIds">{{ getPostNameById(postId) }}</el-tag>
             </template>
           </el-table-column>
           <el-table-column label="手机号码" align="center" key="phone" prop="phone"   />
           <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
             <template #default="scope">
               <el-tooltip content="修改" placement="top" v-if="scope.row._id !== 1">
                 <el-button
                     type="text"
                     icon="Edit"
                     @click="handleUpdate(scope.row)"
                     v-hasPermi="['system:user:edit']"
                 ></el-button>
               </el-tooltip>
               <el-tooltip content="删除" placement="top" v-if="scope.row._id !== 1">
                 <el-button
                     type="text"
                     icon="Delete"
                     @click="handleDelete(scope.row)"
                     v-hasPermi="['system:user:remove']"
                 ></el-button>
               </el-tooltip>
             </template>
           </el-table-column>
         </el-table>

       </el-col>
     </el-row>
      <!-- 添加或修改用户配置对话框 -->
      <el-dialog :title="title" v-model="open" width="600px" append-to-body>
         <el-form :model="form" :rules="rules" ref="userRef" label-width="80px">
           <el-row >
             <el-col :span="12">
               <el-form-item  label="邮箱" prop="email">
                 <el-input :disabled="buttonType===2"  v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
               </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="归属部门" prop="deptId">
                 <el-tree-select
                     v-model="form.deptId"
                     :data="deptOptions"
                     :props="{ value: 'id', label: 'label', children: 'children' }"
                     value-key="id"
                     placeholder="请选择归属部门"
                     check-strictly
                 />
               </el-form-item>
             </el-col>
           </el-row >
           <el-row v-if="!(buttonType===1)">
             <el-col :span="12">
               <el-form-item label="手机号码" prop="phone">
                 <el-input v-model="form.phone" placeholder="请输入手机号码" maxlength="11" />
               </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="用户昵称" prop="nick_name">
                 <el-input v-model="form.nick_name" placeholder="请输入用户昵称" maxlength="30" />
               </el-form-item>
             </el-col>
           </el-row>
           <el-row v-if="!(buttonType===1)">
             <el-col :span="12">
               <el-form-item  label="用户名称" prop="name">
                 <el-input v-model="form.name" placeholder="请输入用户名称" maxlength="30" />
               </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item  v-if="!(buttonType===2)" label="用户密码" prop="password">
                 <el-input v-model="form.password" placeholder="请输入用户密码" type="password" maxlength="20" show-password />
               </el-form-item>
             </el-col>
           </el-row >
            <el-row>
               <el-col :span="12">
                  <el-form-item label="岗位">
                     <el-select v-model="form.postIds" multiple placeholder="请选择">
                        <el-option
                           v-for="item in postOptions"
                           :key="item._id"
                           :label="item.postName"
                           :value="item._id"
                        ></el-option>
                     </el-select>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item label="角色">
                     <el-select v-model="form.roleIds" multiple placeholder="请选择">
                        <el-option
                           v-for="item in roleOptions"
                           :key="item._id"
                           :label="item.roleName"
                           :value="item._id"
                        ></el-option>
                     </el-select>
                  </el-form-item>
               </el-col>
            </el-row>
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

<script setup name="User">
import { treeselect } from "@/api/system/dept";
import {listUser, delUser, getUser, updateUser, addUser, addExistUser} from "@/api/system/user";
import {listRole} from "@/api/system/role";
import {listPost} from "@/api/system/post";
import {useRouter} from "vue-router";
import {getCurrentInstance, reactive, ref, toRefs,computed} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

const router = useRouter();
const { proxy } = getCurrentInstance();

const userList = ref([]);
const open = ref(false);
const loading = ref(true);
const ids = ref([]);

const multiple = ref(true);
const title = ref("");
const dateRange = ref([]);
const deptName = ref("");
const deptOptions = ref(undefined);
const postOptions = ref([]);
const roleOptions = ref([]);
const search=ref("")
const buttonType=ref()




const data = reactive({
  form: {},
  rules: {
    name:[{required:true,message: "请输入用户姓名", trigger: "blur"}],
    nick_name: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
    password: [{ required: true, message: "用户密码不能为空", trigger: "blur" }, { min: 5, max: 20, message: "用户密码长度必须介于 5 和 20 之间", trigger: "blur" }],
    email: [{ required:true,type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
    phone: [{ required:true,pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }]
  }
});

const { form, rules } = toRefs(data);

/** 查询部门下拉树结构 */
function getTreeselect() {
  treeselect().then(response => {
    deptOptions.value = response.data;
  });
};
/** 查询用户列表 */
function getList() {
  loading.value = true;
  listUser().then(res => {
    loading.value = false;
    userList.value = res.data;
  });
};

const filterTableData = computed(() =>
    userList.value.filter(
        data => (!search.value || data.dept.deptName.includes(search.value))
    )
)
/** 节点单击事件 */
function handleNodeClick(data) {
  search.value=data.label
};
const getRoleNameById = (id) => {
  if (roleOptions.value.length===0) return
  return (roleOptions.value.filter(item=>item['_id']===id)[0]).roleName
}
const getPostNameById = (id) => {
  if (postOptions.value.length===0) return
  return (postOptions.value.filter(item=>item['_id']===id)[0]).postName
}
/** 修改按钮操作 */
async function handleUpdate(row) {
  reset();
  initTreeData();
  buttonType.value=2
  const userId = row._id || ids.value;
  let userInfo=await getUser(userId)
  form.value = userInfo.data;
  form.value.postIds = userInfo.data.postIds;
  form.value.roleIds = userInfo.data.roleIds;
  open.value = true;
  title.value = "修改用户";
};
/** 删除按钮操作 */
function handleDelete(row) {
  const userIds = row._id || ids.value;
  ElMessageBox.confirm('是否确认删除用户邮箱为"' + row.email + '"的数据项？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: "warning",
  }).then(function () {
    return delUser(userIds);
  }).then(() => {
    getList();
    ElMessage.success("删除成功");
  }).catch(() => {});
};
/** 导出按钮操作 */
function handleExport() {
  // proxy.download("system/user/export", {
  //   ...queryParams.value,
  // },`user_${new Date().getTime()}.xlsx`);
};
/** 初始化部门数据 */
function initTreeData() {
  // 判断部门的数据是否存在，存在不获取，不存在则获取
  if (deptOptions.value === undefined) {
    treeselect().then(response => {
      deptOptions.value = response.data;
    });
  }
};

/** 重置操作表单 */
function reset() {
  form.value = {
    _id: undefined,
    deptId: undefined,
    name: undefined,
    nick_name: undefined,
    phone:undefined,
    email: undefined,
    postIds: [],
    roleIds: []
  };
};
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
  buttonType.value=undefined
};
/** 新增按钮操作 */
function handleAdd() {
  reset();
  initTreeData();
  buttonType.value=0
  open.value = true;
  title.value = "添加用户";
};
/** 关联已有用户按钮操作 */
function handleAddExist(){
  reset();
  initTreeData();
  buttonType.value=1
  open.value = true;
  title.value = "关联已有用户";

}
/** 提交按钮 */
function submitForm() {
  proxy.$refs["userRef"].validate(valid => {
    if (valid) {
      if (title.value === "修改用户") {
        updateUser(form.value).then(response => {
          ElMessage.success("修改成功");
          open.value = false;
          getList();
        });
      }
      else if(title.value === "关联已有用户"){
        addExistUser(form.value).then(response => {
          ElMessage.success("关联成功");
          open.value = false;
          getList();
        })
      }
      else {
        addUser(form.value).then(response => {
          ElMessage.success("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
};

getTreeselect();
getList();
listPost().then(res=>postOptions.value=res.data);
listRole().then(res=>roleOptions.value=res.data);

</script>
<style scoped lang="scss">
.app-container{
  background-color: white;
  padding: 30px;
}
</style>