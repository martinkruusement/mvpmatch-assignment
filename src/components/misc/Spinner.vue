<template>
  <div class="spinner" :class="classes">
    <svg :width="`${size}px`" :height="`${size}px`" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" r="30" :stroke="bgColor" :stroke-width="thickness" fill="none" />
      <circle cx="50" cy="50" r="30" :stroke="color" :stroke-width="thickness" fill="none" transform="rotate(144 50 50)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
        <animate attributeName="stroke-dasharray" calcMode="linear" values="18.84955592153876 169.64600329384882;94.2477796076938 94.24777960769377;18.84955592153876 169.64600329384882" keyTimes="0;0.5;1" dur="1" begin="0s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
</template>

<script>
//  import Spinner from "@/components/misc/Spinner.vue";
import { hexToRGB, wait } from '@/utils.js'

export default {
  name: 'Spinner',
  props: {
    size: { type: Number, default: 80 },
    thickness: { type: Number, default: 8 },
    bg: String,
    color: { type: String, default: '#435152' },
    autoCenter: Boolean,
    autoSpace: Boolean,
    absoluteCenter: Boolean
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    bgColor () {
      if (!this.bg) {
        return hexToRGB(this.color, 0.15)
      }
      return this.bg
    },
    classes () {
      return {
        'auto-center': this.autoCenter,
        'auto-space': this.autoSpace,
        'absolute-center': this.absoluteCenter,
        visible: this.visible
      }
    }
  },
  mounted () {
    this.animateIn()
  },
  beforeUnmount () {
    this.visible = false
  },
  methods: {
    async animateIn () {
      await wait(5)
      this.visible = true
    }
  }
}
</script>

<style type="text/css">
.auto-center {
  margin-left: auto;
  margin-right: auto;
}
.auto-space {
  margin-left: auto;
  margin-right: auto;
  padding-top: 2em;
  padding-bottom: 2em;
}
.absolute-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform:  translate(-50%,-50%);
}

.spinner {
  opacity: 0;
  transform: scale(1.3);
  transition: all 0.43s ease-out;
}
.spinner.visible {
  opacity: 1;
    transform: scale(1);
}
</style>
