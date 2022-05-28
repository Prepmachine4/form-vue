import axios from "axios";
// 查询用户列表
export function listUser(query) {
  let userInfo=JSON.parse(localStorage.getItem('user'))

  return axios({
    url: '/system/user/list/'+(userInfo['enterprise_id']?userInfo['enterprise_id']:"abc"),
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(userId) {
  return axios({
    url: '/system/user/' + userId,
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  let userInfo=JSON.parse(localStorage.getItem('user'))

  return axios({
    url: '/system/user/'+(userInfo['enterprise_id']?userInfo['enterprise_id']:"abc"),
    method: 'post',
    data: data
  })
}

// 关联用户
export function addExistUser(data) {
  let userInfo=JSON.parse(localStorage.getItem('user'))
  return axios({
    url: '/system/user/'+(userInfo['enterprise_id']?userInfo['enterprise_id']:"abc"),
    method: 'put',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return axios({
    url: '/user/profile',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId) {
  return axios({
    url: '/system/user/' + userId,
    method: 'delete'
  })
}

// 查询用户菜单权限表
export function getUserMenuIds(userId) {
  return axios({
    url: '/system/user/menu/' + userId,
    method: 'get'
  })
}






