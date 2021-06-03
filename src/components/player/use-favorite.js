import { useStore } from 'vuex'
import { computed } from 'vue'
import { save, remove } from '@/assets/js/array-store'
import { FAVORITE_KEY } from '@/assets/js/constant.js'

export default function useFavorite() {
  const store = useStore()
  const favoriteList = computed(() => store.state.favoriteList)
  const maxLen = 100

  const getFavoriteIcon = (song) => {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }

  const toggleFavorite = (song) => {
    let list
    if (isFavorite(song)) {
      list = remove(FAVORITE_KEY, (item) => {
        return item.id === song.id
      })
    } else {
      list = save(song, FAVORITE_KEY, (item) => {
        return item.id === song.id
      }, maxLen)
    }
    store.commit('setFavoriteList', list)
  }

  const isFavorite = (song) => {
    return favoriteList.value?.find(item => item.id === song.id)
  }

  return {
    getFavoriteIcon,
    toggleFavorite
  }
}
