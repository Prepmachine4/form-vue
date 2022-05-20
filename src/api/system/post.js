import axios from "axios";
let userInfo=JSON.parse(localStorage.getItem('user'))
// 查询岗位列表
export function listPost(query) {
  return axios({
    url: '/system/post/list/'+(userInfo['enterprise_id']?userInfo['enterprise_id']:"abc"),
    method: 'get',
    params: query
  })
}

// 查询岗位详细
export function getPost(postId) {
  return axios({
    url: '/system/post/' + postId,
    method: 'get'
  })
}

// 新增岗位
export function addPost(data) {
  return axios({
    url: '/system/post/'+(userInfo['enterprise_id']?userInfo['enterprise_id']:"abc"),
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updatePost(data) {
  return axios({
    url: '/system/post',
    method: 'put',
    data: data
  })
}

// 删除岗位
export function delPost(postId) {
  return axios({
    url: '/system/post/' + postId,
    method: 'delete'
  })
}
