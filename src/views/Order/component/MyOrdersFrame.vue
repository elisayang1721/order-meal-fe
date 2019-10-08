<template lang="pug">
  ScrollBar.listContainer(id="myOrdersFrame" @ps-y-reach-end="reachEnd")
    .contentViewFix
      OrdersItem(v-for="(obj, i) in myOrdersList.list" :key="i" :myOrderData="obj")
    .loading(v-loading="loading")
</template>
<script>
import ScrollBar from '@c/ScrollBar/ScrollBar'
import OrdersItem from './OrdersItem'

export default {
  name: 'MyOrdersFrame',
  created() {},
  mounted() {},
  computed: {},
  methods: {
    reachEnd() {
      // call API to get more orderList
    }
  },
  watch: {},
  data() {
    return {
      myOrdersList: {
        'totalSize': 30,
        'list': [
          {
            'createdOn': '2018-08-07',
            'storeName': '甲味屋',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              },
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              },
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              },
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              },
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              },
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          },
          {
            'createdOn': '2018-08-07',
            'storeName': '條條有理',
            'meals': [
              {
                'item': '炸雞排 小辣 60 x1',
                'remark': null
              }
            ]
          }
        ]
      },
      loading: false
    }
  },
  components: {
    ScrollBar,
    OrdersItem
  }
}
</script>
