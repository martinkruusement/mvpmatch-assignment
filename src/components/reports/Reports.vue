<template>
  <div v-element-size="bodyResizeHandler" class="page-content">
    <div v-element-size="headResizeHandler" class="page-head">
      <div class="page-title">
        <h2>{{ $t('reports.title') }}</h2>
        <h4>{{ $t('reports.caption') }}</h4>
      </div>
      <div class="page-controls report-controls">
        <div class="dropdown-group">
          <Dropdown
            v-model="fields.projectId"
            :items="projects"
            value-prop="projectId"
            label-prop="name"
            :null-item-label="$t('reports.filter.projects.all')"
            :disabled="controls.project.disabled"
            :placeholder="$t('reports.filter.projects.placeholder')"
            :empty-text="$t('reports.filter.projects.empty')"
          />
          <Dropdown
            v-model="fields.gatewayId"
            :items="gateways"
            value-prop="gatewayId"
            label-prop="name"
            :null-item-label="$t('reports.filter.gateways.all')"
            :disabled="controls.gateway.disabled"
            :placeholder="$t('reports.filter.gateways.placeholder')"
            :empty-text="$t('reports.filter.gateways.empty')"
          />
        </div>
        <DateRange
          v-model="fields.dates"
          :min-date="$store.state.reports.config.minDate"
          :max-date="$store.state.reports.config.maxDate"
          :need-both="controls.datePicker.needBoth"
          :start-placeholder="$t('reports.filter.datePicker.placeholder.start')"
          :end-placeholder="$t('reports.filter.datePicker.placeholder.end')"
          :combined-placeholder="$t('reports.filter.datePicker.placeholder.combined')"
        />
        <BasicButton
          :disabled="controls.generate.disabled"
          :loading="controls.generate.loading"
          :label="fetchButtonText"
          @click="loadReport"
        />
      </div>
    </div>

    <PageLoading v-if="!ready" />

    <EmptyReportBlock
      v-else-if="!emptyReportFinished || (!report.loading && report?.empty === true)"
      :needed="report?.empty === true"
      :title="$t('reports.emptyReport.title')"
      :caption="$t('reports.emptyReport.caption')"
      @animation-started="startEmptyAnimation"
      @animation-finished="endEmptyAnimation"
    />

    <div v-else-if="report" class="page-body">
      <div class="layout-row report-content">
        <ReportOverview class="report-overview" :data="report" />
        <ReportChart v-if="report.type !== 'both' && report.sections.length" class="report-chart" :data="report.pieChart" :total="total" />
      </div>
      <ReportTotal v-if="report.type === 'both'" class="report-total">{{ total }}</ReportTotal>
    </div>

    <div v-if="debug" style="padding: 2em;" class="debug-links layout-row">
      <pre>Emtpy state animation:</pre>
      <JsonViewer
        v-if="debug"
        :value="{
          'v-if': !emptyReportFinished || report?.empty === true,
          ':needed': report?.empty === true,
          'emptyReportFinished': emptyReportFinished
        }"
      />

      <JsonViewer :value="{reportFields, reportProps, report}" />
      <br />

      <router-link :to="{name: 'Reports'}">Reports home</router-link>
      <router-link :to="{name: 'Reports.Project', params:{projectId:'bgYhx'}}">Project</router-link>
      <router-link :to="{name: 'Reports.Project', params:{projectId:'1nval1d'}}">Project (invalid)</router-link>
      <router-link :to="{name: 'Reports.Project.Time', params:{project: 'bgYhx',startDate: '2021-01-01', endDate:'2021-12-31'}}">Project.Time</router-link>
      <router-link :to="{name: 'Reports.Project.Time', params:{project: null, startDate: '2021-01-01', endDate:'2021-12-31'}}">Project.Time (project null)</router-link>
      <router-link :to="{name: 'Reports.Project.Time', params:{project: 'bgYhx',startDate: '2021-01-01'}}">Project.Time (start-only)</router-link>
      <router-link :to="{name: 'Reports.Project.Time', params:{project: 'bgYhx',startDate:'2021-22-25'}}">Project.Time (start-only, invalid month)</router-link>
      <router-link :to="{name: 'Reports.Project.Time', params:{project: 'bgYhx',startDate:'2021-2225'}}">Project.Time (start-only, invalid format)</router-link>
      <router-link :to="{name: 'Reports.Project.Time', params:{project: 'bgYhx',startDate:'2021-02-30'}}">Project.Time (start-only, non-calendar date feb 30th)</router-link>
      <router-link :to="{name: 'Reports.Project.Time', params:{project: 'bgYhx',startDate:'2021-02-29'}}">Project.Time (start-only, leap on non-leap year)</router-link>
      <router-link :to="{name: 'Reports.Project.Time', params:{project: 'bgYhx', endDate:'2021-12-30'}}">Project.Time (end-only)</router-link>

      <router-link :to="{name: 'Reports.Gateway', params:{}}">Gateway</router-link>
      <router-link :to="{name: 'Reports.Gateway', params:{gatewayId:'invalid'}}">Gateway (invalid)</router-link>
      <router-link :to="{name: 'Reports.Gateway', params:{projectId:'bgYhx'}}">Gateway (with only projectId)</router-link>
      <router-link :to="{name: 'Reports.Gateway.Time', params:{project: 'bgYhx',gateway: 'GzFF8', startDate: '2021-01-01', endDate:'2021-12-31'}}">Gateway.Time</router-link>
      <router-link :to="{name: 'Reports.Gateway.Time', params:{project: 'bgYhx',gateway: 'GzFF8', startDate: '2021-01-01'}}">Gateway.Time (start-only)</router-link>
      <router-link :to="{name: 'Reports.Gateway.Time', params:{project: 'bgYhx',gateway: 'GzFF8', endDate:'2021-12-31'}}">Gateway.Time (end-only)</router-link>

      <router-link :to="{name: 'Reports.Project.Gateway.Time', params:{project: 'bgYhx',gateway: 'GzFF8', startDate: '2021-01-01', endDate:'2021-12-31'}}">Project+Gateway.Time</router-link>
      <router-link :to="{name: 'Reports.Project.Gateway.Time', params:{project: 'bgYhx',gateway: 'GzFF8', startDate: '2021-01-01'}}">Project+Gateway.Time (start-only)</router-link>
      <router-link :to="{name: 'Reports.Project.Gateway.Time', params:{project: 'bgYhx',gateway: 'GzFF8', endDate:'2021-12-31'}}">Project+Gateway.Time (end-only)</router-link>

      <router-link :to="{name: 'Reports.Time', params:{}}">Time (no params)</router-link>
      <router-link :to="{name: 'Reports.Time', params:{startDate: '2021-01-01', endDate:'2021-12-31'}}">Time (none)</router-link>
      <router-link :to="{name: 'Reports.Time', params:{startDate: '2021-01-01'}}">Time (start-only)</router-link>
      <router-link :to="{name: 'Reports.Time', params:{endDate: '2021-10-01'}}">Time (end-only)</router-link>
      <router-link :to="{name: 'Reports.Time', params:{startDate: '2021-10-01',endDate: '2021-08-01'}}">Time end earlier than start</router-link>
      <router-link :to="{name: 'Reports.Time', params:{startDate: '2000-10-01'}}">Time too early</router-link>
      <router-link :to="{name: 'Reports.Time', params:{endDate: '2023-10-01'}}">Time end only, too late</router-link>
    </div>
    <div v-if="reportLines" class="debugbox debugbox-99"></div>
    <div v-if="reportLines" class="debugbox debugbox-98"></div>
    <div v-if="reportLines" class="debugbox debugbox-97"></div>
    <div v-if="reportLines" class="debugbox debugbox-96"></div>
    <div v-if="reportLines" class="debugbox debugbox-95"></div>

    <div v-if="reportLines" class="debugbox debugbox3"></div>
  </div>
