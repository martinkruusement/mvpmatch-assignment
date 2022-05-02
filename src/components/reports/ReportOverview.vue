<template>
  <div class="report-overview well left">
    <div class="well-title report-title" :class="{'no-section-header': noHeader}">
      <span>{{ title }}</span>
      <Spinner v-if="report?.refreshing" :size="20" class="refreshing-spinner" />
    </div>
    <div v-if="report?.sections" class="sections">
      <ReportSection
        v-for="(section, id) in report.sections"
        :key="id"
        :data="section"
        :no-header="noHeader"
        :start-expanded="hasExactlyOneSection"
      />
      <JsonViewer v-if="debug" :value="report" />
    </div>
  </div>
</template>

<script>
import ReportSection from '@/components/reports/ReportSection.vue'
import Spinner from '@/components/misc/Spinner.vue'

export default {
  name: 'ReportOverview',
  components: {
    ReportSection,
    Spinner
  },
  props: {
    debug: Boolean,
    data: { type: Object, required: true }
  },
  data () {
    return {
      // TODO: solve this via data provider component slot instead?
      lastLoadedReport: null
    }
  },
  computed: {
    report () {
      return this.data?.loading ? this.lastLoadedReport : this.data
    },
    type () {
      return this.report.type
    },
    title () {
      const report = this.report
      const type = report?.type
      if (!type) {
        return ''
      }

      const key = `reports.summary.title.${type}`
      const interpolations = []

      const section1Getter = this.$store.getters[report.objectType] || null
      const section2Getter = this.$store.getters[report.secondaryObjectType] || null

      if (section1Getter) {
        const entity = section1Getter(report.objectId)
        const fallback = this.$t(`reports.summary.title.unknown.${report.objectType}`)
        interpolations.push(entity?.name || fallback)
      }
      if (section2Getter) {
        const entity = section2Getter(report.secondaryObjectId)
        const fallback = this.$t(`reports.summary.title.unknown.${report.secondaryObjectType}`)
        interpolations.push(entity?.name || fallback)
      }

      const title = this.$t(key, interpolations)

      return title
    },
    hasExactlyOneSection () {
      return this.report.sections.length === 1
    },
    noHeader () {
      return this.report?.type === 'both'
    }

  },
  watch: {
    data: {
      handler: function (report) {
        if (report?.loading === false) {
          this.lastLoadedReport = report
        }
      },
      immediate: true

    }
  }
}
</script>

<style lang="css" scoped>
.sections {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.no-section-header.report-title {
  margin-bottom: 37px;
}
.report-overview {
  position: relative;
}
.refreshing-spinner {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
