<template>
  <div class="root-page gateways">
    <Header />
    <div class="page-container sidebar-page">
      <Sidebar />
      <main class="content-wrap">
        <Gateways />
        <Footer />
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/header/Header.vue'
import Sidebar from '@/components/layout/sidebar/Sidebar.vue'
import Footer from '@/components/layout/footer/Footer.vue'
import Gateways from '@/components/gateways/Gateways.vue'

export default {
  name: 'GatewaysPage',
  components: {
    Header,
    Sidebar,
    Footer,
    Gateways
  }
}
</script>

<style lang="css" scoped>
</style>
