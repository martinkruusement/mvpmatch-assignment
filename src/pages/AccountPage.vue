<template>
  <div class="root-page account">
    <Header />
    <div class="page-container sidebar-page">
      <Sidebar />
      <main class="content-wrap">
        <Account />
        <Footer />
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/header/Header.vue'
import Sidebar from '@/components/layout/sidebar/Sidebar.vue'
import Footer from '@/components/layout/footer/Footer.vue'
import Account from '@/components/account/Account.vue'

export default {
  name: 'AccountPage',
  components: {
    Header,
    Sidebar,
    Footer,
    Account
  }
}
</script>

<style lang="css" scoped>
</style>
