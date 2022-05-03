<template>
  <div class="report-chart">
    <Legend v-if="chart.useCustomLegend" class="legend" :data="chart.series" />
    <div class="pie-top-margin"></div>
    <div class="pie-box">
      <BasicPieChart class="pie-chart" :data="chart" :legend="!chart.useCustomLegend" />
    </div>
    <div class="pie-bottom-margin"></div>
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
.report-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: calc(var(--header-height) + var(--chart-margin));
  min-height: 400px;
  --chart-size: 280px;
  min-width: var(--chart-size);
}
.pie-top-margin {
  width: 100%;
  flex: .5;
  min-height: 10px;
}
.pie-bottom-margin {
  width: 100%;
  flex: .5;
}
.pie-box {
  width: var(--chart-size);
  margin-left: var(--chart-margin);
  margin-right: var(--chart-margin);
  flex: 1;
}
.total {
  margin-top: 10px;
  align-self: flex-end;
}
</style>
