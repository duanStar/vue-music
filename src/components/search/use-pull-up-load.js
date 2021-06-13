import BetterScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import ObserverDOM from '@better-scroll/observe-dom'
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'

BetterScroll.use(Pullup)
BetterScroll.use(ObserverDOM)

export default function pullUpLoad(requestData, preventPullupLoad) {
  const scroll = ref(null)
  const rootRef = ref(null)
  const isPullupLoad = ref(false)

  onMounted(() => {
    const scrollVal = scroll.value = new BetterScroll(rootRef.value, {
      pullUpLoad: true,
      observeDOM: true,
      click: true
    })

    scrollVal.on('pullingUp', pullingUpHandler)
    async function pullingUpHandler() {
      if (preventPullupLoad) {
        scrollVal.finishPullUp()
        return
      }
      isPullupLoad.value = true
      await requestData()
      scrollVal.finishPullUp()
      scrollVal.refresh()
      isPullupLoad.value = false
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
    if (isPullupLoad.value) {
      isPullupLoad.value = false
    }
  })

  onDeactivated(() => {
    scroll.value.disable()
  })

  onActivated(() => {
    scroll.value.enable()
    scroll.value.refresh()
  })

  return {
    rootRef,
    scroll,
    isPullupLoad
  }
}
