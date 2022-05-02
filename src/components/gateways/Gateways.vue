<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-title">
        <h2>{{ $t('gateways.title') }}</h2>
        <h4>{{ $t('gateways.caption') }}</h4>
      </div>
    </div>
    <PageLoading v-if="$store.state.gateways.loading" />
    <div v-else class="page-body">
      <div class="layout-row">
        <JsonViewer :value="$store.state.gateways" :expand-depth="2" />
      </div>
    </div>
  </div>
</template>

<script>
import PageLoading from '@/components/misc/PageLoading.vue'
export default {
  name: 'Gateways',
  components: {
    PageLoading
  }
}
</script>
