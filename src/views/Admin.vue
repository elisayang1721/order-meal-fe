<template lang="pug">
  .common
    Tab(:tabs="tabs")
    component(:is="active")
</template>
<script>
import Tab from '@c/Tab/Tab'
import { StoreManage, UserAdmin, OrderMerge } from './Admin/index'


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
        },
        {
          name: 'OrderMerge',
          title: '合併訂單'
        }
      ]
    }
  },
  components: {
    Tab,
    StoreManage,
    UserAdmin,
    OrderMerge
  }
}
</script>
