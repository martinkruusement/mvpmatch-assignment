<template>
    <div class="notifications">
        <Notification v-for="(notification,n) in notifications" :key="`notif-${n}`" :data="notification" v-show="notification.visible" @clear="clear"/>
    </div>
</template>

<script>
// import Notifications from '@/components/notifications/Notifications.vue'

import { v4 as uuidV4 } from 'uuid'
import Notification from '@/components/notifications/Notification.vue'

export default {
  name: 'Notifications',
  components: { Notification },
  data () {
    return {
      notifications: {},
      unsubscribeFunction: null
    }
  },
  methods: {
    clear (id) {
      delete this.notifications[id]
    },
    add (notification) {
      const id = uuidV4()
      notification.id = id
      notification.visible = true
      this.notifications[notification.id] = notification
    }
  },
  created () {
    this.unsubscribeFunction = this.$store.subscribeAction(action => {
      if (action.type === 'notification') {
        this.add(action.payload)
      }
    })
  }
}
</script>

<style lang="css" scoped>
.notifications {
  position: fixed;
  left: 20px;
  right: 20px;
  bottom: 20px;
  text-align: left;
  display: flex;
  flex-flow: column;
  gap: 10px;
  pointer-events: none;
  z-index: 3000;
}
</style>
