import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom.js'

const relativeCls = 'g-relative'

export default function createLoadingLikeDirective(Comp) {
  const name = Comp.name

  return {
    mounted(el, binding) {
      const app = createApp(Comp)
      const instance = app.mount(document.createElement('div'))
      if (typeof el[name] === 'undefined') {
        el[name] = {}
      }
      el[name].instance = instance
      const title = binding.arg
      if (typeof title !== 'undefined') {
        instance.setTitle(title)
      }
      if (binding.value) {
        append(el)
      }
    },
    updated(el, binding) {
      const title = binding.arg
      if (typeof title !== 'undefined') {
        el[name].instance.setTitle(title)
      }
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }

  function append(el) {
    const style = getComputedStyle(el)
    if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
      addClass(el, relativeCls)
    }
    el.appendChild(el[name].instance.$el)
  }
  function remove(el) {
    removeClass(el, relativeCls)
    el.removeChild(el[name].instance.$el)
  }
}
