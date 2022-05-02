<template>
  <div class="sidebar">
    <nav class="items">
      <SidebarItem
        :route="{name:'Dashboard'}"
        icon="dashboard"
        :order="0"
        :animation-delay="animationDelays[0]"
        aria-label="dashboard"
        @activate="iconWave"
      />
      <SidebarItem
        :route="{name: 'Projects'}"
        icon="projects"
        :order="1"
        :animation-delay="animationDelays[1]"
        aria-label="projects"
        @activate="iconWave"
      />
      <SidebarItem
        :route="
          {name: 'Gateways'}"
        icon="gateways"
        :order="2"
        :animation-delay="animationDelays[2]"
        aria-label="gateways"
        @activate="iconWave"
      />
      <SidebarItem
        :route="{name: 'Reports'}"
        icon="reports"
        :order="3"
        :animation-delay="animationDelays[3]"
        aria-label="reports"
        @activate="iconWave"
      />
      <!--       <SidebarItem icon="darkmode" :order="4" :animation-delay="animationDelays[4]" @click="toggleDarkMode" @activate="iconWave" /> -->
      <SidebarItem
        icon="logout"
        :order="5"
        :animation-delay="animationDelays[5]"
        aria-label="log out"
        @click="logOut"
        @activate="iconWave"
      />
    </nav>
  </div>
</template>

<script>
import SidebarItem from '@/components/layout/sidebar/SidebarItem.vue'
export default {
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  data () {
    return {
      introWaveStarted: false,
      waveTimings: [0, 0, 0, 0, 0, 0, 0],
      animationDelays: [null, null, null, null, null, null]
    }
  },
  methods: {
    iconWave (epicenter) {
      if (this.introAnimationStarted) {
        return
      }
      this.introAnimationStarted = true

      let wavePropagating = true
      let step = 0
      this.animationDelays[epicenter] = this.waveTimings[step]

      while (wavePropagating) {
        step++
        const previous = epicenter - step
        const next = epicenter + step
        const hasPrevious = previous in this.animationDelays
        const hasNext = next in this.animationDelays

        if (hasPrevious) {
          this.animationDelays[previous] = this.waveTimings[step]
        }
        if (hasNext) {
          this.animationDelays[next] = this.waveTimings[step]
        }
        if (!hasPrevious && !hasNext) {
          wavePropagating = false
        }
      }
    },
    toggleDarkMode () {
      console.log('toggleDarkMode') // TODO: toggleDarkMode
    },
    logOut () {
      console.log('logOut') // TODO: logOut
    }
  }
}
</script>

<style lang="css" scoped>
.sidebar {
  position: sticky;
  align-self: flex-start;
  width: var(--sidebar-width);
  top: var(--header-offset);
}
.items {
  gap: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: -5px;
}
</style>
