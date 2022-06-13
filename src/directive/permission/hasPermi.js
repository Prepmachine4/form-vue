
import {store}  from '@/vuex'

export default {
    mounted(el, binding, vnode) {
        const {value} = binding
        const user=store.state.userInfo
        const menuIds=store.state.menuIds
        if(!user.enterprise_id||user.enterprise_id==user._id) return;

        const hasPermissions = menuIds.includes(value)
        if (!hasPermissions) {
            el.parentNode&&el.parentNode.removeChild(el)
        }

    }
}
