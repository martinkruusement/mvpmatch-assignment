<template>
  <div class="sidebar-item">
    <router-link v-if="route" :to="route">
      <component :is="icons[icon]" class="icon" :active="iconActive" :hover="iconHover" :idle="iconIdle" />
    </router-link>

    <div v-else>
      <component :is="icons[icon]" class="icon" :active="iconActive" :hover="iconHover" :idle="iconIdle" />
    </div>
  </div>
</template>

<script>
import DashboardIcon from '@/components/layout/sidebar/icons/DashboardIcon.vue'
import ProjectsIcon from '@/components/layout/sidebar/icons/ProjectsIcon.vue'
import GatewaysIcon from '@/components/layout/sidebar/icons/GatewaysIcon.vue'
import ReportsIcon from '@/components/layout/sidebar/icons/ReportsIcon.vue'
import DarkmodeIcon from '@/components/layout/sidebar/icons/DarkmodeIcon.vue'
import LogoutIcon from '@/components/layout/sidebar/icons/LogoutIcon.vue'

export default {
  name: 'SidebarItem',
  components: {
    DashboardIcon,
    ProjectsIcon,
    GatewaysIcon,
    ReportsIcon,
    DarkmodeIcon,
    LogoutIcon
  },
  props: {
    order: Number,
    route: Object,
    icon: { type: String, required: true },
    animationDelay: Number
  },
  emits: ['activate'],
  data: function () {
    return {
      animationTimeout: null,
      canStartIntro: false,
      icons: {
        dashboard: 'DashboardIcon',
        projects: 'ProjectsIcon',
        gateways: 'GatewaysIcon',
        reports: 'ReportsIcon',
        darkmode: 'DarkmodeIcon',
        logout: 'LogoutIcon'
      }
    }
  },
  computed: {
    hasMatchedRoute () {
      if (!this.route) {
        return false
      }
      const matchedRoutes = [...this.$router.currentRoute.value.matched].reverse()
      if (!matchedRoutes.length) {
        return false
      }

      for (const matchedRoute of matchedRoutes) {
        if (this.route.name === matchedRoute.name) {
          return true
        }
      }
      return false
    },
    iconActive () {
      if (!this.route) {
        // TODO: determine if custom non-route item is active
        return false
      }
      if (this.hasMatchedRoute) {
        return true
      }
      return false
    },
    iconHover () {
      return false
    },
    iconIdle () {
      if (this.iconActive) {
        return false
      }
      if (this.canStartIntro) {
        return false
      }
      return true
    }
  },
  watch: {
    animationDelay: {
      handler (delay, oldDelay) {
        if (oldDelay !== null) {
          return
        }
        if (isNaN(delay)) {
          return
        }
        this.animationTimeout = setTimeout(this.startIntro, delay)
      }
    },
    iconActive: {
      handler (active) {
        if (active && !this.canStartIntro) {
          this.$emit('activate', this.order)
        }
      },
      immediate: true
    }
  },
  beforeUnmount () {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout)
    }
  },
  methods: {
    startIntro () {
      this.canStartIntro = true
    }
  }
}
</script>

<style lang="css" scoped>
.sidebar-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
}
.icon{
  width: 25px;
  transition: 0.45s all ease-in-out;
  opacity: 1;
}
.icon.idle {
/* // TODO: can this actually ever look good? */
  opacity: 1;
}
</style>
