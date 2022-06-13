import axios from "axios";
import {store} from "@/vuex";
// 查询部门列表
export function listDept() {
  let userInfo=JSON.parse(localStorage.getItem('user'))
  return axios({
    url: '/system/dept/list/'+store.state.userInfo['enterprise_id'],
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
  let userInfo=JSON.parse(localStorage.getItem('user'))

  return axios({
    url: '/system/dept/'+store.state.userInfo['enterprise_id'],
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
  let userInfo=JSON.parse(localStorage.getItem('user'))
  return axios({
    url: '/system/dept/treeselect/'+store.state.userInfo['enterprise_id'],
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

