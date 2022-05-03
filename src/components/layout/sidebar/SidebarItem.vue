<template>
  <div v-hover="handleHover" class="sidebar-item">
    <router-link v-if="route" :to="route" class="sidebar-link">
      <component :is="icons[icon]" class="icon" :active="iconActive" :hover="iconHover" :idle="iconIdle" />
    </router-link>
    <div v-else class="non-link">
      <component :is="icons[icon]" class="icon" :active="iconActive" :hover="iconHover" :idle="iconIdle" />
    </div>
  </div>
</template>

<script>
import { vElementHover } from '@vueuse/components'
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
  directives: {
    hover: vElementHover
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
      hover: false,
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
      return this.hover
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
    },
    handleHover (value) {
      this.hover = value
    }
  }
}
</script>

<style lang="css" scoped>
.sidebar-item {
  display: flex;
  align-items: stretch;
  width: 45px;
  height: 45px;
  cursor: pointer;
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

.sidebar-link {
width: 100%;
display: flex;
align-items: center;
justify-content: center;
}
.non-link {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
