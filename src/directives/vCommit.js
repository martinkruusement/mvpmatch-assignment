export default {
  setup (el, binding) {
    if (binding.dir.data) {
      binding.dir.cleanup(binding)
    }

    console.log('mods', binding.modifiers)
    const key = Object.keys(binding.modifiers).filter(mod => binding.modifiers[mod])
    const dirData = {
      vm: binding.instance,
      mutation: binding.arg,
      key,
      inputHandler: e => {
        const payload = { [key]: binding.dir.parseInputEventValue(e) }
        binding.instance.$store.commit(binding.dir.data.mutation, payload)
      }
    }
    el.addEventListener('input', dirData.inputHandler)
    dirData.el = el
    binding.dir.data = dirData
  },
  parseInputEventValue (e) {
    switch (e.target.type) {
      case 'checkbox':
        return e.target.checked
    }
    return true
  },
  cleanup (binding) {
    if (!binding.dir.data?.el) {
      return
    }
    binding.dir.data.vm = null
    binding.dir.data.mutaion = null
    binding.dir.data.keys = null
    binding.dir.data.el.removeEventListener('input', binding.dir.data.inputHandler)
    binding.dir.data.el = null
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
