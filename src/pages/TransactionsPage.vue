<template>
  <div class="root-page transactions">
    <Header />
    <div class="page-container sidebar-page">
      <Sidebar />
      <main class="content-wrap">
        <TransactionDetails :transaction-id="transactionId" />
        <Footer />
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/header/Header.vue'
import Sidebar from '@/components/layout/sidebar/Sidebar.vue'
import Footer from '@/components/layout/footer/Footer.vue'
import TransactionDetails from '@/components/transactions/TransactionDetails.vue'

export default {
  name: 'ProjectsPage',
  components: {
    Header,
    Sidebar,
    Footer,
    TransactionDetails
  },
  props: {
    transactionId: String
  }
}
</script>

<style lang="css" scoped>
</style>
