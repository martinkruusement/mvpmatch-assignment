<template>
  <div class="page-loading">
    <Spinner auto-center />
  </div>
</template>

<script>
//  import PageLoading from "@/components/misc/PageLoading.vue";
import Spinner from '@/components/misc/Spinner.vue'

export default {
  name: 'PageLoading',
  components: {
    Spinner
  }
}
</script>

<style lang="css" scoped>
.page-loading {
  display: flex;
  flex-direction: column;
  flex:1;
  justify-content: center;
}
</style>
