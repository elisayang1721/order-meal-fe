<template lang="pug">
  .tabContainer
    .adminPanel
      .search
        p 店名
        el-input(
          v-model="condition.searchByName"
          placeholder="請輸入店名"
          prefix-icon="el-icon-search")
      .add
        el-button.add-button(
          @click.prevet="toggleDialog('add')"
          type="success"
          icon="el-icon-plus") 新增
    .adminPanel
      .type
        p 類型:
        el-checkbox(v-model="condition.searchAll" @change="searchAll") 全部
        el-checkbox-group(v-model="condition.searchByTypes" :disabled="condition.searchAll")
          el-checkbox(v-for="type in storeTypes" :key="type.id"
             :label="type.id" @click.native="triggerDebounce") {{type.name}}
    .tableWrapper
      el-table(
        v-loading="loading"
        :data="storeData"
        border
        tyle="width: 100%")
        el-table-column(
          prop="name"
          label="店名")
        el-table-column(
          prop="phone"
          label="電話")
        el-table-column(
          prop="address"
          label="地址"
          width="75")
          template(slot-scope="scope")
            el-tooltip( effect="dark" placement="bottom")
              div( slot="content") {{scope.row.address}}
              i.el-icon-location-outline.address
        el-table-column(
          prop="avgScore"
          label="評價")
          template(slot-scope="scope")
            template(v-if="scope.row.avgScore")
              .score {{scope.row.avgScore}}
              .face(:data-score="getScore(scope.row.avgScore)")
                img(:src="require(`@img/score${getScore(scope.row.avgScore) + 1}.svg`)")
            template(v-else)
              div —
        el-table-column(
          prop="updatedOn"
          label="更新時間"
          width="300")
        el-table-column(
          prop="updatedBy"
          label="更新者")
        el-table-column(
          prop=""
          label="功能"
          width="250")
          template(slot-scope="scope")
            el-button(
              @click.prevet="toggleDialog('edit',scope.row)"
              type="info"
              icon="el-icon-edit") 編輯
            el-button(
              @click.prevet="toggleDialog('delete',scope.row)"
              type="danger"
              icon="el-icon-close") 刪除
    el-pagination(
      :current-page.sync="pageNum"
      @current-change="getData"
      :page-size="8"
      layout="prev, pager, next"
      :total="totalSize")

</template>
<script>
import { mapActions } from 'vuex'
import debounce from 'lodash/debounce'
import { injectState } from '@js/model'
import RatingBar from '@c/RatingBar/RatingBar'
import store from '@api/store'


export default {
  name: 'StoreManage',
  mounted() {
    const vm = this
    this.getData(vm)
    this.getStoreType()
    this.$bus.$on('refresh', () => {
      this.condition.searchByTypes = []
      this.getData()
    })
  },
  data() {
    return {
      storeData: [],
      storeTypes: [],
      totalSize: null,
      pageNum: 1,
      condition: {
        searchByName: '',
        searchByTypes: [],
        searchAll: false
      },
      loading: false
    }
  },
  computed: {
    getPayLoad() {
      const load = {
        name: this.condition.searchByName,
        page: this.pageNum,
        pageSize: 8,
        sort: 'ASC',
        sortName: 'updatedOn',
        types: this.condition.searchAll ? [] : this.condition.searchByTypes
      }
      return load
    }
  },
  methods: {
    ...mapActions(['showDialog']),
    getScore(score) {
      let idx
      if (score <= 1.8) {
        idx = 0
      } else if (score <= 2.6) {
        idx = 1
      } else if (score <= 3.4) {
        idx = 2
      } else if (score <= 4.2) {
        idx = 3
      } else {
        idx = 4
      }
      return idx
    },
    getStoreType() {
      store.getStoreType().then(res => {
        this.storeTypes = res.list
      })
    },
    toggleDialog(action, row = null) {
      let load
      const prop = {
        action
      }
      if (action === 'add') {
        load = {
          name: 'Store',
          title: '新增店家'
        }
      }
      if (action === 'edit' || action === 'delete') {
        prop.id = row.id
        if (action === 'edit') {
          load = {
            name: 'Store',
            title: `編輯店家 – ${row.name}`
          }
        } else {
          load = {
            name: 'Confirm',
            title: '確認刪除'
          }
        }
      }
      injectState(prop)
      this.showDialog(load)
    },
    pushAllTypes() {
      this.storeTypes.forEach(type => {
        this.condition.searchByTypes.push(type.id)
      })
    },
    getData: debounce(vm => {
      vm.loading = true
      store.getStoreList(vm.getPayLoad).then(res => {
        vm.storeData = res.list
        vm.totalSize = res.totalSize
        vm.loading = false
      })
    }, 500),
    triggerDebounce() {
      const vm = this
      this.getData(vm)
    },
    searchAll() {
      if (this.condition.searchAll) {
        this.pushAllTypes()
      } else {
        this.condition.searchByTypes = []
      }
      this.triggerDebounce()
    }
  },
  watch: {
    'condition': {
      handler() {
        const vm = this
        this.pageNum = 1
        this.getData(vm)
      },
      deep: true
    }
  },
  components: {
    RatingBar
  },
  beforeDestroy() {
    this.$bus.$off('refresh')
  }
}
</script>
<style lang="sass" scoped>
.tabContainer
  /deep/.el-checkbox-group
    margin-left: 30px
  /deep/.el-table
    .cell
      +Flex()
  .score
    width: 50px
    font-size: 30px
    margin-right: 20px
  .face
    +size(25px,25px,null)
    border-radius: 50%
    border: 1px solid #000
    margin-right: 5px
    background: #eee
    &[data-score="0"]
      background: #f15354
    &[data-score="1"]
      background: #f68937
    &[data-score="2"]
      background: #ffcc28
    &[data-score="3"]
      background: #49bb7d
    &[data-score="4"]
      background: #16b6d6
.search
  /deep/.el-input
    .el-input__inner
      height: 36px
      line-height: 36px
      border-radius: 4px
      background: $c1
    .el-input__prefix
      .el-input__icon
        line-height: 32px
/deep/.el-checkbox
  // margin-right: 20px
</style>
