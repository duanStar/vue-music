<template>
  <div
    ref="rootRef"
    class="suggest"
    v-loading:[loadingText]="loading"
    v-no-result:[noResultText]="noResult"
  >
    <ul class="suggest-list">
      <li
        class="suggest-item"
        v-if="singer"
        @click="selectSinger(singer)"
      >
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <li
        class="suggest-item"
        v-for="song in songs"
        :key="song.id"
        @click="selectSong(song)"
      >
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">
            {{song.singer}}-{{song.name}}
          </p>
        </div>
      </li>
      <div
        class="suggest-item"
        v-loading:[loadingText]="pullupLoading"
      ></div>
    </ul>
  </div>
</template>

<script>
  import { computed, ref, watch, nextTick } from 'vue'
  import { search } from '@/service/search'
  import { processSongs } from '@/service/song'
  import usePullupLoad from './use-pull-up-load'

  export default {
    name: 'suggest',
    props: {
      query: String,
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        loadingText: '',
        noResultText: '抱歉，暂无搜索结果'
      }
    },
    emits: ['select-song', 'select-singer'],
    setup(props, { emit }) {
      const singer = ref(null)
      const songs = ref([])
      const hasMore = ref(true)
      const page = ref(1)
      const manualLoading = ref(false)

      const searchFirst = async () => {
        if (!props.query) {
          return
        }
        page.value = 1
        singer.value = null
        songs.value = []
        hasMore.value = true
        const res = await search(props.query, page.value, props.showSinger)
        songs.value = await processSongs(res.songs)
        singer.value = res.singer
        hasMore.value = res.hasMore
        await nextTick()
        await makeItScrollable()
      }

      async function searchMore() {
        if (!hasMore.value && !props.query) {
          return
        }
        page.value++
        const res = await search(props.query, page.value, props.showSinger)
        songs.value = songs.value.concat(await processSongs(res.songs))
        singer.value = res.singer
        hasMore.value = res.hasMore
        await nextTick()
        await makeItScrollable()
      }

      async function makeItScrollable() {
        manualLoading.value = true
        if (scroll.value.maxScrollY >= -1) {
          await searchMore()
          manualLoading.value = false
        }
      }

      const noResult = computed(() => {
        return !singer.value && !songs.value.length && !hasMore.value
      })

      const loading = computed(() => {
        return !singer.value && !songs.value.length
      })

      const pullupLoading = computed(() => {
        return isPullupLoad.value && hasMore.value
      })

      const preventPullupLoad = computed(() => {
        return loading.value || manualLoading.value
      })

      const selectSong = (song) => {
        emit('select-song', song)
      }

      const selectSinger = (singer) => {
        emit('select-singer', singer)
      }

      const { rootRef, isPullupLoad, scroll } = usePullupLoad(searchMore, preventPullupLoad)

      watch(() => props.query, async (newQuery) => {
        if (!newQuery) {
          return
        }
        await searchFirst()
      })

      return {
        songs,
        singer,
        hasMore,
        noResult,
        loading,
        rootRef,
        isPullupLoad,
        scroll,
        pullupLoading,
        selectSong,
        selectSinger
      }
    }
  }
</script>

<style lang="scss" scoped>
  .suggest {
    height: 100%;
    overflow: hidden;
    .suggest-list {
      padding: 0 30px;
      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        .icon {
          flex: 0 0 30px;
          width: 30px;
          [class^="icon-"] {
            font-size: 14px;
            color: $color-text-d;
          }
        }
        .name {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-d;
          overflow: hidden;
          .text {
            @include no-wrap();
          }
        }
      }
    }
  }
</style>
