import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'

import '@/assets/scss/index.scss'
import loadingDirective from '@/components/base/loading/directive.js'
import noResultDirective from '@/components/base/no-result/directive.js'
import { load, saveAll } from '@/assets/js/array-store'
import { FAVORITE_KEY, PLAY_KEY } from '@/assets/js/constant'
import { processSongs } from '@/service/song'

const favoriteSongs = load(FAVORITE_KEY)
if (favoriteSongs.length > 0) {
  processSongs(favoriteSongs).then(songs => {
    store.commit('setFavoriteList', songs)
    saveAll(songs, FAVORITE_KEY)
  })
}

const playHistory = load(PLAY_KEY)
if (playHistory.length > 0) {
  processSongs(playHistory).then(songs => {
    store.commit('setPlayHistory', songs)
    saveAll(songs, PLAY_KEY)
  })
}

createApp(App).use(store).use(router).use(lazyPlugin, {
  loading: require('@/assets/images/default.png')
}).directive('loading', loadingDirective).directive('no-result', noResultDirective).mount('#app')
