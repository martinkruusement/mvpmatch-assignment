export default {
  setup (el, binding) {
    if (binding.dir.data) {
      binding.dir.cleanup(binding)
    }
    const dirData = {
      vm: binding.instance,
      prop: binding.attr,
      enterHandler: () => { binding.instance[binding.arg] = true },
      leaveHandler: () => { binding.instance[binding.arg] = false }
    }
    el.addEventListener('mouseenter', dirData.enterHandler)
    el.addEventListener('mouseleave', dirData.leaveHandler)
    dirData.el = el
    binding.dir.data = dirData
  },
  cleanup (binding) {
    if (!binding.dir.data?.el) {
      return
    }
    binding.dir.data.el.removeEventListener('mouseenter', binding.dir.data.enterHandler)
    binding.dir.data.el.removeEventListener('mouseleave', binding.dir.data.leaveHandler)
    binding.dir.data.enterHandler = null
    binding.dir.data.leaveHandler = null
    binding.dir.data.el = null
    binding.dir.data.vm = null
    binding.dir.data.prop = null
    binding.dir.data = null
  },
  created: (el, binding) => {
    binding.dir.setup(el, binding)
  },
  updated: (el, binding) => {
    binding.dir.setup(el, binding)
  },
  beforeUnmount: (el, binding) => {
    binding.dir.cleanup(binding)
  }
}
