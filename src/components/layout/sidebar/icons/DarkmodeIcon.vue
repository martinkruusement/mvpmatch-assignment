<template>
  <div class="icon" :class="{idle, active, hover}">
    X
  </div>
</template>

<script>
export default {
  name: 'DarkmodeIcon',
  props: {
    idle: Boolean,
    active: Boolean,
    hover: Boolean
  }
}
</script>

<style lang="css" scoped>
</style>
