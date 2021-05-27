<template>
  <div class="singer-detail">
    <MusicList :songs="songs" :title="title" :pic="pic" :loading="loading"/>
  </div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import MusicList from '@/components/music-list/music-list'

export default {
  name: 'singer-detail',
  data() {
    return {
      songs: [],
      loading: true
    }
  },
  props: {
    singer: Object
  },
  async created() {
    const res = await getSingerDetail(this.singer)
    const songs = await processSongs(res.songs)
    this.songs = songs
    this.loading = false
  },
  components: {
    MusicList
  },
  computed: {
    pic() {
      return this.singer && this.singer.pic
    },
    title() {
      return this.singer && this.singer.name
    }
  }
}
</script>

<style lang="scss" scoped>
  .singer-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>
