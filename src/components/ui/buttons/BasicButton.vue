<template>
  <div class="btn" :class="classes">
    <Spinner v-if="loading" class="spinner" :size="spinnerSize" />
    <div class="label">{{ label }}</div>
  </div>
</template>

<script>
// import BasicButton from '@/components/ui/buttons/BasicButton.vue'
// <BasicButton full-width :label="$t('profile.contactForm.buttonLabel')" @click="submit"/>

import Spinner from '@/components/misc/Spinner.vue'

export default {
  name: 'BasicButton',
  components: { Spinner },
  props: {
    label: { type: String, required: true },
    fullWidth: Boolean,
    loading: Boolean,
    disabled: Boolean
  },
  computed: {
    classes () {
      return {
        loading: this.loading,
        disabled: this.disabled || this.loading,
        'full-width': this.fullWidth
      }
    },
    spinnerSize () {
      return 32
    }
  }
}
</script>

<style lang="css" scoped>
.btn {
    color: #FFFFFF;
    background-color: #005B96;
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
  .btn:hover {
      background-color: #016DB2;
  }
}
.btn:active {
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
  color:  #435152;
}
.disabled .label {
  opacity: 0.5;
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
</style>
