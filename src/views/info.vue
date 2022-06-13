<template>
  <div class="app-container">

    <el-table  :data="procList" >
      <el-table-column type="index" align="center"  />删除
      <el-table-column label="流程ID" align="center" prop="_id" />
      <el-table-column label="流程名称" align="center" prop="name" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
              text
              icon="View"
              @click="handleView(scope.row)"
          >查看</el-button>
          <el-button
              text
              icon="Delete"
              @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>

</script>

<style scoped>
.app-container{
  background-color: white;
  padding: 30px;
}
</style>