</template>

<script>
import { stripDecimals, separateThousands } from '@/utils.js'
import appConfig from '@/app-config.yml'
import { buildReportId } from '@/functions/reports.js'
import { vElementSize } from '@vueuse/components'

import ReportOverview from '@/components/reports/ReportOverview.vue'
import ReportChart from '@/components/reports/ReportChart.vue'
import ReportTotal from '@/components/reports/ReportTotal.vue'
import PageLoading from '@/components/misc/PageLoading.vue'
import Dropdown from '@/components/forms/Dropdown.vue'
import BasicButton from '@/components/buttons/BasicButton.vue'
import DateRange from '@/components/forms/DateRange.vue'
import EmptyReportBlock from '@/components/reports/EmptyReportBlock.vue'

export default {
  name: 'Reports',
  components: {
    ReportOverview,
    ReportChart,
    PageLoading,
    Dropdown,
    DateRange,
    EmptyReportBlock,
    BasicButton,
    ReportTotal
  },
  directives: {
    elementSize: vElementSize
  },
  props: {
    ready: Boolean,
    projectId: String,
    gatewayId: String,
    startDate: String,
    endDate: String
  },
  data () {
    return {
      enableDebugEmptyReportOverride: false,
      debugEmptyReportOverride: false,
      debugEmptyReportOverrideInterval: false,
      emptyReportFinished: true,
      fields: {
        projectId: this.projectId,
        gatewayId: this.gatewayId,
        dates: {
          startDate: this.startDate,
          endDate: this.endDate
        }
      },
      domDimensions: {
        body: { width: 0, height: 0 },
        head: { width: 0, height: 0 }
      }
    }
  },
  computed: {
    debug () {
      return this.$store.state.system.debug.general
    },
    reportLines () {
      return this.$store.state.system.debug.reportLines
    },
    noFilterApplied () {
      return this.$router.currentRoute.value.name === 'Reports'
    },
    fetchButtonText () {
      if (this.noFilterApplied) {
        return this.$t('reports.filter.fetch.default')
      }
      return this.$t('reports.filter.fetch.refresh')
    },
    reportProps () {
      return {
        projectId: this.projectId,
        gatewayId: this.gatewayId,
        startDate: this.startDate,
        endDate: this.endDate
      }
    },
    reportFields () {
      return {
        projectId: this.fields.projectId,
        gatewayId: this.fields.gatewayId,
        startDate: this.fields.dates.startDate,
        endDate: this.fields.dates.endDate
      }
    },
    reportKey () {
      return buildReportId(this.reportFields)
    },
    report () {
      const raw = this.$store.getters.processedTransactions(this.reportKey)
      const fields = this.reportFields
      const projectId = fields.projectId
      const gatewayId = fields.gatewayId

      const report = {
        type: null,
        loading: raw.loading,
        refreshing: raw.refreshing,
        empty: !raw.transactions.sorted.length,
        fields,
        objectId: null, // project or gateway id
        objectType: null, // 'project' | 'gateway'
        secondaryObjectId: null, // gateway id if project+gateway report
        secondaryObjectType: null,
        total: 0,
        sections: [],
        pieChart: {
          sectors: []
        }
      }

      let rawSections = {}
      let source = {}
      let sectionType = 'gateway'

      if (projectId && !gatewayId) {
        report.type = 'project'
        report.objectType = 'project'
        sectionType = 'gateway'
        report.objectId = projectId
      }
      if (gatewayId && !projectId) {
        report.type = 'gateway'
        report.objectType = 'gateway'
        report.objectId = gatewayId
        sectionType = 'project'
      }
      if (projectId && gatewayId) {
        report.type = 'both'
        report.objectId = projectId
        report.objectType = 'project'
        report.secondaryObjectId = gatewayId
        report.secondaryObjectType = 'gateway'
      }
      if (!projectId && !gatewayId) {
        report.type = 'none'
        sectionType = 'project'
      }

      if (report.loading || report.empty) {
        return report
      }

      switch (report.type) {
        case 'project':
          source = raw.projects[projectId]
          rawSections = source.gateways
          break
        case 'gateway':
          source = raw.gateways[gatewayId]
          rawSections = source.projects
          break
        case 'both':
          source = raw.projects[projectId]
          rawSections = raw.projects[projectId].gateways
          break
        case 'none':
          source = raw
          rawSections = raw.projects
          break
      }

      report.total = source.total

      let colors = [...appConfig.chart.colors]
      const sections = []

      // Build subsections
      for (const [sectionId, sect] of Object.entries(rawSections)) {
        if (!colors.length) {
          // TODO: generate new colors based on existing palette
          // Recycling the 4 for now
          colors = [...appConfig.chart.colors]
        }
        const color = colors.shift()

        const section = {
          total: sect.total,
          type: sectionType,
          id: sectionId,
          transactions: sect.transactions,
          proportionOfTotal: sect.total / report.total
        }
        sections.push(section)

        // Pie chart
        const sector = {
          type: sectionType,
          id: sectionId,
          normalizedValue: section.proportionOfTotal,
          value: section.total,
          color
        }
        report.pieChart.sectors.push(sector)
      }

      report.sections = sections

      return report
    },
    total () {
      const report = this.report
      if (report.loading) {
        return ''
      }
      const currency = appConfig.reports.defaultCurrency
      const number = separateThousands(stripDecimals(report.total))
      const i18nKey = `reports.summary.total.${report.type}`
      const text = this.$t(i18nKey, [number, currency])
      return text
    },
    debugdata () {
      return null
      // return this.$store.state
    },
    projects () {
      return this.$store.state.projects.projects
    },
    gateways () {
      return this.$store.state.gateways.gateways
    },
    projectSelectionDisabled () {
      const loading = this.$store.state.projects.loading
      const hasItems = this.$store.getters.projectsCount > 0
      return !this.ready || loading || !hasItems
    },
    gatewaySelectionDisabled () {
      const loading = this.$store.state.gateways.loading
      const hasItems = this.$store.getters.gatewaysCount > 0
      return !this.ready || loading || !hasItems
    },
    controls () {
      const project = {
        options: this.projects,
        disabled: this.projectSelectionDisabled,
        empty: this.$store.getters.projectsCount === 0,
        value: this.reportProps.project
      }

      const gateway = {
        options: this.gateways,
        disabled: this.gatewaySelectionDisabled,
        empty: this.$store.getters.gatewaysCount === 0,
        value: this.reportProps.gateway
      }

      const datePicker = {
        needBoth: !!this.reportProps.endDate
      }

      const compact = true
      const generate = {
        disabled: !this.ready || this.$store.state.reports.reports.loading,
        loading: this.$store.state.reports.loading[this.reportKey],
        compact
      }

      return { project, gateway, generate, datePicker }
    }
  },
  watch: {
    reportProps: {
      handler: function (props) {
        this.fields.projectId = props.projectId
        this.fields.gatewayId = props.gatewayId
        this.fields.dates.startDate = props.startDate
        this.fields.dates.endDate = props.endDate
      },
      immediate: true
    },
    reportFields: {
      handler: function (props) {
        this.loadReport()
      },
      immediate: true
    }
  },
  created () {
    if (!this.enableDebugEmptyReportOverride) {
      this.debugEmptyReportOverride = true
      this.debugEmptyReportOverrideInterval = setInterval(() => { this.debugEmptyReportOverride = !this.debugEmptyReportOverride }, 2500)
    }
  },
  methods: {
    loadReport () {
      const fields = this.reportFields
      const params = {}
      this.$store.dispatch('loadReport', this.reportFields)

      let routeName = 'Reports'
      if (fields.projectId) {
        routeName += '.Project'
        params.projectId = fields.projectId
      }
      if (fields.gatewayId) {
        routeName += '.Gateway'
        params.gatewayId = fields.gatewayId
      }
      if (fields.startDate || fields.endDate) {
        routeName += '.Time'
      }
      if (fields.startDate) {
        params.startDate = fields.startDate
      }
      if (fields.endDate) {
        params.endDate = fields.endDate
      }

      this.$router.push({ name: routeName, params })
    },
    startEmptyAnimation () {
      this.emptyReportFinished = false
    },
    endEmptyAnimation () {
      this.emptyReportFinished = true
    },
    bodyResizeHandler ({ width, height }) {
      this.$store.dispatch('updateScrollPosition')
      this.domDimensions.body.width = width
      this.domDimensions.body.height = height
    },
    headResizeHandler ({ width, height }) {
      this.$store.dispatch('updateScrollPosition')
      this.domDimensions.head.width = width
      this.domDimensions.head.height = height
    }
  }
}
</script>

