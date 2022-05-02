<template>
  <div class="legend well">
    <div v-for="(item, i) in data" :key="i" class="item">
      <div class="color" :style="{'background-color': item.color}"></div>
      <div class="label">{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Legend',
  props: {
    data: { type: Object, required: true }
  }
}
</script>

<style lang="css" scoped>
.legend {
  display: flex;
  gap: 36px;
  width: 100%;
  justify-content: flex-start;
}
.item {
  display: flex;
  gap: 12px;
  font-size: 14px;
}
.color {
  background-color: #A259FF;
  width: 15px;
  height: 15px;
  border-radius: 5px;
  position: relative;
  top: 2px;
  left: 2px;
}
</style>
