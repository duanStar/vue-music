import { useStore } from 'vuex'
import { computed, watch, ref } from 'vue'
import { getLyric } from '@/service/song.js'
import LyricParser from 'lyric-parser'

export default function useLyric({ songReady, currentTime }) {
  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)
  const currentLyric = ref(null)
  const currentLineNum = ref(0)
  const lyricScrollRef = ref(null)
  const lyricListRef = ref(null)
  const pureMusicLyric = ref('')
  const playingLyric = ref('')

  watch(currentSong, async newSong => {
    if (!newSong.url || !newSong.id) {
      return
    }
    // 防止歌曲切换歌词闪动
    stopPlayLyric()
    currentLyric.value = null

    const lyric = await getLyric(newSong)
    store.commit('addSongLyric', {
      song: newSong,
      lyric
    })
    // 如果在前面异步操作过程中进行了歌曲切换就不去解析上一次异步操作拿到的歌词
    if (currentSong.value.lyric !== lyric) {
      return
    }
    currentLyric.value = new LyricParser(lyric, handleLyric)
    const hasLyric = currentLyric.value.lines.length
    if (hasLyric) {
      if (songReady.value) {
        playLyric()
      }
    } else {
      playingLyric.value = pureMusicLyric.value = lyric.replace(/\[(\d{2}):(\d{2}):(\d{2})\]/, '')
    }
  })

  const handleLyric = ({ lineNum, txt }) => {
    playingLyric.value = txt
    currentLineNum.value = lineNum
    const scrollComp = lyricScrollRef.value
    const liseEl = lyricListRef.value
    if (!liseEl) {
      return
    }
    if (lineNum > 5) {
      const lineEl = liseEl.children[lineNum - 5]
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else {
      scrollComp.scroll.scrollToElement(0, 0, 1000)
    }
  }
  const playLyric = () => {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }
  const stopPlayLyric = () => {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop(currentTime.value * 1000)
    }
  }

  return {
    currentLyric,
    currentLineNum,
    playLyric,
    lyricScrollRef,
    lyricListRef,
    stopPlayLyric,
    pureMusicLyric,
    playingLyric
  }
}