<style lang="css" scoped>
.page-content {
  --page-head-height: v-bind("domDimensions.head.height + 'px'");
  --content-height: v-bind("domDimensions.body.height + 'px'");
  --page-head-offset: calc(var(--page-head-height) + var(--page-head-bottom-margin));
  /*
  --page-available-height: calc(100vh - var(--header-offset) - var(--common-gap) - var(--common-gap));

  --scroll-compensation: calc(min(calc(var(--scroll-offset-y)), calc(var(--header-offset) - var(--chart-margin))) -  var(--safearea-compensation));
  --chart-max-height: calc(100vh - var(--header-offset) - var(--page-head-offset) + var(--scroll-compensation) - var(--chart-margin));

  --head-visible-height: max(calc(var(--header-offset) + var(--page-head-offset) - var(--scroll-offset-y) - var(--header-offset)), 0px);

  --distance-from-top: calc(var(--header-offset) + var(--head-visible-height));
*/
/*  --top-distance: calc(var(--header-and-border) + var(--top-comp) + 20px);*/
  --top-offset: calc(var(--page-head-offset) + var(--header-offset));
  --top-edge: max(calc(var(--top-offset) - var(--scroll-offset-y)), 0px);
  --top-comp: calc(var(--header-and-border) - var(--top-edge) + var(--chart-margin));
  --top-limit: calc(var(--top-edge) + var(--top-comp));
  --top-distance: max(var(--top-limit), var(--top-edge));
  --all-content-height: calc(var(--header-offset) + var(--content-height));

  --bottom-distance: max(calc(var(--scroll-offset-y) - var(--all-content-height) + 100vh ), var(--chart-margin));

  --chart-max-height: calc(100vh - var(--top-distance) - var(--bottom-distance));
}
.report-chart {
  max-height: var(--chart-max-height);
  flex: .457;
}

