<template>
  <m-header></m-header>
  <Tab />
  <router-view :style="viewStyle" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  <router-view :style="viewStyle" v-slot="{ Component }" name="user">
    <transition name="slide" appear>
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
  <Player />
</template>

<script>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
import Player from '@/components/player/player'
import { mapState } from 'vuex'

export default {
  components: {
    MHeader: Header,
    Tab,
    Player
  },
    computed: {
      viewStyle() {
        const bottom = this.playList.length ? '60px' : '0'
        return {
          bottom
        }
      },
      ...mapState([
        'playList'
      ])
    }
}
</script>

<style lang="scss" scoped>

</style>
