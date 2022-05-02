<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-title">
        <h2>{{ $t('dashboard.title') }}</h2>
        <h4>{{ $t('dashboard.caption') }}</h4>
      </div>
    </div>
    <div v-if="$store.state.system.initialized" class="page-body">
      <div class="layout-row">
        <JsonViewer :value="$store.state.system" />
      </div>
    </div>
    <PageLoading v-else />
  </div>
</template>

<script>
import PageLoading from '@/components/misc/PageLoading.vue'

export default {
  name: 'DashboardPage',
  components: {
    PageLoading
  }
}
</script>
