export const currentSong = state => {
  return state.playList[state.currentIndex] || {}
}
