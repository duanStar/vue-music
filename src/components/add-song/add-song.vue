<template>
  <teleport to='body'>
    <transition name="slide">
      <div class="add-song" v-show="visible">
        <div class="header">
          <h1 class="title">添加歌曲到列表</h1>
          <div class="close" @click="hide">
            <i class="icon-close"></i>
          </div>
        </div>
        <div class="search-input-wrapper">
          <Search-input v-model="query" placeholder="搜索歌曲" />
        </div>
        <div v-show="!query">
          <Switches :items="['最近播放', '搜索历史']" v-model="currentIndex" />
          <div class="list-wrapper">
            <Scroll class="list-scroll" v-if="currentIndex === 0">
              <div class="list-inner">
                <SongList :songs="playHistory" />
              </div>
            </Scroll>
            <Scroll class="list-scroll" v-if="currentIndex === 1">
              <div class="list-inner">
                <SearchList :searches="searchHistory" />
              </div>
            </Scroll>
          </div>
        </div>
        <div class="search-result" v-show="query">
          <Suggest :query="query" :showSinger="false" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import SearchInput from '@/components/search/search-input'
import Suggest from '@/components/search/suggest'
import Switches from '@/components/base/switches/switches'
import SongList from '@/components/base/song-list/song-list'
import Scroll from '@/components/base/scroll/scroll'
import SearchList from '@/components/base/search-list/search-list'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'add-song',
  components: {
    SearchInput,
    Suggest,
    Switches,
    SongList,
    Scroll,
    SearchList
  },
  setup() {
    const visible = ref(false)
    const query = ref('')
    const currentIndex = ref(0)
    const store = useStore()

    // computed
    const searchHistory = computed(() => store.state.searchHistory)

    // methods
    function show() {
      visible.value = true
    }

    function hide() {
      visible.value = false
    }

    return {
      visible,
      query,
      show,
      hide,
      currentIndex,
      searchHistory
    }
  }
}
</script>

<style lang="scss" scoped>
  .add-song {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 300;
    background: $color-background;
    .header {
      position: relative;
      height: 44px;
      text-align: center;
      .title {
        line-height: 44px;
        font-size: $font-size-large;
        color: $color-text;
      }
      .close {
        position: absolute;
        top: 0;
        right: 8px;
        .icon-close {
          display: block;
          padding: 12px;
          font-size: 20px;
          color: $color-theme;
        }
      }
    }
    .search-input-wrapper {
      margin: 20px
    }
    .list-wrapper {
      position: absolute;
      top: 165px;
      bottom: 0;
      width: 100%;
      .list-scroll {
        height: 100%;
        overflow: hidden;
        .list-inner {
          padding: 20px 30px;
        }
      }
    }
    .search-result {
      position: fixed;
      top: 124px;
      bottom: 0;
      width: 100%;
    }
  }

  .message-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;
    .icon-ok {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }
    .text {
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
</style>
