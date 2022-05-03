<template>
  <transition appear name="notification-animation" @after-leave="done">
    <div v-if="visible" class="notification-container">
      <div class="notification" :class="classes" @click="hide">
        <div class="text">{{ data.text }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
// this.$store.dispatch('notification', { text: 'Testing', type: 'error', time: 5000 })
// this.$store.dispatch('notification', { text: this.$t('path') })

// import Notification from '@/components/notifications/Notification.vue'
// But don't import this directly, only Notifications.vue needs this.

export default {
  name: 'Notification',
  props: {
    data: { type: Object, required: true }
  },
  emits: ['clear'],
  data () {
    return {
      visible: true,
      type: 'success',
      time: 5000
    }
  },
  computed: {
    classes () {
      const type = this.type
      const classes = {
        [type]: true
      }
      return classes
    }
  },
  mounted () {
    if (this.data.type) {
      this.type = this.data.type
    }
    if (!isNaN(this.data.time)) {
      this.time = this.data.time
    }

    setTimeout(() => { this.hide() }, this.time)
  },
  methods: {
    hide () {
      this.visible = false
    },
    clear () {
      this.$emit('clear', this.data.id)
    },
    done () {
      this.clear()
    }
  }
}
</script>

<style lang="css" scoped>
.notification {
    border-radius: 4px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    padding: 12px 16px;
    display: inline-flex;
    pointer-events: all;
}

.text {
    font-weight: bold;
    font-size: 14px;
    line-height: 21px;
    line-height: 21px;
    color: white;
}
.notification.success {
    background-color: #6EC142;
}
.notification.error {
    background-color: #F24E1E;
}

.notification-animation-enter-active,
.notification-animation-leave-active {
  transition: opacity .2s ease-out, transform 0.32s ease-in-out;
  transform: translateX(0);
  opacity: 1;
}
.notification-animation-leave-active {
    transition: opacity .56s ease-in, transform 0.62s ease-in;
    transition-timing-function: cubic-bezier(0.895, 0.030, 0.685, 0.220);
}
::v-deep(.notification-animation-enter-active div),
::v-deep(.notification-animation-leave-active div) {
    pointer-events: none;
}

.notification-animation-enter-from,
.notification-animation-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
