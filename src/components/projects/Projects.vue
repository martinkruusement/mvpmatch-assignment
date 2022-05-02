<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-title">
        <h2>{{ $t('projects.title') }}</h2>
        <h4>{{ $t('projects.caption') }}</h4>
      </div>
    </div>
    <PageLoading v-if="$store.state.projects.loading" />
    <div v-else class="page-body">
      <div class="layout-row">
        <JsonViewer :value="$store.state.projects" :expand-depth="2" />
      </div>
    </div>
  </div>
</template>

<script>
import PageLoading from '@/components/misc/PageLoading.vue'
export default {
  name: 'Projects',
  components: {
    PageLoading
  }
}
</script>
