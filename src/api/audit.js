import axios from "axios";

//列出用户当前需要审核的列表
export function listNeedAudit(){
    let userInfo=JSON.parse(localStorage.getItem('user'))
    return axios.get(`/audit/list/now/${userInfo._id}`)
}

//列出用户审批历史
export function listAudit(){
    let userInfo=JSON.parse(localStorage.getItem('user'))
    return axios.get(`/audit/list/history/${userInfo._id}`)
}

// 保存审批
export function postAudit(formDataId,data){
    return axios.post(`/audit/${formDataId}`,data)
}