<template>
  <div class="icon-button">
    <Icon class="icon" :icon="icon" />
  </div>
</template>

<script>
// import IconButton from "@/components/buttons/IconButton.vue"

import Icon from '@/components/icons/Icon.vue'

export default {
  name: 'IconButton',
  components: {
    Icon
  },
  props: {
    icon: {
      type: String,
      default: 'search'
    }
  },
  computed: {
    classes () {
      return {}
    }
  }
}
</script>

<style lang="css" scoped>
.icon-button {
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(78,102,102,.04);
    border-radius: 100%;
    cursor: pointer;
    transition: all 0.2s;
}
.icon {
    width: 24px;
    height: 24px;
}

.icon-button:hover {
    background-color: rgba(78,102,102,.08);
}
.icon-button:active {
    background-color: rgba(78,102,102,.12);
}
</style>