.debugbox-99 {
  height: var(--top-offset);
  background: purple; top: 0;
}
.debugbox-98 {
  height: var(--top-edge);
  background: purple; top: 0;
}
.debugbox-97 {
  height: var(--top-comp);
  background: green; top: 0;
}
.debugbox-96 {
  height: var(--top-limit);
  background: red; top: 0;
}
.debugbox-95 {
  height: var(--top-distance);
  background: pink; top: 0;
}
.debugbox3 {
  height: var(--bottom-distance);
  background: orange; bottom:0;
}

.debugbox-99 {
  z-index: 1000000;
  position: fixed;
  right: 300px;
  width: 10px;
  border: 5px solid cyan;
}
.debugbox-98 {
  z-index: 1000000;
  position: fixed;
  right: 280px;
  width: 10px;
}
.debugbox-97 {
  z-index: 1000000;
  position: fixed;
  right: 260px;
  width: 10px;
}
.debugbox-96 {
  z-index: 1000000;
  position: fixed;
  right: 240px;
  width: 10px;
}
.debugbox-95 {
  z-index: 1000000;
  position: fixed;
  right: 220px;
  width: 10px;
}
.debugbox3 {
  z-index: 1000000;
  position: fixed;
  right: 250px;
  width: 10px;
}

.debug-links {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2em;
}

.report-overview {
  flex: 1;
}

.report-controls{
  gap: 23px;
  justify-content: flex-end;
}

.report-total {
  margin-top: 27px;
}

.report-controls{
 align-items: flex-start;
}

.dropdown-group {
  display: flex;
  gap: inherit;
}

.report-content{
  min-height: 61.8vh;
}
@media (max-width: 768px) {
  .report-content{
    flex-direction: column;
  }
}
@media (max-width: 1200px) {
  .page-head{
    flex-direction: column;
  }
  .report-controls {
    margin-top: 1em;
    justify-content: flex-start;
  }
}

</style>
