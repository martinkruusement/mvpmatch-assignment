<template>
  <div class="well report-total">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ReportTotal'
}
</script>

<style lang="css" scoped>
.report-total {
  padding-left: 20px;
  padding-right: 20px;
  line-height: 1;
  width: 100%;
  font-weight: bold;
  height: 53px;
}
</style>
