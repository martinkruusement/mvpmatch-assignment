import { createI18n } from 'vue-i18n'
import { usePreferredLanguages } from '@vueuse/core'
import en from '@/i18n/locales/en.yml'

const messages = {
  en
}

function getDefaultLocale ({ fallback }) {
  const fromLocalStorage = window.localStorage.getItem('locale')
  if (fromLocalStorage && fromLocalStorage in messages) {
    return fromLocalStorage
  }

  const browserLanguages = usePreferredLanguages().value
  for (const lang in messages) {
    if (browserLanguages.includes(lang)) {
      return lang
    }
  }

  return fallback
}

const i18n = createI18n({
  locale: getDefaultLocale({ fallback: 'en' }),
  fallbackLocale: {
    default: 'en'
  },
  messages
})

export default i18n
