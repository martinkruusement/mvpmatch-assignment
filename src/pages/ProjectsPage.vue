<template>
  <div class="root-page projects">
    <Header />
    <div class="page-container sidebar-page">
      <Sidebar />
      <main class="content-wrap">
        <Projects />
        <Footer />
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/header/Header.vue'
import Sidebar from '@/components/layout/sidebar/Sidebar.vue'
import Footer from '@/components/layout/footer/Footer.vue'
import Projects from '@/components/projects/Projects.vue'

export default {
  name: 'ProjectsPage',
  components: {
    Header,
    Sidebar,
    Footer,
    Projects
  }
}
</script>

<style lang="css" scoped>
</style>
