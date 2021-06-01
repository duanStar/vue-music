import { PLAY_MODE } from '@/assets/js/constant.js'

const state = {
  sequenceList: [],
  playList: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false
}

export default state
