<template lang="pug">
  #newOrder
    ScrollBar.innerBlock
      .filterCondition
        .searchType
          el-checkbox(v-model="condition.searchAll" @change="searchAll") 全部
        .searchType
          .subjectTitle 按訂購時間：
          el-radio-group(v-model="condition.searchByTime" :disabled="condition.searchAll")
            el-radio(:label="0" @click.native="triggerDebounce") 不限
            el-radio(:label="2" @click.native="triggerDebounce") 兩週內未訂過
            el-radio(:label="4" @click.native="triggerDebounce") 一個月內未訂過
            el-radio(:label="8" @click.native="triggerDebounce") 兩個月內未訂過
        .searchType
          .subjectTitle 按服務類型：
          el-checkbox-group(v-model="condition.searchByTypes" :disabled="condition.searchAll")
            el-checkbox(v-for="type in storeTypes" :key="type.id"
              :label="type.id" @click.native="triggerDebounce") {{type.name}}
      .filterBlock(v-loading="loading")
        el-table(:data="storeList" border style='width: 100%' align="center")
          el-table-column(prop='name' label='店名' width="120")
          el-table-column(prop='description' label='說明')
          el-table-column(prop='avgScore' label='評分' width="100" sortable)
          el-table-column(label="功能")
            template(slot-scope="scope")
              el-tooltip(effect="dark" content="新增訂單" placement="top-start")
                el-button(type="primary" icon="el-icon-plus"
                  @click="toggleAside(scope.row.id, 'AddOrder',scope.row.name)")
              el-tooltip(effect="dark" content="菜單" placement="top-start")
                el-button(type="primary" icon="el-icon-potato-strips"
                  @click="toggleAside(scope.row.id, 'MenuList',scope.row.name)")
              el-tooltip(effect="dark" content="店家資訊" placement="top-start")
                el-button(type="primary" icon="el-icon-info"
                  @click="toggleAside(scope.row.id, 'StoreInfo')")
              el-tooltip(effect="dark" content="店家評價" placement="top-start")
                el-button(type="primary" icon="el-icon-star-on"
                  @click="toggleAside(scope.row.id, 'AllEvaluation')")
    .innerBlock
      component(:is="subComponent" :storeId="currentId" :storeName="currentName")
</template>
<script>
import ScrollBar from '@c/ScrollBar/ScrollBar'
import store from '@api/store'
import orderForm from '@api/orderForm'
import axios from 'axios'
import debounce from 'lodash/debounce'
import RatingBar from '@c/RatingBar/RatingBar'
import AddOrder from './subComponents/AddOrder'
import MenuList from './subComponents/MenuList'
import StoreInfo from './subComponents/StoreInfo'
import AllEvaluation from './subComponents/AllEvaluation'

export default {
  name: 'DialogCreateNewOrder',
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
  data() {
    return {
      currentId: '',
      currentName: '',
      subComponent: '',
      loading: false,
      storeList: [],
      storeTypes: [],
      condition: {
        searchByTime: '',
        searchByTypes: [],
        searchAll: false
      }
    }
  },
  computed: {
    getPayLoad() {
      let load
      if (this.condition.searchAll) {
        load = ''
      } else {
        load = {
          inWeek: this.condition.searchByTime ? this.condition.searchByTime : '',
          types: this.condition.searchByTypes.join(',')
        }
      }
      return load
    }
  },
  methods: {
    toggleAside(id, component, name = null) {
      this.resetAll()
      // wait till the data reset
      this.$nextTick(() => {
        this.currentName = name
        this.currentId = id
        this.subComponent = component
      })
    },
    resetAll() {
      this.currentName = null
      this.currentId = null
      this.subComponent = null
    },
    pushAllTypes() {
      this.storeTypes.forEach(type => {
        this.condition.searchByTypes.push(type.id)
      })
    },
    getStoreInfo: debounce(vm => {
      vm.loading = true
      orderForm.getStoreInfos(vm.getPayLoad).then(res => {
        vm.storeList = res.list
        vm.loading = false
      })
    }, 500),
    triggerDebounce() {
      this.resetAll()
      const vm = this
      this.getStoreInfo(vm)
    },
    searchAll() {
      if (this.condition.searchAll) {
        this.condition.searchByTime = 0
        this.pushAllTypes()
      } else {
        this.condition = {
          searchByTime: '',
          searchByTypes: [],
          searchAll: false
        }
      }
      this.triggerDebounce()
    }
  },
  components: {
    ScrollBar,
    AddOrder,
    MenuList,
    StoreInfo,
    AllEvaluation,
    RatingBar
  }
}
</script>
<style lang="sass" scoped>
/deep/.el-checkbox
  width: 6rem
  font-size: 1rem
  margin-right: 10px
  margin-bottom: 0.35rem
/deep/.el-table
  td,
  th
    padding: .5rem .3rem
    font-size: 16px
    line-height: 1
  th
    font-weight: 400
    >.cell
      line-height: inherit
#newOrder
  /deep/.el-button
    +size(28px,26px,null)
    padding: 0 5px
  #addOrder
    /deep/.el-button
      +size(60px,32px,null)
</style>
