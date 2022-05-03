<template>
  <Head>
    <html :lang="meta.locales.current" />
    <meta property="og:locale" :content="meta.locales.current" />
    <meta v-for="locale in meta.locales.other" :key="locale" property="og:locale:alternate" :content="locale" />

    <title>{{ meta.title }}</title>
    <meta name="description" :content="meta.description" />

    <meta property="og:title" :content="meta.title" />
    <meta name="twitter:title" :content="meta.title" />

    <meta property="og:description" :content="meta.description" />
    <meta name="twitter:description" :content="meta.description" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta property="og:type" content="website" />

    <meta property="og:site_name" :content="meta.siteName" />
    <meta name="twitter:site" :content="meta.twitter.handle" />
    <link rel="canonical" :href="meta.url" />
    <meta property="og:url" :content="meta.url" />

    <meta property="og:image" :content="meta.og.image" />
    <meta property="twitter:image" :content="meta.twitter.image" />
  </Head>
  <div id="app-container" :class="classes">
    <router-view />
    <DialogContainer />
    <Notifications />
  </div>
</template>

<script>
import '@/css/reset.css'
import '@/css/global.css'
import '@/css/layout.css'
import '@/css/typography.css'
import '@/css/forms.css'
import { Head } from '@vueuse/head'
import DialogContainer from '@/components/dialogs/DialogContainer.vue'
import Notifications from '@/components/notifications/Notifications.vue'

export default {
  name: 'App',
  components: {
    Head,
    Notifications,
    DialogContainer
  },
  data () {
    return {
      scrollOffsetY: 0,
      scrollUpdateUnsubscribe: null
    }
  },
  computed: {
    classes () {
      return {}
    },
    locales () {
      const all = this.$i18n.availableLocales.map(locale => this.$t('lang.code', locale))
      const current = this.$t('lang.code')
      const other = all.filter(locale => locale !== current)

      return {
        all,
        current,
        other
      }
    },
    meta () {
      const meta = {
        title: this.routeMeta.title || this.defaultMeta.title,
        description: this.routeMeta.description || this.defaultMeta.description,
        siteName: this.routeMeta.siteName || this.defaultMeta.siteName,
        locales: {
          current: this.locales.current,
          other: this.locales.other
        },
        og: {
          image: this.routeMeta.ogImage || this.defaultMeta.ogImage
        },
        twitter: {
          handle: '@mr_kruusement',
          image: this.routeMeta.twitterImage || this.defaultMeta.twitterImage
        },
        url: window.location.origin + this.$router.currentRoute.value.fullPath
      }

      return meta
    },
    routeMeta () {
      const meta = {
        title: this.getMetaFromRouter('title'),
        description: this.getMetaFromRouter('description'),
        ogImage: this.getMetaFromRouter(['ogImage', 'preview']),
        twitterImage: this.getMetaFromRouter(['ogImage', 'preview'])
      }
      return meta
    },
    defaultMeta () {
      const meta = {
        title: this.$te('default.meta.title') ? this.$t('default.meta.title') : null,
        description: this.$te('default.meta.description') ? this.$t('default.meta.description') : null,
        ogImage: this.$te('default.meta.ogImage') ? this.$t('default.meta.ogImage') : null,
        twitterImage: this.$te('default.meta.twitterImage') ? this.$t('default.meta.twitterImage') : null
      }
      if (!meta.ogImage) {
        meta.ogImage = this.$te('default.meta.preview') ? this.$t('default.meta.preview') : null
      }
      if (!meta.twitterImage) {
        meta.twitterImage = this.$te('default.meta.preview') ? this.$t('default.meta.preview') : null
      }
      return meta
    }
  },
  beforeMount () {
    this.$store.dispatch('authenticate')
    window.addEventListener('scroll', this.onScroll)
    this.scrollUpdateUnsubscribe = this.$store.subscribeAction(action => {
      if (action.type === 'updateScrollPosition') {
        this.scrollOffsetY = window.scrollY + 'px'
      }
    })
  },
  mounted () {
    this.onScroll()
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.onScroll)
    this.scrollUpdateUnsubscribe()
  },
  methods: {
    getMetaFromRouter (key) {
      let keys = key
      if (typeof keys === 'string') {
        // Force array to support fallbacks in order of descending priority
        keys = [key]
      }
      const routes = [...this.$router.currentRoute.value.matched].reverse()
      for (const route of routes) {
        if (!('i18nPath' in route.meta)) {
          continue
        }
        for (const k of keys) {
          if (this.$te(`${route.meta.i18nPath}.${k}`)) {
            return this.$t(`${route.meta.i18nPath}.${k}`)
          }
        }
      }
    },
    onScroll () {
      // TODO: worth throttling?
      this.scrollOffsetY = window.scrollY + 'px'
    }
  }
}
</script>

<style>
#app-container {
  --scroll-offset-y: v-bind(scrollOffsetY);
}
</style>
