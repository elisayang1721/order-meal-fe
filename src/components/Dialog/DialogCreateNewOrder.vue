<template lang="pug">
  #newOrder
    ScrollBar.innerBlock
      .filterBlock
        el-table(:data="storeList" border style='width: 100%' align="center")
          el-table-column(prop='name' label='店名' width="80")
          el-table-column(prop='description' label='說明')
          el-table-column(prop='id' label="功能")
            template(slot-scope="scope")
              el-button(type="primary" icon="el-icon-plus" @click="create(scope.row.id)")
              el-button(type="primary" icon="el-icon-potato-strips" @click="openMenu(scope.row.id)")
              el-button(type="primary" icon="el-icon-info" @click="openInfo(scope.row.id)")
    ScrollBar.innerBlock
      component(:is="subComponent" :storeId="currentId")
</template>
<script>
import ScrollBar from '@c/ScrollBar/ScrollBar'
import AddOrder from './subComponents/AddOrder'
import MenuList from './subComponents/MenuList'
import StoreInfo from './subComponents/StoreInfo'

export default {
  name: 'DialogCreateNewOrder',
  created() {},
  mounted() {},
  computed: {},
  methods: {
    create(id) {
      this.currentId = id
      this.subComponent = 'AddOrder'
    },
    openMenu(id) {
      this.currentId = id
      this.subComponent = 'MenuList'
    },
    openInfo(id) {
      this.currentId = id
      this.subComponent = 'StoreInfo'
    }
  },
  watch: {},
  data() {
    return {
      currentId: '',
      subComponent: '',
      storeList: [
        {
          id: 1,
          name: '條條有理',
          description: '0912345678'
        },
        {
          id: 2,
          name: '條條有理',
          description: '0912345678'
        },
        {
          id: 3,
          name: '條條有理',
          description: '0912345678'
        },
        {
          id: 4,
          name: '條條有理',
          description: '0912345678'
        },
        {
          id: 5,
          name: '條條有理',
          description: '0912345678'
        }
      ]
    }
  },
  components: {
    ScrollBar,
    AddOrder,
    MenuList,
    StoreInfo
  }
}
</script>
<style lang="sass" scoped>
/deep/.el-button
  width: 30px
  padding: 0 5px
</style>
