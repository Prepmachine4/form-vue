import axios from "axios";
let userInfo=JSON.parse(localStorage.getItem('user'))
// 查询部门列表
export function listDept(query) {
  return axios({
    url: '/system/dept/list/'+(userInfo['enterprise_id']?userInfo['enterprise_id']:"abc"),
    method: 'get',
  })
}

// 查询部门详细
export function getDept(deptId) {
  return axios({
    url: '/system/dept/' + deptId,
    method: 'get'
  })
}
// 新增部门
export function addDept(data) {
  return axios({
    url: '/system/dept/'+(userInfo['enterprise_id']?userInfo['enterprise_id']:"abc"),
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept(data) {
  return axios({
    url: '/system/dept',
    method: 'put',
    data: data
  })
}

// 删除部门
export function delDept(deptId) {
  return axios({
    url: '/system/dept/' + deptId,
    method: 'delete'
  })
}

// 查询部门下拉树结构
export function treeselect() {
  return axios({
    url: '/system/dept/treeselect/'+(userInfo['enterprise_id']?userInfo['enterprise_id']:"abc"),
    method: 'get'
  })
}

// 根据角色ID查询部门树结构
export function roleDeptTreeselect(roleId) {
  return axios({
    url: '/system/dept/roleDeptTreeselect/' + roleId,
    method: 'get'
  })
}

