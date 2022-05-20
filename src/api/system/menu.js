import axios from "axios";

// 查询菜单列表
export function listMenu(query) {
  return axios({
    url: '/system/menu/list',
    method: 'get',
    params: query
  })
}

// 查询菜单详细
export function getMenu(menuId) {
  return axios({
    url: '/system/menu/' + menuId,
    method: 'get'
  })
}

// 查询菜单下拉树结构
export function treeselect() {
  let tree=[
    {
      "id": "1",
      "label": "系统管理",
      "children": [
        {
          "id": "100",
          "label": "用户管理",
          "children": [
            {
              "id": "1001",
              "label": "用户查询"
            },
            {
              "id": "1002",
              "label": "用户新增"
            },
            {
              "id": "1003",
              "label": "用户修改"
            },
            {
              "id": "1004",
              "label": "用户删除"
            },
          ]
        },
        {
          "id": "101",
          "label": "角色管理",
          "children": [
            {
              "id": "1008",
              "label": "角色查询"
            },
            {
              "id": "1009",
              "label": "角色新增"
            },
            {
              "id": "1010",
              "label": "角色修改"
            },
            {
              "id": "1011",
              "label": "角色删除"
            },

          ]
        },
        {
          "id": "102",
          "label": "部门管理",
          "children": [
            {
              "id": "1017",
              "label": "部门查询"
            },
            {
              "id": "1018",
              "label": "部门新增"
            },
            {
              "id": "1019",
              "label": "部门修改"
            },
            {
              "id": "1020",
              "label": "部门删除"
            }
          ]
        },
        {
          "id": "103",
          "label": "岗位管理",
          "children": [
            {
              "id": "1021",
              "label": "岗位查询"
            },
            {
              "id": "1022",
              "label": "岗位新增"
            },
            {
              "id": "1023",
              "label": "岗位修改"
            },
            {
              "id": "1024",
              "label": "岗位删除"
            },

          ]
        }
      ]
    }
  ]
  return new Promise(resolve => resolve(tree))
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
  return axios({
    url: '/system/role/' + roleId,
    method: 'get'
  })
}

// 新增菜单
export function addMenu(data) {
  return axios({
    url: '/system/menu',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(data) {
  return axios({
    url: '/system/menu',
    method: 'put',
    data: data
  })
}

// 删除菜单
export function delMenu(menuId) {
  return axios({
    url: '/system/menu/' + menuId,
    method: 'delete'
  })
}