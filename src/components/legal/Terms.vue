<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-title">
        <h2>{{ $t('transactions.title') }}</h2>
        <h4>{{ $t('transactions.caption', [transactionId]) }}</h4>
      </div>
    </div>
    <div class="page-body">
      <TermsContent />
    </div>
  </div>
</template>

<script>
import TermsContent from '@/components/legal/TermsContent.vue'
export default {
  name: 'Terms',
  components: {
    TermsContent
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
