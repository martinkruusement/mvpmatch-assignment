<template>
  <div id="dialog-container">
    <!-- Teleport target -->
  </div>

  <!--  Global dialog boxes  -->
  <LogoutDialog v-if="$store.state.system.dialogs.logout" />
</template>

<script>
import LogoutDialog from '@/components/dialogs/LogoutDialog.vue'

export default {
  name: 'DialogContainer',
  components: {
    LogoutDialog
  }
}
</script>

<style lang="css">
#dialog-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 20000;
}
</style>
