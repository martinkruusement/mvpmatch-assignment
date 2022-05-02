<template>
  <div v-if="source" class="img" :class="classes">
    <img :src="source" @load="loadComplete" @error="loadError" />
  </div>
</template>

<script>
// import LazyImage from '@/components/ui/LazyImage.vue'

export default {
  name: 'LazyImage',
  props: {
    src: String,
    round: Boolean,
    transparent: Boolean,
    cover: { type: Boolean, default: true },
    contain: Boolean,
    background: { type: String, default: '#D7DDDD' }
  },
  emits: ['error'],
  data () {
    return {
      loading: true,
      error: false
    }
  },
  computed: {
    classes () {
      const classes = {
        loading: this.loading,
        loaded: !this.loading && !this.error,
        error: this.error,
        round: this.round,
        cover: !this.contain,
        contain: this.contain
      }
      return classes
    },
    source () {
      if (!this.src || typeof this.src !== 'string') {
        this.loadError()
        return null
      }
      const parts = this.src.split('.')
      if (!parts.length) {
        this.loadError()
        return null
      }
      const extension = parts.pop()
      if (!(['jpg', 'jpeg', 'png', 'svg'].includes(extension))) {
        this.loadError()
        return null
      }
      return this.src
    },
    backgroundColor () {
      return this.transparent ? 'transparent' : this.background
    }
  },
  methods: {
    loadComplete () {
      this.loading = false
    },
    loadError () {
      this.error = true
      this.loading = false
      this.$nextTick(() => { this.$emit('error') })
    }
  }
}
</script>

<style lang="css" scoped>
img {
    opacity: 0;
    transition: opacity .25s ease-out;
    width: 100%;
    height: 100%;
}
.loaded img {
    opacity: 1;
}
.cover img {
    object-fit: cover;
}
.contain img {
  object-fit: contain;
}
.img {
    background-color: v-bind(backgroundColor);
    width: 100%;
    height: 100%;
}
.round {
  border-radius: 50%;
  overflow: hidden;
}

</style>
