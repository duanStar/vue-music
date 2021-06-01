<template>
  <m-header></m-header>
  <Tab />
  <router-view></router-view>
  <Player />
</template>

<script>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
import Player from '@/components/player/player'

export default {
  components: {
    MHeader: Header,
    Tab,
    Player
  }
}
</script>

<style lang="scss" scoped>

</style>
