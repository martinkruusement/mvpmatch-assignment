<template>
  <svg class="close-icon" :style="{fill: 'currentColor'}" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
    <path d="M0,0H15V15H0Z" fill="none" />
    <path d="M13.233,5.591a.6.6,0,0,0-.856,0L9.409,8.553,6.441,5.585a.605.605,0,0,0-.856.856L8.553,9.409,5.585,12.377a.605.605,0,0,0,.856.856l2.968-2.968,2.968,2.968a.605.605,0,0,0,.856-.856L10.265,9.409l2.968-2.968A.608.608,0,0,0,13.233,5.591Z" transform="translate(-1.909 -1.909)" fill="currentColor" />
  </svg>
</template>

<script>
export default {
  name: 'Close'
}
</script>

<style scoped>
.close-icon {
  transition: fill 0.15s ease-out;
}
</style>
