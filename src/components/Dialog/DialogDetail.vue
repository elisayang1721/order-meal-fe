<template lang="pug">
  #detail
    .row
      .cell
        span 品項
      .cell
        span 數量
      .cell
        span 單價
      .cell
        div
          span 訂購者
          .explanationBlock ?
            ul.explanation
              li
                span.bg-yellow
                span － 黃底的項目表示第一次訂購
              li
                span.bg-green
                span － 綠底的項目表示加訂
              li
                span.bg-active
                span － 點選訂購人，該項目會變成紅底表示已付款
              li
                span.border-red
                span － 紅色外框表示該項目為自已訂購
              li
                span.font-blue 藍色文字
                span － 藍色文字表示該項目的說明
    .row(v-for="(item, idx) in Orders" :key="idx")
      .cell
        span {{item.mealName}}
      .cell
        span {{item.quantity}}
      .cell
        span {{item.amountPerPic}}
      .cell.flexFix
        .subscriberCell.border-grey(v-for="(obj, i) in item.subscribers" :key="obj.name"
          :class="{'bg-yellow': obj.status === 0, 'bg-green': obj.status === 1, 'bg-active': obj.status === 2, 'border-red': obj.name === role, 'hasPermission': checkPermission(obj.name)}"
          @click="orderSubmit(idx, i , obj.status, $event)")
          span {{obj.name}}
          span.font-blue {{obj.remark}}
          .editBlock
            el-button(type="success" @click.stop="showDialog({ name: 'Order', title: '我也要訂 - ＸＸＸ - 編輯' })") 編輯
            el-button(type="danger" @click.stop="test") 刪除
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'DialogDetail',
  created() { },
  mounted() {
    this.role = this.$store.state.id
  },
  computed: {},
  methods: {
    ...mapActions(['showDialog']),
    orderSubmit(idx, i, status, e) {
      const hasCell = e.target.className.includes('subscriberCell')
      // 初始status是2，不做開關
      // class不是subscriberCell，也不做開關
      if (status === 2 || !hasCell) return

      e.target.classList.toggle('bg-active')
      const hasActive = e.target.className.includes('bg-active')
      if (hasActive) {
        // console.log('2')
      } else {
        // console.log(this.Orders[idx].subscribers[i].status)
      }
    },
    checkPermission(name) {
      return this.role === 'admin' || this.role === this.owner || this.role === name
    },
    test() {
      // console.log('test')
    }
  },
  watch: {},
  data() {
    return {
      Orders: [
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            {
              name: '資訊部： 裕介',
              status: 1,
              remark: '12345'
            },
            {
              name: 'BBB',
              status: 0,
              remark: '123456'
            },
            {
              name: 'admin',
              status: 1,
              remark: '555'
            },
            {
              name: 'DDD',
              status: 2,
              remark: ''
            },
            {
              name: 'EEE',
              status: 0,
              remark: ''
            }
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            {
              name: 'AAA',
              status: 1,
              remark: ''
            },
            {
              name: 'BBB',
              status: 1,
              remark: ''
            },
            {
              name: 'CCC',
              status: 1,
              remark: ''
            },
            {
              name: 'DDD',
              status: 1,
              remark: ''
            },
            {
              name: 'EEE',
              status: 1,
              remark: ''
            }
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            {
              name: 'AAA',
              status: 1,
              remark: ''
            },
            {
              name: 'BBB',
              status: 1,
              remark: ''
            },
            {
              name: 'CCC',
              status: 1,
              remark: ''
            },
            {
              name: 'DDD',
              status: 1,
              remark: ''
            },
            {
              name: 'EEE',
              status: 1,
              remark: ''
            }
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            {
              name: 'AAA',
              status: 1,
              remark: ''
            },
            {
              name: 'BBB',
              status: 1,
              remark: ''
            },
            {
              name: 'CCC',
              status: 1,
              remark: ''
            },
            {
              name: 'DDD',
              status: 1,
              remark: ''
            },
            {
              name: 'EEE',
              status: 1,
              remark: ''
            }
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            {
              name: 'AAA',
              status: 1,
              remark: ''
            },
            {
              name: 'BBB',
              status: 1,
              remark: ''
            },
            {
              name: 'CCC',
              status: 1,
              remark: ''
            },
            {
              name: 'DDD',
              status: 1,
              remark: ''
            },
            {
              name: 'EEE',
              status: 1,
              remark: ''
            }
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            {
              name: 'AAA',
              status: 1,
              remark: ''
            },
            {
              name: 'BBB',
              status: 1,
              remark: ''
            },
            {
              name: 'CCC',
              status: 1,
              remark: ''
            },
            {
              name: 'DDD',
              status: 1,
              remark: ''
            },
            {
              name: 'EEE',
              status: 1,
              remark: ''
            }
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            {
              name: 'AAA',
              status: 1,
              remark: ''
            },
            {
              name: 'BBB',
              status: 1,
              remark: ''
            },
            {
              name: 'CCC',
              status: 1,
              remark: ''
            },
            {
              name: 'DDD',
              status: 1,
              remark: ''
            },
            {
              name: 'EEE',
              status: 1,
              remark: ''
            }
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            {
              name: 'AAA',
              status: 1,
              remark: ''
            },
            {
              name: 'BBB',
              status: 1,
              remark: ''
            },
            {
              name: 'CCC',
              status: 1,
              remark: ''
            },
            {
              name: 'DDD',
              status: 1,
              remark: ''
            },
            {
              name: 'EEE',
              status: 1,
              remark: ''
            }
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            {
              name: 'AAA',
              status: 1,
              remark: ''
            },
            {
              name: 'BBB',
              status: 1,
              remark: ''
            },
            {
              name: 'CCC',
              status: 1,
              remark: ''
            },
            {
              name: 'DDD',
              status: 1,
              remark: ''
            },
            {
              name: 'EEE',
              status: 1,
              remark: ''
            }
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            {
              name: 'AAA',
              status: 1,
              remark: ''
            },
            {
              name: 'BBB',
              status: 1,
              remark: ''
            },
            {
              name: 'CCC',
              status: 1,
              remark: ''
            },
            {
              name: 'DDD',
              status: 1,
              remark: ''
            },
            {
              name: 'EEE',
              status: 1,
              remark: ''
            }
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            {
              name: 'AAA',
              status: 1,
              remark: ''
            },
            {
              name: 'BBB',
              status: 1,
              remark: ''
            },
            {
              name: 'CCC',
              status: 1,
              remark: ''
            },
            {
              name: 'DDD',
              status: 1,
              remark: ''
            },
            {
              name: 'EEE',
              status: 1,
              remark: ''
            }
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            {
              name: 'AAA',
              status: 1,
              remark: ''
            },
            {
              name: 'BBB',
              status: 1,
              remark: ''
            },
            {
              name: 'CCC',
              status: 1,
              remark: ''
            },
            {
              name: 'DDD',
              status: 1,
              remark: ''
            },
            {
              name: 'EEE',
              status: 1,
              remark: ''
            }
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            {
              name: 'AAA',
              status: 1,
              remark: ''
            },
            {
              name: 'BBB',
              status: 1,
              remark: ''
            },
            {
              name: 'CCC',
              status: 1,
              remark: ''
            },
            {
              name: 'DDD',
              status: 1,
              remark: ''
            },
            {
              name: 'EEE',
              status: 1,
              remark: ''
            }
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            {
              name: 'AAA',
              status: 1,
              remark: ''
            },
            {
              name: 'BBB',
              status: 1,
              remark: ''
            },
            {
              name: 'CCC',
              status: 1,
              remark: ''
            },
            {
              name: 'DDD',
              status: 1,
              remark: ''
            },
            {
              name: 'EEE',
              status: 1,
              remark: ''
            }
          ]
        }
      ],
      owner: 'owner',
      role: ''
    }
  },
  components: {}
}
</script>
<style lang="sass" scoped>
/deep/.el-button
  padding: 6px 10px
  width: 60px
</style>
