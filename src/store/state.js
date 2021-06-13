import { PLAY_MODE, SEARCH_KEY } from '@/assets/js/constant.js'
import { load } from '@/assets/js/array-store'

const state = {
  sequenceList: [],
  playList: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false,
  favoriteList: [],
  searchHistory: load(SEARCH_KEY),
  playHistory: []
}

export default state
