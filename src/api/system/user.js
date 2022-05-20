import axios from "axios";
let userInfo=JSON.parse(localStorage.getItem('user'))
// 查询用户列表
export function listUser(query) {
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
  return axios({
    url: '/system/user/'+(userInfo['enterprise_id']?userInfo['enterprise_id']:"abc"),
    method: 'post',
    data: data
  })
}

// 关联用户
export function addExistUser(data) {
  return axios({
    url: '/system/user/'+(userInfo['enterprise_id']?userInfo['enterprise_id']:"abc"),
    method: 'put',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return axios({
    url: '/system/user',
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


// 查询用户个人信息
export function getUserProfile() {
  return axios({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return axios({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}


// 查询授权角色
export function getAuthRole(userId) {
  return axios({
    url: '/system/user/authRole/' + userId,
    method: 'get'
  })
}

// 保存授权角色
export function updateAuthRole(data) {
  return axios({
    url: '/system/user/authRole',
    method: 'put',
    params: data
  })
}
