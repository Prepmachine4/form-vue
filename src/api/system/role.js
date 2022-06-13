import axios from "axios";
import {store} from "@/vuex";

// 查询角色列表
export function listRole(query) {
    return axios({
        url: '/system/role/list/' + store.state.userInfo['enterprise_id'],
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
    return axios({
        url: '/system/role/' + store.state.userInfo['enterprise_id'],
        method: 'post',
        data: data
    })
}

// 修改角色
export function updateRole(data) {
    data['enterprise_id'] = store.state.userInfo['enterprise_id']
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


