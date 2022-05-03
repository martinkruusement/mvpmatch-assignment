'<template>
  <div class="header">
    <router-link :to="{name:'Dashboard'}">
      <Logo class="logo" />
    </router-link>
    <MenuButton class="menu-button" @click="$store.dispatch('toggleMenu')" />
    <router-link v-if="loggedIn" v-hover="hoverHandler" :to="{name: 'Account'}" class="account">
      <Avatar :hover="accountHover" :name="account.name" :img="account.avatar" radius="5" padding="5" size="43" />
      <div class="account-name">{{ account.name.display }}</div>
    </router-link>
  </div>
</template>

<script>
import { vElementHover } from '@vueuse/components'
import MenuButton from '@/components/layout/header/MenuButton.vue'
import Logo from '@/components/layout/header/Logo.vue'
import Avatar from '@/components/ui/Avatar.vue'

export default {
  name: 'Header',
  components: {
    Logo, Avatar, MenuButton
  },
  directives: {
    hover: vElementHover
  },
  data () {
    return {
      accountHover: false
    }
  },
  computed: {
    account () {
      return this.$store.getters.account
    },
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  },
  methods: {
    hoverHandler (status) {
      this.accountHover = status
    }
  }
}
</script>

<style lang="css" scoped>
.header {
  display: flex;
  height: var(--header-height);
  border-bottom: var(--header-border-width) solid #F3F6F9;
  align-items: center;
  padding-right: var(--page-offset-right);
  background-color: rgba(255,255,255,0.88);
  backdrop-filter: saturate(1.8) blur(16px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.account {
  display: flex;
  gap: 11px;
  align-items: center;
  margin-left: auto;
}
.account-name {
  color: #005B96;
  font-weight: bold;
}

.logo {
  width: var(--page-gutter);
  display: flex;
  justify-content: center;
}
</style>
