<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-title">
        <h2>{{ $t('terms.title') }}</h2>
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
  }
}
</script>
