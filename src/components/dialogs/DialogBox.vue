<template>
  <teleport to="#dialog-container">
    <div class="dialog-component" :class="classes" @click="backgroundClick">
      <div class="dialog-wrap">
        <div ref="dialog" class="dialog-box" :class="{shaking}" tabindex="0" @keydown.esc.capture="cancelHandler" @click.stop>
          <IconButton icon="close" class="close-button" @click="cancelHandler" />
          <div v-if="!contentOnly" class="title">
            <div v-if="$slots.default" class="title-custom">
              <slot name="title"></slot>
            </div>
            <div v-else class="title-text">
              {{ title }}
            </div>
          </div>
          <div class="content">
            <div v-if="$slots.default" class="content-custom">
              <slot name="default"></slot>
            </div>
            <div v-else class="content-default">
              {{ text }}
            </div>
          </div>
          <div v-if="!contentOnly" class="actions">
            <slot v-if="$slots.actions" name="actions"></slot>
            <template v-else>
              <BasicButton
                v-if="cancelText"
                :label="cancelText"
                muted
                :disabled="!cancelable"
                @click="cancelHandler"
              />
              <BasicButton
                :label="confirmText"
                :loading="loading"
                @click="confirmHandler"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
// import DialogBox from '@/components/core/DialogBox.vue'
/*

Title can be prop or slot#title

<DialogBox v-if="showDialog"
    @close="showDialog = false"
    @confirm="confirmDemoDialog"
    @cancel="cancelDemoDialog"
    confirm-dark confirm-muted cancelable secondary
>
    <template #title>
        Dialog title
    </template>
    <slot>
        And here goes content
    </slot>
    <template #actions>
        Custom buttons, can leave out, will use default buttons then
    </template>
</DialogBox>
*/

import IconButton from '@/components/buttons/IconButton.vue'
import BasicButton from '@/components/buttons/BasicButton.vue'
import { wait } from '@/utils.js'

export default {
  name: 'DialogBox',
  components: {
    BasicButton,
    IconButton
  },
  props: {
    title: String, // ignored if using slot#title
    confirm: String, // button text
    cancel: String, // button text
    cancelable: { type: Boolean, default: true }, // shakes box if trying to click outside
    secondary: Boolean, // small title, align left, actions right XD: 100.4
    confirmMuted: Boolean, // force confirm button to be grey regardless of type
    confirmDark: Boolean,
    contentOnly: Boolean // no template, use default slot for everything
  },
  emits: [
    'close', // use to remove from dom, fired after both confirm and cancel on exit animation finish
    'confirm', // btn click, event with callbacks
    'cancel', // btn click, to handle cancel specifically
    // use '@close' instead to remove from dom
    'confirm-complete', // outro animation done after success callback
    'cancel-complete' // outro animation done after cancellation
  ],
  data () {
    return {
      defaultConfirm: this.$t('dialog.default.confirm'),
      defaultCancel: this.$t('dialog.default.cancel'),
      mounted: false,
      closing: false,
      cancelling: false,
      shaking: false,
      loading: false
    }
  },
  computed: {
    type () {
      if (this.secondary) {
        return 'secondary'
      }
      if (this.contentOnly) {
        return 'content-only'
      }
      return 'regular'
    },
    confirmText () {
      return this.confirm || this.defaultConfirm
    },
    cancelText () {
      if (this.cancel) {
        return this.cancel
      }
      if (this.cancelable) {
        return this.defaultCancel
      }
      return ''
    },
    classes () {
      const classes = {
        mounted: this.mounted,
        closing: this.closing,
        cancelling: this.cancelling,
        [`type-${this.type}`]: true // .type-theme
      }
      return classes
    }
  },
  mounted () {
    setTimeout(this.confirmMount, 20)
  },
  methods: {
    async cancelHandler () {
      if (this.loading || this.cancelling) {
        return
      }
      if (!this.cancelable) {
        this.indicateCancelDisallowed()
        return
      }
      this.shaking = false
      this.closing = true
      this.cancelling = true
      this.$emit('cancel')
      await wait(200)
      this.$emit('close')
      this.$emit('cancel-complete')
    },
    confirmHandler () {
      if (this.cancelling || this.loading || this.closing) {
        return
      }
      this.shaking = false
      this.loading = true
      this.$emit('confirm', { success: this.successCallback, error: this.errorCallback })
    },
    confirmMount () {
      this.mounted = true
      if (this.$refs.dialog) {
        this.$refs.dialog.focus()
      }
    },
    backgroundClick () {
      this.cancelHandler()
    },
    indicateCancelDisallowed () {
      this.shake()
    },
    async shake () {
      this.shaking = true
      await wait(1000)
      this.shaking = false
    },
    async successCallback (message) {
      if (message) {
        await wait(200)
        this.$store.dispatch('notification', { text: message })
      }
      this.closing = true
      await wait(200)
      this.$emit('close')
      this.$emit('confirm-complete')
    },
    errorCallback (message) {
      if (message) {
        this.$store.dispatch('notification', { text: message, type: 'error' })
      }
      this.shake()
      this.loading = false
    }
  }
}
</script>

<style lang="css" scoped>
.dialog-component {
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    pointer-events: all;
    transition: all 0.5s ease;
    perspective: 1000px;
}
.dialog-box {
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    margin: 20px;
    padding: 40px 30px 30px 30px;
    outline: none;
    pointer-events: all;
    background-color: #fff;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    border-radius: 8px;
    position: relative;
    text-align: center;
}
.dialog-component.mounted {
    background-color: rgba(0,0,0,0.5);
}
.dialog-component.closing {
    transition: background-color 0.3s ease;
    background-color: transparent;
}

.dialog-wrap {
    transform: translate3d(0,100px,200px) rotateX(45deg);
    transition: transform 0.3s;
    transform-origin: center center;
}
.dialog-component.mounted .dialog-wrap {
    transform: rotate(0);
}
.dialog-component.closing .dialog-wrap {
    transition: transform 0.2s ease-in, opacity 0.1s ease-in 0.1s;
    transform: translate3d(0,-100px,-50px) rotateX(35deg);
    opacity: 0;
}
.dialog-component.cancelling .dialog-wrap {
    transition: transform 0.2s ease-in, opacity 0.1s ease-in 0.1s;
    transform: translate3d(0,100px,-50px) rotateX(35deg);
    opacity: 0;
}
.actions {
    display: flex;
    gap: 20px;
    margin-top: 30px;
    justify-content: center;
}

.title {
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.content {
    font-size: 16px;
    line-height: 24px;
}

.shaking {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>
