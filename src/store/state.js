import { PLAY_MODE, FAVORITE_KEY } from '@/assets/js/constant.js'
import storage from 'good-storage'

const state = {
  sequenceList: [],
  playList: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false,
  favoriteList: storage.get(FAVORITE_KEY, [])
}

export default state
