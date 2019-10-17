<template lang="pug">
  #newOrder
    ScrollBar.innerBlock
      .filterCondiction
        .searchType
          el-checkbox(v-model="condiction.searchAll") 全部
        .searchType
          .subjectTitle 按訂購時間：
          el-radio-group(v-model="condiction.searchByTime" :disabled="condiction.searchAll")
            el-radio(:label="2") 兩週內未訂過
            el-radio(:label="4") 一個月內未訂過
            el-radio(:label="8") 兩個月內未訂過
        .searchType
          .subjectTitle 按服務類型：
          el-checkbox-group(v-model="condiction.searchByTypes" :disabled="condiction.searchAll")
            el-checkbox(v-for="type in storeTypes" :label="type.id" :key="type.id") {{type.name}}
      .filterBlock(v-loading="loading")
        el-table(:data="storeList" border style='width: 100%' align="center")
          el-table-column(prop='name' label='店名' width="80")
          el-table-column(prop='description' label='說明')
          el-table-column(label="功能")
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
import store from '@api/store'
import orderForm from '@api/orderForm'
import axios from 'axios'
import debounce from 'lodash/debounce'
import AddOrder from './subComponents/AddOrder'
import MenuList from './subComponents/MenuList'
import StoreInfo from './subComponents/StoreInfo'

export default {
  name: 'DialogCreateNewOrder',
  created() {},
  mounted() {
    this.loading = true
    axios.all([
      store.getStoreType(),
      orderForm.getStoreInfos('')
    ]).then(axios.spread((storeTypes, storeList) => {
      this.storeTypes = storeTypes.list
      this.storeList = storeList.list
      this.loading = false
    }))
  },
  computed: {},
  data() {
    return {
      currentId: '',
      subComponent: '',
      loading: false,
      storeList: [],
      storeTypes: [],
      condiction: {
        searchByTime: '',
        searchByTypes: [],
        searchAll: false
      }
    }
  },
  methods: {
    toggleAside(id, component) {
      this.resetAll()
      // wait till the data reset
      this.$nextTick(() => {
        this.currentId = id
        this.subComponent = component
      })
    },
    resetAll() {
      this.currentId = null
      this.subComponent = null
    },
    getStoreInfo: debounce(function () {
      let load
      if (this.condiction.searchAll) {
        load = ''
      } else {
        load = {
          inWeek: this.condiction.searchByTime,
          types: this.condiction.searchByTypes.join(',')
        }
      }
      this.loading = true
      orderForm.getStoreInfos(load).then(res => {
        this.storeList = res.list
        this.loading = false
      })
    }, 500)
  },
  watch: {
    'condiction': {
      handler() {
        // handle refresh
        this.resetAll()
        // call API to refresh storeList
        this.getStoreInfo()
      },
      deep: true
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
