import {useStore} from "vuex";

const store = useStore()

export default {
    mounted(el, binding, vnode) {
        const {value} = binding
        const user=store.state.userInfo
        const menuIds=store.state.menuIds
        console.log(menuIds)
        if(user.enterprise_id==user._id) return

        if (value && value instanceof Array && value.length > 0) {
            const nodeIds = value

            const hasPermissions = menuIds.includes(nodeIds)
            if (!hasPermissions) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error(`请设置操作权限标签值`)
        }
    }
}
