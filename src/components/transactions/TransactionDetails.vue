<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-title">
        <h2>{{ $t('transactions.title') }}</h2>
        <h4>{{ $t('transactions.caption', [transactionId]) }}</h4>
      </div>
    </div>
    <PageLoading v-if="loading" />
    <div v-else-if="!transaction">
      <div>Loading individual transactions is not yet implemented</div>
      <div>For now, come here after clicking on <router-link class="text-link" :to="{name:'Reports'}">table rows</router-link></div>
    </div>
    <div v-else class="page-body">
      <div class="layout-row" style="gap:20px;">
        <JsonViewer :value="transaction" />
        <JsonViewer :value="project" />
        <JsonViewer :value="gateway" />
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
  },
  props: {
    transactionId: String
  },
  computed: {
    transaction () {
      return this.$store.state.transactions.transactions[this.transactionId]
    },
    loading () {
      // TODO: implement individual transaction loading
      return this.$store.state.transactions.loading[this.transactionId]
    },
    gateway () {
      if (this.transaction) {
        return this.$store.getters.gateway(this.transaction.gatewayId)
      }
      return null
    },
    project () {
      if (this.transaction) {
        return this.$store.getters.project(this.transaction.projectId)
      }
      return null
    }
  }
}
</script>
