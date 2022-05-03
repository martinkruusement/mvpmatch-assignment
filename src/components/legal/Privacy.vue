<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-title">
        <h2>{{ $t('privacy.title') }}</h2>
        <h4>{{ $t('privacy.caption') }}</h4>
      </div>
    </div>
    <div class="page-body">
      <PrivacyContent />
    </div>
  </div>
</template>

<script>
import PrivacyContent from '@/components/legal/PrivacyContent.vue'
export default {
  name: 'Terms',
  components: {
    PrivacyContent
  }
}
</script>
