<template>
  <div class="footer">
    <nav class="links">
      <router-link class="text-link" :to="{name: 'Terms'}">{{ $t('footer.links.toc') }}</router-link>
      <div class="separator">|</div>
      <router-link class="text-link" :to="{name: 'Privacy'}">{{ $t('footer.links.privacy') }}</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="css" scoped>
.footer {
  padding: 22px 0;
}
.links {
  display: flex;
  gap: .333em;
  font-weight: bold;
}
.separator {
  color: var(--link-color);
}
</style>
