<template lang="pug">
  .common
    Tab(:tabs="checkTabs")
    component(:is="active")
</template>
<script>
import Tab from '@c/Tab/Tab'
import { StoreManage, UserAdmin } from './Admin/index'


export default {
  name: 'Admin',
  data() {
    return {
      active: 'StoreManage',
      tabs: [
        {
          name: 'StoreManage',
          title: '店家管理'
        },
        {
          name: 'UserAdmin',
          title: '管理員權限'
        }
      ]
    }
  },
  computed: {
    checkTabs() {
      const userData = JSON.parse(localStorage.userData)
      return userData.canModifyAdmin ? this.tabs : this.tabs.slice(0, 1)
    }
  },
  components: {
    Tab,
    StoreManage,
    UserAdmin
  }
}
</script>
<style lang="sass" scoped>
  .common
    padding-top: 0
</style>
