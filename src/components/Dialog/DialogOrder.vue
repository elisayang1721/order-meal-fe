<template lang="pug">
  #order(v-if="Object.keys(orderSet).length")
    .row
      .cell
        span 名稱
      .cell
        span 價格
      .cell
        span 數量
      .cell
        span 說明
    template(v-for="obj in menu.list")
      .row
        .cell
          span {{obj.menuType}}
      .row(v-for="(item, i) in obj.items" :key="item.cate")
        .cell
          span {{item.cate}}
        .cell
          template(v-if="item.meals.length === 1")
            span {{item.meals[0].price}}
          template(v-else)
            .radio(v-for="meal in item.meals" :key="meal.id")
              input(type="radio" :value="meal.id" :id="meal.id"
                v-model="orderSet[obj.menuType][i].menuItemId")
              label(:for="meal.id") {{`${meal.name} ${meal.price}`}}
        .cell
          el-input-number(:min="0" v-model="orderSet[obj.menuType][i].amount")
        .cell
          el-input(v-model="orderSet[obj.menuType][i].remark")
    .confirmBlock
      el-button(type="danger") 取消
      el-button(type="success") 確認
</template>
<script>
export default {
  name: 'DialogOrder',
  created() { },
  mounted() {
    this.orderInfo()
  },
  computed: {},
  methods: {
    orderInfo() {
      const orderSet = {}
      this.menu.list.forEach(el => {
        orderSet[el.menuType] = orderSet[el.menuType] || []
        el.items.forEach(item => {
          const payLoad = {
            menuItemId: item.meals.length === 1 ? item.meals[0].id : null,
            amount: 0,
            remark: null
          }
          orderSet[el.menuType].push(payLoad)
        })
      })
      this.orderSet = orderSet
    }
  },
  watch: {},
  data() {
    return {
      menu: {
        'totalSize': 30,
        'list': [
          {
            'menuType': '便當類',
            'items': [
              {
                'cate': '雞腿便當',
                'meals': [
                  {
                    'id': 205,
                    'name': '雞腿便當',
                    'price': 75
                  }
                ]
              },
              {
                'cate': '滷肉便當',
                'meals': [
                  {
                    'id': 206,
                    'name': '滷肉便當',
                    'price': 80
                  }
                ]
              },
              {
                'cate': '咖哩便當',
                'meals': [
                  {
                    'id': 207,
                    'name': '小小小辣',
                    'price': 65
                  },
                  {
                    'id': 227,
                    'name': '小小辣',
                    'price': 65
                  },
                  {
                    'id': 228,
                    'name': '小辣',
                    'price': 65
                  },
                  {
                    'id': 237,
                    'name': '大辣',
                    'price': 65
                  },
                  {
                    'id': 238,
                    'name': '大大辣',
                    'price': 65
                  },
                  {
                    'id': 208,
                    'name': '不辣',
                    'price': 65
                  }
                ]
              }
            ]
          },
          {
            'menuType': '小菜類',
            'items': [
              {
                'cate': '滷蛋',
                'meals': [
                  {
                    'id': 12,
                    'name': '滷蛋',
                    'price': 10
                  }
                ]
              },
              {
                'cate': '泡菜',
                'meals': [
                  {
                    'id': 13,
                    'name': '台式',
                    'price': 35
                  },
                  {
                    'id': 14,
                    'name': '韓式',
                    'price': 35
                  }
                ]
              }
            ]
          }
        ]
      },
      picked: '',
      amount: 0,
      input: '',
      orderSet: {}
    }
  },
  components: {}
}
</script>
<style lang="sass" scoped>
/deep/.el-input-number
  width: 120px
  line-height: 25px
  .el-input-number__decrease,.el-input-number__increase
    line-height: 25px
/deep/.el-input
  input
    height: 25px
    line-height: 25px
</style>
