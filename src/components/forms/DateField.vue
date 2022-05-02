<template>
  <DatePicker v-model="dateFields" is-range :model-config="{type:'string', mask:'YYYY-MM-DD'}">
    <template #default="{ inputValue, inputEvents, isDragging }">
      <div class="flex flex-col sm:flex-row justify-start items-center">
        <div class="input-field">
          <CalendarIcon />
          <input
            :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
            :value="inputValue.start"
            v-on="inputEvents.start"
          />
        </div>
        <span class="date-input-separator">
          <svg class="w-4 h-4 stroke-current text-gray-600" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
        <div class="relative flex-grow">
          <CalendarIcon />
          <input
            class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
            :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
            :value="inputValue.end"
            v-on="inputEvents.end"
          />
        </div>
      </div>
    </template>
  </DatePicker>
</template>

<script>
// import DateField from '@/components/forms/DateField.vue'
// <DateField v-model="date" no-icon/>

import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

export default {

  name: 'DateField',
  components: {
    CalendarIcon
  },
  props: {
    modelValue: String,
    format: { type: String, default: 'YYYY-MM-DD' }
  },
  emits: ['update:modelValue']

}
</script>

<style lang="css" scoped>
</style>
