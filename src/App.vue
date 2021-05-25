<template>
  <m-header></m-header>
  <Tab />
  <router-view></router-view>
</template>

<script>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'

export default {
  components: {
    MHeader: Header,
    Tab
  }
}
</script>

<style lang="scss" scoped>

</style>
