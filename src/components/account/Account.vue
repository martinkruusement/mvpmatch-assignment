<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-title">
        <h2>{{ account?.name.full }}</h2>
        <h4>{{ $t('account.caption') }}</h4>
      </div>
    </div>
    <PageLoading v-if="false" />
    <div v-else class="page-body">
      <div class="layout-row account-sections">
        <div class="system">
          <h3>System state</h3>
          <JsonViewer :value="systemState" :expand-depth="3" />
        </div>
        <div class="state">
          <h3>Full app state</h3>
          <JsonViewer :value="fullState" :expand-depth="1" />
        </div>
        <div class="debug">
          <h3>Debug settings</h3>
          <br />
          <br />
          <div class="flags">
            <label class="flag">
              <input type="checkbox" class="restore-reset" :checked="$store.state.system.debug.general" @input="$store.commit('toggleDebug',{'general':$event.target.checked})" />
              General global debug flag
            </label>

            <label class="flag">
              <input type="checkbox" class="restore-reset" :checked="$store.state.system.debug.reportLines" @input="$store.commit('toggleDebug',{'reportLines':$event.target.checked})" />
              Report layout debug <router-link :to="{name:'Reports'}" class="text-link" :checked="$store.state.system.debug.reportLines">[here]</router-link> (disable general)
            </label>

            <!--             <label class="flag">
              <input v-commit:toggleDebug.general type="checkbox" class="restore-reset" />
              General global debug flag
            </label> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageLoading from '@/components/misc/PageLoading.vue'

export default {
  name: 'Account',
  components: {
    PageLoading
  },

  computed: {
    account () { return this.$store.getters.account },
    name () {
      const account = this.account
      return account.name.full
    },
    systemState () {
      return this.$store.state.system
    },
    fullState () {
      return this.$store.state
    }
  }
}
</script>

<style scoped>
.flags {
  white-space: nowrap;
  display: flex;
  gap: 20px;
  flex-direction: column;
}
.system {
  max-width: 300px;
}
.account-sections {
  gap: 50px;
}
</style>
