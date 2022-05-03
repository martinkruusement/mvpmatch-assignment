<template>
  <DialogBox
    :cancelable="false"
    :confirm="$t('logout.dialog.buttons.confirm')"
    :cancel="$t('logout.dialog.buttons.cancel')"
    @close="close"
    @confirm="confirm"
  >
    <template #title>
      {{ $t('logout.dialog.title') }}
    </template>
    <slot>
      <p>{{ $t('logout.dialog.text.p1') }}</p>
      <p>{{ $t('logout.dialog.text.p2') }}</p>
    </slot>
  </DialogBox>
</template>

<script>
import { wait } from '@/utils.js'
import DialogBox from '@/components/dialogs/DialogBox.vue'

export default {
  name: 'Sidebar',
  components: {
    DialogBox
  },
  methods: {
    close () { this.$store.commit('logoutDialog', false) },
    async confirm ({ success }) {
      await wait(1000)
      console.log('Wait a second (exactly 1) for the fake loading to finish :)')
      success(this.$t('logout.confirmationMessage'))
    }
  }
}
</script>
