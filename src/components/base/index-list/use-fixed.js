import { ref, watch, nextTick, computed } from 'vue'

export default function useFixed(props) {
  const groupRef = ref(null)
  const listHeights = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const distance = ref(0)
  const TITLE_HEIGHT = 30

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return ''
    }
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  const fixedStyle = computed(() => {
    const distanceValue = distance.value
    const diff = (distance.value > 0 && distanceValue < TITLE_HEIGHT) ? distanceValue - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0, ${diff}px, 0)`
    }
  })

  watch(() => props.data, async () => {
    await nextTick()
    calculate()
  })

  function calculate() {
    const list = groupRef.value.children
    const listHeightValue = listHeights.value
    listHeightValue.length = 0

    let height = 0
    listHeightValue.push(height)

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightValue.push(height)
    }
  }
  watch(scrollY, (newY) => {
    const listHeightValue = listHeights.value
    for (let i = 0; i < listHeightValue.length - 1; i++) {
      const heightTop = listHeightValue[i]
      const heightBottom = listHeightValue[i + 1]
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i
        distance.value = heightBottom - newY
      }
    }
  })

  function onScroll(pos) {
    scrollY.value = -pos.y
  }

  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle,
    currentIndex
  }
}
