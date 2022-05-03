<template>
  <div class="icon">
    <!-- // TODO: investigate if this is better than <component :is> for tree-shakeability -->
    <Close v-if="icon === 'close'" />
    <Calendar v-else-if="icon === 'calendar'" />
    <ArrowRight v-else-if="icon === 'arrow-right'" />
  </div>
</template>

<script>
// import Icon from '@/components/icons/Icon.vue'

import Close from '@/components/icons/icons/CloseIcon.vue'
import Calendar from '@/components/icons/icons/CalendarIcon.vue'
import ArrowRight from '@/components/icons/icons/ArrowRightIcon.vue'

export default {
  name: 'Icon',
  components: {
    Close,
    Calendar,
    ArrowRight
  },
  props: {
    icon: { type: String, default: 'close' }
  }
}
</script>

<style lang="css" scoped>
.icon {
    width: 100%;
    height: 100%;
}
::v-deep( svg ) {
    width: 100%;
    height: 100%;
    transform: translate3d(0,0,0);
}
</style>
