<template>
  <div class="avatar" :class="{hover}">
    <LazyImage v-if="img && !imgFailed" class="image" :src="img" contain transparent circle @error="imgFailed = true" />
    <div v-else class="text">{{ initials }}</div>
  </div>
</template>

<script>
import { cssUnits, initialsFromName } from '@/utils.js'
import LazyImage from '@/components/ui/LazyImage.vue'
import Color from 'color'

export default {
  name: 'Avatar',
  components: { LazyImage },
  props: {
    circle: Boolean,
    img: String,
    name: [String, Object], // {first, last, full}
    radius: { type: [Number, String], default: 0 },
    size: { type: [Number, String], default: 40 },
    color: { type: String, default: '#F6CA65' },
    textColor: { type: String, default: '#FFFFFF' },
    fontSize: { type: [String, Number], default: 23 },
    padding: { type: [String, Number], default: 0 },
    hover: Boolean
  },
  data () {
    return {
      imgFailed: false
    }
  },
  computed: {
    css () {
      const css = {
        radius: cssUnits(this.radius, 'px').css,
        textColor: this.textColor,
        backgroundColor: this.color,
        size: cssUnits(this.size, 'px').css,
        padding: cssUnits(this.padding, 'px').css,
        fontSize: cssUnits(this.fontSize, 'px').css,
        hoverBackgroundColor: Color(this.color).darken(0.123).hex()
      }

      if (this.circle) {
        css.radius = '100%'
      }
      return css
    },
    initials () {
      if (!this.name) {
        return ''
      }
      return initialsFromName(this.name)
    }
  }
}
</script>

<style lang="css" scoped>
.avatar {
  border-radius: v-bind(css.radius);
  background-color: v-bind(css.backgroundColor);
  width: v-bind(css.size);
  height: v-bind(css.size);
  padding: v-bind(css.padding);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  background-color: v-bind(css.backgroundColor);
  transition: background-color 0.23s ease;
}
@media (hover: hover) {
  .avatar:hover {
    background-color: v-bind(css.hoverBackgroundColor);
  }
}
.hover.avatar {
  background-color: v-bind(css.hoverBackgroundColor);
}
.text {
  font-weight: bold;
  color: v-bind(css.textColor);
  font-size: v-bind(css.fontSize);
}
</style>
