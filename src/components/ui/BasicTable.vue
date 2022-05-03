<template>
  <div class="basic-table">
    <table v-if="!empty" :class="{empty}">
      <thead>
        <tr>
          <th v-for="(col, l) in columns" :key="l" :class="col.types">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, r) in rows" :key="r" class="row">
          <td
            v-for="(col, field) in columns"
            :key="`${r}-${field}`"
            :class="col.types"
          >
            <div v-if="row.route">
              <router-link :to="row.route">{{ row[field] }}</router-link>
            </div>
            <div v-else>{{ row[field] }}</div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="empty">
      <div class="empty-label">No data</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BasicTable',
  props: {
    columns: Object,
    rows: Object
  },
  computed: {
    empty () {
      return !this.rows || !this.rows.length
    }
  }

}
</script>

<style lang="css" scoped>
table {
  width: 100%;
}

.empty-label {
  font-size: 1.2em;
  font-weight: bold;
  text-transform: uppercase;
  opacity: 0.2;
  text-align: center;
}
table, table * {
}

td, th {
/*  white-space: break-word;*/
  vertical-align: middle;
  height: 2.1875em;
  padding: 4px 8px;
}
td:first-child, th:first-child {
   padding-left: 21px
}
td:last-child, th:last-child {
   padding-right: 21px
}
tbody tr:nth-child(odd) td {
  height: 2.8125em;
}
thead th,
tbody tr:nth-child(even) td {
    background: white;
}

/* Cell types  */
.left {
  text-align: left;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
.wide {
  width: 100%;
}
tbody .ellipsis {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}
tbody .ellipsis span {
  position: absolute;
  left: 0;right: 0;
  padding-left: inherit;
  padding-right: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.allow-wrap {

}

</style>
