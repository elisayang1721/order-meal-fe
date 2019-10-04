<template lang="pug">
  .common
    Tab(:tabs="tabs")
    component(:is="active")
</template>
<script>

import Tab from '@c/Tab/Tab'
import { StoreManage, UserAdmin } from './Admin/index'


export default {
  name: 'Admin',
  data() {
    return {
      active: '',
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
  components: {
    Tab,
    StoreManage,
    UserAdmin
  }
}
</script>
