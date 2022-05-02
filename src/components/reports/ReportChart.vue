<template>
  <div class="report-chart">
    <Legend v-if="chart.useCustomLegend" class="legend" :data="chart.series" />
    <BasicPieChart :data="chart" :legend="!chart.useCustomLegend" />
    <ReportTotal class="total">{{ total }}</ReportTotal>
  </div>
</template>

<script>
import BasicPieChart from '@/components/charts/BasicPieChart.vue'
import Legend from '@/components/charts/Legend.vue'
import ReportTotal from '@/components/reports/ReportTotal.vue'

export default {
  name: 'ReportChart',
  components: {
    BasicPieChart,
    Legend,
    ReportTotal
  },
  props: {
    data: Object,
    total: String
  },
  data () {
    return {
      useCustomLegend: true
    }
  },
  computed: {
    chart () {
      const chart = {
        useCustomLegend: this.useCustomLegend,
        series: []
      }
      for (const sect of this.data.sectors) {
        const objectGetter = this.$store.getters[sect.type]
        const fallbackKey = `${sect.type}.unknown`
        const object = objectGetter(sect.id)
        const name = object?.name || this.$t(fallbackKey)
        chart.series.push({ label: name, color: sect.color, value: sect.value })
      }
      return chart
    }
  }
}
</script>

<style lang="css" scoped>
.legend {
  margin-bottom: 10px;
}
.report-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: var(--header-offset);
  min-height: 400px;
}
@media (min-width: 850px) {
  .report-chart {
/*  // TODO: magic science after keeping track of page-header height */
    max-height: calc(100vh - var(--header-offset) - 95px + min(var(--scroll-offset-y), 80px));
  }
}
.total {
  margin-top: 10px;
}
</style>
