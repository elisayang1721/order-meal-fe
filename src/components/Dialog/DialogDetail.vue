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
        span 訂購者
    .row(v-for="(item, idx) in Orders" :key="idx")
      .cell
        span {{item.mealName}}
      .cell
        span {{item.quantity}}
      .cell
        span {{item.amountPerPic}}
      .cell.flexFix
        .subscriberCell(v-for="name in item.subscribers" :key="name") {{name}}
</template>
<script>
export default {
  name: 'DialogDetail',
  created() { },
  mounted() { },
  computed: {},
  methods: {},
  watch: {},
  data() {
    return {
      Orders: [
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD1',
            'DDD2',
            'DDD3',
            'DDD4',
            'DDD5',
            'DDD6',
            'DDD7',
            'DDD8',
            'DDD9',
            'DDD0',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        },
        {
          mealName: 'AAA',
          quantity: 5,
          amountPerPic: '$60',
          subscribers: [
            'AAA',
            'BBB',
            'CCC',
            'DDD',
            'EEE'
          ]
        }
      ]
    }
  },
  components: {}
}
</script>
