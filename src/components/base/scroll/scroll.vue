<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import { ref } from 'vue'
import useScroll from './use-scroll'

export default {
  name: 'scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const rootRef = ref(null, props)
    useScroll(rootRef)
    return {
      rootRef
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
