<template lang="pug">
  #newOrder
    ScrollBar.innerBlock(:overscroll="true" @reachEnd="reachEnd")
      .filterCondition
        .searchBlock
          .searchInputWrap
            .subjectTitle 店名：
            el-input.searchInput(
              v-model="condition.searchByName"
              @focus="enterInput(true)"
              @blur="enterInput(false)"
              placeholder="請輸入店名"
              prefix-icon="el-icon-search"
              maxlength="20")
          .searchInputWrap
            .subjectTitle 餐點名稱：
            el-input.searchInput(
              v-model="condition.searchByMeals"
              @focus="enterInput(true)"
              @blur="enterInput(false)"
              placeholder="請輸入餐點名稱,如：可樂,雞腿便當"
              prefix-icon="el-icon-search"
              maxlength="20")
        .searchType
          .subjectTitle 按訂購時間：
          el-radio-group(v-model="condition.searchByTime")
            el-radio(:label="0" @click.native="triggerDebounce") 不限
            el-radio(:label="2" @click.native="triggerDebounce") 兩週內未訂過
            el-radio(:label="4" @click.native="triggerDebounce") 一個月內未訂過
            el-radio(:label="8" @click.native="triggerDebounce") 兩個月內未訂過
        .searchType
          .subjectTitle 按服務類型：
          el-checkbox-group(v-model="condition.searchByTypes" :disabled="condition.searchAll")
            label.el-checkbox(@change="searchAll")
              input.cus-checkbox(type='checkbox', v-model="condition.searchAll")
              span
                span
              span.el-checkbox__label.cus-checkbox__label 全部
            el-checkbox(v-for="type in storeTypes" :key="type.id"
              :label="type.id" @click.native="triggerDebounce") {{type.name}}
      .filterBlock
        el-table(:data="storeList" border
          style='width: 100%'
          align="center"
          :default-sort="{prop:'avgScore',order: 'descending'}"
          @sort-change="sortChange")
          el-table-column(prop='name' label='店名' width="180" sortable="custom")
          el-table-column(prop='description' label='說明')
          el-table-column(prop='avgScore' label='評分' width="75" sortable="custom")
          el-table-column(label="功能"  width="160")
            template(slot-scope="scope")
              el-tooltip(effect="dark" content="新增訂單" placement="top-start")
                el-button.feature-button(icon="el-icon-plus"
                  @click="toggleAside(scope.row.id, 'AddOrder',scope.row.name)")
              el-tooltip(effect="dark" content="菜單" placement="top-start")
                el-button.feature-button(icon="el-icon-s-order"
                  @click="toggleAside(scope.row.id, 'MenuList',scope.row.name)")
              el-tooltip(effect="dark" content="店家資訊" placement="top-start")
                el-button.feature-button(icon="el-icon-info"
                  @click="toggleAside(scope.row.id, 'StoreInfo')")
              el-tooltip(effect="dark" content="店家評價" placement="top-start")
                el-button.feature-button(icon="el-icon-star-on"
                  @click="toggleAside(scope.row.id, 'AllEvaluation')")
        .loadingBlock(v-loading="loading" v-if="storeList.length !== totalSize")
          p
            i(class="el-icon-loading")
            | Load more
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
  data() {
    return {
      currentId: '',
      currentName: '',
      subComponent: '',
      loading: false,
      isFinishLoaded: false,
      storeList: [],
      totalSize: null,
      storeTypes: [],
      isFoucs: false,
      condition: {
        searchByName: '',
        searchByMeals: '',
        searchAll: false,
        searchByTime: '',
        searchByTypes: [],
        sort: 'DESC',
        sortName: 'avgScore',
        page: 1
      }
    }
  },
  mounted() {
    this.loading = true
    axios.all([
      store.getStoreType(),
      orderForm.getStoreInfos(this.getPayLoad)
    ]).then(axios.spread((storeTypes, storeList) => {
      this.storeTypes = storeTypes.list
      if (storeList.list.length >= 13) {
        this.isFinishLoaded = true
      }
      this.totalSize = storeList.totalSize
      this.storeList = storeList.list
      this.loading = false
    }))
  },
  computed: {
    getPayLoad() {
      let load
      if (this.condition.searchAll) {
        load = {
          name: this.condition.searchByName,
          meals: this.reformString(this.condition.searchByMeals),
          sortName: this.condition.sortName,
          sort: this.condition.sort,
          inWeek: this.condition.searchByTime ? this.condition.searchByTime : '',
          page: this.condition.page,
          pageSize: 13
        }
      } else {
        load = {
          name: this.condition.searchByName,
          meals: this.reformString(this.condition.searchByMeals),
          sortName: this.condition.sortName,
          sort: this.condition.sort,
          inWeek: this.condition.searchByTime ? this.condition.searchByTime : '',
          types: this.condition.searchByTypes.join(','),
          page: this.condition.page,
          pageSize: 13
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
    enterInput(status) {
      if (status) {
        window.addEventListener('keyup', this.keyup)
      } else {
        window.removeEventListener('keyup', this.keyup)
      }
    },
    keyup(event) {
      const e = event || window.event
      if (!e) return
      const key = e.key
      if (key === 'Enter') {
        this.triggerDebounce()
      }
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
        if (res.list.length < 13) {
          vm.isFinishLoaded = false
        }
        vm.totalSize = res.totalSize
        vm.storeList = vm.storeList ? [...vm.storeList, ...res.list] : res.list
        vm.loading = false
      })
    }, 300),
    triggerDebounce() {
      this.resetAll()
      this.isFinishLoaded = true
      this.storeList = []
      this.condition.page = 0
      this.reachEnd()
    },
    search() {
      const vm = this
      this.getStoreInfo(vm)
    },
    searchAll() {
      if (this.condition.searchAll) {
        this.pushAllTypes()
      } else {
        this.condition.searchByTypes = []
        this.condition.page = 1
      }
      this.triggerDebounce()
    },
    sortChange(e) {
      this.condition.sortName = e.prop
      if (e.order) {
        this.condition.sort = e.order === 'descending' ? 'DESC' : 'ASC'
      } else {
        this.condition.sort = null
      }
      this.triggerDebounce()
    },
    reachEnd() {
      if (this.isFinishLoaded) {
        this.condition.page++
        const vm = this
        this.getStoreInfo(vm)
      }
    },
    reformString(str) {
      return str.trim().replace(' ', ',').replace(/,+/g, ',')
    }
  },
  watch: {
    'storeList': {
      handler() {
        if (!this.isFinishLoaded) {
          this.reachEnd()
        }
      }
    },
    'condition.searchByMeals': {
      handler() {
        this.triggerDebounce()
      }
    },
    'condition.searchByName': {
      handler() {
        this.triggerDebounce()
      }
    }

  },
  components: {
    ScrollBar,
    AddOrder,
    MenuList,
    StoreInfo,
    AllEvaluation,
    RatingBar
  },
  destroyed() {
    window.removeEventListener('keyup', this.keyup)
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
    font-size: 15px
    line-height: 1
  th
    padding: .3rem
    font-weight: 400
    line-height: 28px
    >.cell
      line-height: inherit
  .caret-wrapper
    height: 29px
    width: 14px
#newOrder
  /deep/.el-button
    +size(30px,30px,null)
    padding: 0
    &+.el-button
      margin-left: 2px
  /deep/.el-table
      .cell
      th
        div
          padding: 0
  #addOrder
    /deep/.el-button
      +size(60px,32px,null)
.feature-button
  position: relative
  font-size: 17px
  border: 0
  background: none
  z-index: 10
  &::before
    content: ''
    +PosAbs(0,0,0,0,-1)
    display: block
    background: none
    border-radius: 50%
    transition-duration: .15s
    transition-timing-function: cubic-bezier(0.4,0.0,0.2,1)
    transform: scale(0)
    transition-property: transform,opacity
  &:hover
    color: #121212
    background: none
    border: 0
    &::before
      background-color: rgba(122,150,236,.25)
      border: 0
      opacity: 1
      transform: scale(1)
  &:focus
    color: #121212
    &::before
      background-color: rgba(122,150,236,.2)
      opacity: 1
      transform: scale(1)
.el-checkbox__original2
  opacity: 0
  outline: 0
  position: absolute
  margin: 0
  width: 0
  height: 0
  z-index: -1
input.cus-checkbox[type="checkbox"]
  display: none
  &+span
    position: absolute
    top: 0
    left: 0
    z-index: 2
    span
      display: inline-block
      position: relative
      width: 14px
      height: 14px
      vertical-align: middle
      background-color: #fff
      border: 1px solid #d0c9c9
      border-radius: 2px
      transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),
      background-color .25s cubic-bezier(.71,-.46,.29,1.46)
      &:hover
        border-color: $tableHeadColor
      &::after
        box-sizing: content-box
        content: ''
        position: absolute
        top: 1px
        left: 4px
        border: 1px solid #FFF
        border-left: 0
        border-top: 0
        +size(3px,7px)
        transform: rotate(45deg) scaleY(0)
        transition: -webkit-transform .15s ease-in .05s
        transition: transform .15s ease-in .05s
        transition: transform .15s ease-in .05s, -webkit-transform .15s ease-in .05s
        transition: transform .15s ease-in .05s,-webkit-transform .15s ease-in .05s
        transform-origin: center
input.cus-checkbox[type="checkbox"]:checked
  &+span
    span
      background-color: $brownC1
      border-color: $brownC1
      &::after
        transform: rotate(45deg) scaleY(1)
.cus-checkbox__label
  padding-left: 23px
</style>
