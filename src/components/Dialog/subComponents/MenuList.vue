<template lang="pug">
  ScrollBar#menuList
    .row
      .cell
        span 品名
      .cell
        span 價格
    template(v-for="obj in menu.list")
      .row
        .cell
          span {{obj.menuType}}
      .row(v-for="(item, i) in obj.items" :key="i")
        .cell
          span {{item.cate}}
        .cell
          template(v-if="item.meals.length === 1")
            span {{item.meals[0].price}}
          template(v-else)
            span(v-for="meal in item.meals" :key="meal.id") {{`${meal.name} ${meal.price}`}}
</template>
<script>
import ScrollBar from '@c/ScrollBar/ScrollBar'

export default {
  name: 'MenuList',
  props: ['storeId'],
  created() {},
  mounted() {},
  computed: {},
  methods: {},
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
      }
    }
  },
  components: {
    ScrollBar
  }
}
</script>
