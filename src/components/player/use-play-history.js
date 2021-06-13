import { useStore } from 'vuex'
import { save } from '@/assets/js/array-store'
import { PLAY_KEY } from '@/assets/js/constant'

export default function usePlayHistory() {
  const store = useStore()
  const maxLen = 200

  function savePlay(song) {
    const songs = save(song, PLAY_KEY, item => {
      return item.id === song.id
    }, maxLen)

    store.commit('setPlayHistory', songs)
  }

  return { savePlay }
}
