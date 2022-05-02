<template>
  <div class="dropdown-container" :class="classes">
    <div v-click-outside="clickOutsideConfig" class="dropdown">
      <div class="current" @click="toggle">
        <div v-if="!count" class="label">{{ emptyText }}</div>
        <div v-else-if="!selectedItem" class="label">{{ placeholderText }}</div>
        <div v-else class="label">{{ selectedItem.label }}</div>
        <div class="icon">
          <svg class="icon-arrow" width="16.14" height="9.51" viewBox="0 0 16.14 9.51">
            <path d="M7.968,18.253a1.432,1.432,0,0,1-1.022-.429,1.5,1.5,0,0,1-.01-2.1l5.474-5.535L6.944,4.652a1.5,1.5,0,0,1,0-2.109,1.433,1.433,0,0,1,2.049,0L15.65,9.274a1.3,1.3,0,0,1,0,1.817L8.992,17.822A1.432,1.432,0,0,1,7.968,18.253Z" transform="translate(18.253 -6.511) rotate(90)" fill="#435152" />
          </svg>
          <svg class="icon-triangle" width="24" height="24" viewBox="0 0 24 24">
            <g transform="translate(-1577 4005)">
              <path d="M8.71,11.71,11.3,14.3a1,1,0,0,0,1.41,0l2.59-2.59A1,1,0,0,0,14.59,10H9.41A1,1,0,0,0,8.71,11.71Z" transform="translate(1577 -4005)" fill="#435152" />
            </g>
          </svg>
        </div>
      </div>
      <div class="items">
        <div
          v-for="item in parsedItems"
          :key="item.value"
          class="item"
          :class="{selected: item.selected, hidden: item.hidden}"
          @click="()=>{select(item.value)}"
        >
          <div class="divider"></div>
          <div class="content">
            <div class="label">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Dropdown from '@/components/forms/Dropdown.vue'
// <Dropdown v-model="variable" disabled :items="variable" placeholder="" emptyText="" value="projectId", label="name/>

import { sortObjectsInArray, cssUnits } from '@/utils.js'
import vClickOutside from 'click-outside-vue3'

export default {
  name: 'Dropdown',
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    disabled: Boolean,
    modelValue: String,
    nullItemLabel: String,
    items: { type: Object, default: () => { return {} } },
    placeholder: { type: String, default: 'Choose...' },
    emptyText: { type: String, default: 'No items' },
    valueProp: { type: String, default: 'value' },
    labelProp: { type: String, default: 'label' },
    sortProp: { type: String, default: 'timestamp' },
    radius: { type: [String, Number], default: 5 },
    activeRadius: { type: [String, Number], default: 8 }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      open: false,
      clickOutsideConfig: {
        handler: this.clickOutside,
        capture: true
      }
    }
  },
  computed: {
    classes () {
      return {
        open: this.open,
        closed: !this.open
      }
    },
    css () {
      const css = {
        radius: cssUnits(this.radius, 'px').css,
        activeRadius: cssUnits(this.activeRadius, 'px').css
      }
      return css
    },
    isDisabled () {
      return this.disabled || !this.count
    },
    placeholderText () {
      return this.count ? this.placeholder : this.emptyText
    },
    count () {
      return this.parsedItems.length
    },
    parsedItems () {
      try { Object.keys(this.items) } catch { return [] }

      const items = []
      if (this.nullItemLabel) {
        items.push({
          value: null,
          label: this.nullItemLabel,
          selected: this.modelValue === null
        })
      }

      for (const [id, itemData] of Object.entries(this.items)) {
        let value = this.valueProp in itemData && itemData[this.valueProp]
        let label = this.labelProp in itemData && itemData[this.labelProp]
        if (!label) {
          label = this.valueProp in itemData ? itemData[this.valueProp] : id
        }
        if (!value) {
          value = this.labelProp in itemData ? itemData[this.labelProp] : id
        }

        const item = {
          value,
          label,
          selected: value === this.modelValue
        }

        if ('route' in itemData) {
          item.route = itemData.route
        }

        items.push(item)
      }

      const sorted = items
      if (this.sortProp) {
        sortObjectsInArray(items, this.sortProp)
      }

      // TODO: secondary sort key
      // TODO: fallback sort by item.label or item.value

      const indexed = sorted.map((item, index) => {
        item.index = index
        return item
      })

      if (indexed[0].selected) {
        indexed[0].hidden = true
      }

      return indexed
    },
    selectedItem () {
      return this.parsedItems.find(item => item.selected)
    }

  },
  methods: {
    close () {
      this.open = false
    },
    toggle () {
      this.open = !this.open
    },
    select (value) {
      this.$emit('update:modelValue', value)
      this.close()
    },
    clickOutside (e) {
      if (this.open) {
        e.stopPropagation()
        this.close()
      }
    }
  }
}
</script>

<style lang="css" scoped>
.dropdown-container {
    display: block;
    text-align: left;
    height: 40px;
    user-select: none;
    position: relative;
    z-index: 1;
}

.dropdown {
    border-radius: v-bind(css.radius);
    position: relative;
    display: flex;
    flex-flow: column;
    transition: all 0.15s ease;
    border: 1px solid #435152;
}

.label {
    white-space: nowrap;
}

.current {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 11px 7px 15px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.1s ease;
}
.current:active {
    background-color: rgba(0,0,0,0.015);
}
.current .label {
    font-size: 16px;
    line-height: 20px;
    margin-right: 12px;
}

.items {
    display: none;
    flex-flow: column;
    padding-top: 8px;
    padding-bottom: 9px;
}

.item .content {
    margin-left: -1px;
    margin-right: -1px;
    padding-left: 18px;
    padding-right: 16px;
    transition: all 0.17s ease-in-out;
    cursor: pointer;
}
.item .content .label {
    font-size: 16px;
    line-height: 40px;
    transition: all 0.15s ease;
}

.item .divider {
    margin-left: 17px;
    margin-right: 15px;
    height: 1px;
    border-bottom: 1px solid #D7DDDD;
}

.selected {
    pointer-events: none;
}
.selected .label {
    opacity: 0.2;
}

.icon,
.icon svg,
.icon path {
    transition: all 0.17s ease-in-out;
}

.icon-arrow {
  display: none;
}
.icon .icon-arrow {
    position: relative;
    top: 0.5px;
}

.dropdown-container.open .dropdown {
    border-color: transparent;
    box-shadow: 0 3px 6px rgba(0,0,0,.15);
    background-color: white;

    background-color: rgba(255,255,255,0.88);
    backdrop-filter: saturate(1.8) blur(16px);
    border-radius: v-bind(css.activeRadius);
;
}
.dropdown-container.open .dropdown .icon path {
    fill: #E77423;
}
.dropdown-container.open .dropdown .icon svg {
    transform: rotate(180deg);
}
.dropdown-container.open .dropdown .items {
    display: flex;
}

.item.hidden {
  display: none;
}

@media (hover: hover) {
  .dropdown-container.closed .dropdown:hover {
      border-color: #D7DDDD;
  }
  .item:hover .content {
      background-color: #F1FAFE;
  }
  .item:hover .content .label {
      color: #0f0f0f;
  }
}

</style>
