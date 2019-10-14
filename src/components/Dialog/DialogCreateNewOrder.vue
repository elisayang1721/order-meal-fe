<template lang="pug">
  #newOrder
    ScrollBar.innerBlock
      .filterCondiction
        .searchType
          el-checkbox(v-model="condiction.searchAll") 全部
        .searchType
          .subjectTitle 按訂購時間：
          el-radio-group(v-model="condiction.orderByTime" :disabled="condiction.searchAll")
            el-radio(:label="1") 兩週內未訂過
            el-radio(:label="2") 一個月內未訂過
            el-radio(:label="3") 兩個月內未訂過
        .searchType
          .subjectTitle 按服務類型：
          el-checkbox-group(v-model="condiction.orderByType" :disabled="condiction.searchAll")
            el-checkbox(label="1") 便當
            el-checkbox(label="2") 麵食
            el-checkbox(label="3") 素食
            el-checkbox(label="4") 冰品
            el-checkbox(label="5") 小吃
            el-checkbox(label="6") 異國料理
            el-checkbox(label="7") 早點
            el-checkbox(label="8") 點心
            el-checkbox(label="9") 團購
            el-checkbox(label="10") 中式
            el-checkbox(label="11") 飲料
            el-checkbox(label="12") 鍋類
            el-checkbox(label="13") 鐵板燒
            el-checkbox(label="14") 其他
      .filterBlock(v-loading="loading")
        el-table(:data="storeList" border style='width: 100%' align="center")
          el-table-column(prop='name' label='店名' width="80")
          el-table-column(prop='description' label='說明')
          el-table-column(prop='id' label="功能")
            template(slot-scope="scope")
              el-button(type="primary" icon="el-icon-plus"
                @click="toggleAside(scope.row.id, 'AddOrder')")
              el-button(type="primary" icon="el-icon-potato-strips"
                @click="toggleAside(scope.row.id, 'MenuList')")
              el-button(type="primary" icon="el-icon-info"
                @click="toggleAside(scope.row.id, 'StoreInfo')")
    .innerBlock
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
    toggleAside(id, component) {
      this.currentId = id
      this.subComponent = component
    }
  },
  watch: {
    'condiction': {
      handler() {
        // handle subComponent
        this.subComponent = ''
        // call API to refresh storeList
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 1000)
      },
      deep: true
    }
  },
  data() {
    return {
      currentId: '',
      subComponent: '',
      loading: false,
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
      ],
      condiction: {
        orderByTime: '',
        orderByType: [],
        searchAll: false
      }
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
