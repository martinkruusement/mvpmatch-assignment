<template>
  <div class="section" :class="{open, closed: !open}">
    <div v-if="!noHeader" class="section-header" @click="toggleOpen">
      <div class="title">{{ title }}</div>
      <div class="total">{{ total }}</div>
    </div>
    <BasicTable v-if="open || noHeader" class="table" :rows="table.rows" :columns="table.columns" />
  </div>
</template>

<script>
import appConfig from '@/app-config.yml'
import { convertDateFormat, stripDecimals, separateThousands } from '@/utils.js'
import BasicTable from '@/components/ui/BasicTable.vue'

export default {
  name: 'ReportSection',
  components: {
    BasicTable
  },
  props: {
    data: Object,
    noHeader: Boolean
  },
  data () {
    return {
      open: this.startExpanded
    }
  },
  computed: {
    title () {
      const objectGetter = this.$store.getters[this.data.type]
      const fallbackKey = `${this.data.type}.unknown`
      const object = objectGetter(this.data.id)
      return object?.name || this.$t(fallbackKey)
    },
    total () {
      const currency = appConfig.reports.defaultCurrency
      const number = stripDecimals(separateThousands(this.data.total))
      const i18nKey = 'reports.summary.section.total'
      const text = this.$t(i18nKey, [number, currency])
      return text
    },
    tableColumns () {
      return {
        created: {
          label: this.$t('reports.summary.table.date'),
          types: ['allow-wrap']
        },
        paymentId: {
          label: this.$t('reports.summary.table.paymentId'),
          types: ['center', 'wide', 'ellipsis', 'text-link']
        },
        amount: {
          label: this.$t('reports.summary.table.amount'),
          types: ['right']
        }
      }
    },
    tableRows () {
      const fields = Object.keys(this.tableColumns)
      const unprocessed = this.data.transactions.sorted
      const rows = unprocessed.map(row => fields.reduce((result, field) => {
        let value = row[field]
        if (field === 'created') {
          value = convertDateFormat(value, appConfig.reports.dates.format, appConfig.reports.dates.displayFormat)
        }
        if (field === 'paymentId') {
          result.route = {
            name: 'TransactionDetails',
            params: {
              transactionId: value
            }
          }
        }
        result[field] = value
        return result
      }, {})
      )
      return rows
    },
    table () {
      const columns = this.tableColumns
      const rows = this.tableRows
      return { columns, rows }
    }
  },
  methods: {
    toggleOpen () {
      this.open = !this.open
    }
  }
}
</script>

<style lang="css" scoped>
.section-header {
  background: white;
  border-radius: 10px;
  padding-left: 24px;
  padding-right: 23px;
  height: 71px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 14px;
}
.title {
  font-weight: bold;
  position: relative;
  top: -2px;
}
.total {
  font-weight: bold;
  position: relative;
  top: -2px;
}

.table {
  margin-bottom: 6px;
}

.section.closed .section-header {
  margin-bottom: 0;
}

@media (hover: hover) {
  .section-header:hover {
    color: var(--link-color);
    background: rgba(255,255,255,0.88);
    transition: all 0.2s ease;
  }
}
</style>
