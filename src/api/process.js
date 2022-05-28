import axios from "axios";
// 查询部门列表
export function listProc(query) {
    let userInfo=JSON.parse(localStorage.getItem('user'))

    return axios({
        url: '/process/list/'+(userInfo['enterprise_id']?userInfo['enterprise_id']:"abc"),
        method: 'get',
    })
}

export function saveProc(data) {
    let userInfo=JSON.parse(localStorage.getItem('user'))

    return axios({
        url: '/process/'+(userInfo['enterprise_id']?userInfo['enterprise_id']:"abc"),
        data,
        method: 'post',
    })
}

export function deleteProc(id) {
    return axios({
        url: '/process/'+id,
        method: 'delete',
    })
}