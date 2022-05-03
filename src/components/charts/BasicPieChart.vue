<template>
  <div class="pie-chart">
    <div class="apex-pie-container">
      <ApexChart
        type="donut"
        width="380"
        class="apex-pie-chart"
        :options="chartOptions"
        :series="series"
      />
    </div>
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
          y: {
            formatter: (input) => {
              return separateThousands(input)
            }
          }
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
            fontFamily: 'Roboto',
            fontWeight: '500'
          }
        }
      }
      return options
    }
  }
}
</script>

<style scoped>
.apex-pie-chart {
  position: absolute;
  transform: translate(-53px, -8px);
}
.apex-pie-container {
  display: block;
  width: 276px;
  height: 276px;
  position: relative;
}
</style>
