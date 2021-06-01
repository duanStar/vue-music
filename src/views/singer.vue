<template>
  <div class="singer" v-loading="!singers.length">
    <IndexList :data="singers" @select="selectSinger" />
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :singer="selectedSinger" :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/base/index-list/index-list'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant.js'

export default {
  name: 'singer',
  data() {
    return {
      singers: [],
      selectedSinger: null
    }
  },
  async created() {
    const res = await getSingerList()
    this.singers = res.singers
  },
  components: {
    IndexList
  },
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer
      this.cacheSinger(singer)
      this.$router.push({
        path: `/singer/${singer.mid}`
      })
    },
    cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer)
    }
  }
}
</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    width: 100%;
    top: 80px;
    bottom: 0;
  }
</style>
