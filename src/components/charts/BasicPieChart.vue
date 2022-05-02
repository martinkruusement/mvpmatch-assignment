<template>
  <div class="pie-chart">
    <ApexChart
      type="donut"
      width="380"
      class="apex-pie-chart"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
// import BasicPieChart from '@/components/charts/BasicPieChart.vue'
import { separateThousands } from '@/utils.js'

import VueApexCharts from 'vue3-apexcharts'
export default {
  name: 'BasicPieChart',
  components: {
    ApexChart: VueApexCharts
  },
  props: {
    data: { type: Object, required: true }, legend: Boolean
  },
  computed: {
    sectors () {
      return [...this.data.series].reverse()
    },
    series () {
      return this.sectors.map(item => item.value)
    },
    chartOptions () {
      const options = {
        colors: this.sectors.map(item => item.color),
        labels: this.sectors.map(item => item.label),
        tooltip: {
          formatter: separateThousands
        },
        legend: this.legend || true,
        plotOptions: {
          pie: {
            donut: {
              size: '50%'
            }
          }
        },
        stroke: {
          width: 3
        },
        dataLabels: {
          dropShadow: {
            enabled: false
          },
          style: {
            fontSize: 16,
            fontWeight: 'medium'
          }
        }
      }
      return options
    }
  }
}
</script>

<style scoped>
.pie-chart {
  position: relative;
  width: 276px;
  height: 276px;
}
.apex-pie-chart {
  position: absolute;
  transform: translate(-53px, -8px);
}
</style>
