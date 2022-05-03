<template>
  <div class="root-page legal">
    <Header />
    <div class="page-container legal-page">
      <main class="content-wrap">
        <router-view />
        <Footer />
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/header/Header.vue'
import Footer from '@/components/layout/footer/Footer.vue'
import '@/css/legal.css'

export default {
  name: 'ProjectsPage',
  components: {
    Header,
    Footer
  },
  props: {
    transactionId: String
  }
}
</script>
