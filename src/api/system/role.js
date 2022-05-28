import axios from "axios";
// 查询角色列表
export function listRole(query) {
  let userInfo=JSON.parse(localStorage.getItem('user'))

  return axios({
    url: '/system/role/list/'+(userInfo['enterprise_id']?userInfo['enterprise_id']:"abc"),
    method: 'get',
    params: query
  })
}

// 查询角色详细
export function getRole(roleId) {
  return axios({
    url: '/system/role/' + roleId,
    method: 'get'
  })
}

// 新增角色
export function addRole(data) {
  let userInfo=JSON.parse(localStorage.getItem('user'))

  return axios({
    url: '/system/role/'+(userInfo['enterprise_id']?userInfo['enterprise_id']:"abc"),
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  let userInfo=JSON.parse(localStorage.getItem('user'))
  data['enterprise_id']=userInfo['enterprise_id']?userInfo['enterprise_id']:"abc"
  return axios({
    url: '/system/role',
    method: 'put',
    data: data
  })
}

// 角色数据权限
export function dataScope(data) {
  return axios({
    url: '/system/role/dataScope',
    method: 'put',
    data: data
  })
}

// 删除角色
export function delRole(roleId) {
  return axios({
    url: '/system/role/' + roleId,
    method: 'delete'
  })
}


