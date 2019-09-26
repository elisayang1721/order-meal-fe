<template>
  <div>
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>
<script>
import Nav from './nav/nav'

export default {
  name: 'Layout',
  components: {
    Nav,
  },
}
</script>
