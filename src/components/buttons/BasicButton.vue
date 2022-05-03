<template>
  <div class="basic-button" :class="classes">
    <Spinner v-if="loading" class="spinner" :size="spinnerSize" />
    <div class="label">{{ label }}</div>
  </div>
</template>

<script>
// import BasicButton from '@/components/buttons/BasicButton.vue'
// <BasicButton full-width :label="$t('reports.filter.fetch.refresh')" @click="submit"/>

import Spinner from '@/components/misc/Spinner.vue'

export default {
  name: 'BasicButton',
  components: { Spinner },
  props: {
    label: { type: String, required: true },
    fullWidth: Boolean,
    loading: Boolean,
    disabled: Boolean,
    iconOnly: Boolean,
    bgColor: { type: String, default: '#005B96' },
    textColor: { type: String, default: '#FFFFFF' },
    dark: Boolean,
    muted: Boolean
  },
  computed: {
    classes () {
      return {
        loading: this.loading,
        disabled: this.disabled || this.loading,
        'full-width': this.fullWidth,
        'icon-only': this.iconOnly,
        dark: this.dark,
        muted: this.muted
      }
    },
    spinnerSize () {
      return 32
    }
  }
}
</script>

<style lang="css" scoped>
.basic-button {
    color: v-bind(textColor);
    background-color: v-bind(bgColor);
    transition: 0.2s all;
    height: 40px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
}
@media (hover: hover) {
  .basic-button:hover {
      background-color: #016DB2;
  }
}
.basic-button:active {
    background-color: #01578E;
}

.label {
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    padding-left: 13px;
    padding-right: 13px;
}

.full-width {
    width: 100%;
}

.disabled {
  background-color: rgba(0,0,0,0.05);
  border: 0;
  pointer-events: none;
}
.disabled .label {
  opacity: 0.5;
  color: v-bind(bgColor);
}

.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

.loading .label {
  opacity: 0;
}
.muted {
  background: #f8f9f9;
  color: v-bind(bgColor);
}
.muted.disabled .label{
  color: #CCCCCC;
  opacity: 1;
}

.shadow {
  box-shadow: 4px 4px 4px rgba(0,0,0,0.3);
}
</style>
