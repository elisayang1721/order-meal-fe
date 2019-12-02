<template lang="pug">
  #transferTest
    | 舊店家資料(轉移)
</template>
<script>
import axios from 'axios'
import { textToJson, deepClone } from '@js/model'
import store from '@api/store'

export default {
  name: 'StoreTransfer',
  data() {
    return {
      storeInfo: []
    }
  },
  mounted() {
    this.getAllStoreMenu()
  },
  methods: {
    getAllStoreMenu() {
      store.getAllStoreMenu().then(res => {
        const menuData = res.list

        menuData.forEach((type, i) => {          
          menuData[i].menuJson = deepClone(this.getMenuJson(menuData[i].menuText))
          if(menuData[i].address === '') {
            menuData[i].address = '未填寫'
          }
        })

        this.storeInfo = menuData
        this.addStore(this.storeInfo)
      })
    },
    getMenuJson(info) {
      return info ? textToJson(info) : ''
    },
    addStore(type) {
      const storeInfo = type
      let i = 0

      let loop = function () {
        store.addStore(storeInfo[i])
        setTimeout(() => {
            if (i++ < storeInfo.length -1) {  
              loop();
            }               
          }, 1000)
      }
      loop()
    }
  }
}
</script>
