<template>
  <div class="root-page reports">
    <Header />
    <div class="page-container sidebar-page">
      <Sidebar />
      <main class="content-wrap">
        <Reports
          :ready="!$store.state.system.loading"
          :project-id="projectId || null"
          :gateway-id="gatewayId || null"
          :start-date="startDate || null"
          :end-date="endDate || null"
        />
        <Footer />
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/header/Header.vue'
import Sidebar from '@/components/layout/sidebar/Sidebar.vue'
import Footer from '@/components/layout/footer/Footer.vue'
import Reports from '@/components/reports/Reports.vue'

export default {
  name: 'ReportsPage',
  components: {
    Header,
    Sidebar,
    Footer,
    Reports
  },
  props: {
    projectId: String,
    gatewayId: String,
    startDate: String,
    endDate: String
  }
}
</script>

<style lang="css" scoped>
</style>
