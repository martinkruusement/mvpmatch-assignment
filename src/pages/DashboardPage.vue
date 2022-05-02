<template>
  <div class="root-page dashboard">
    <Header />
    <div class="page-container sidebar-page">
      <Sidebar />
      <main class="content-wrap">
        <Dashboard />
        <Footer />
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/header/Header.vue'
import Sidebar from '@/components/layout/sidebar/Sidebar.vue'
import Footer from '@/components/layout/footer/Footer.vue'
import Dashboard from '@/components/dashboard/Dashboard.vue'

export default {
  name: 'DashboardPage',
  components: {
    Header,
    Sidebar,
    Footer,
    Dashboard
  }
}
</script>

<style lang="css" scoped>
</style>
