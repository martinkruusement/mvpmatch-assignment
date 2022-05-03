<template>
  <div class="data-range-picker">
    <!--     <JsonViewer :value="modelValue" /> -->
    <div class="fields">
      <Datepicker
        v-model="dates"
        utc
        range
        input-class-name="date-field start-date-field"
        :start-date="minDate"
        :placeholder="needBoth ? startPlaceholder : combinedPlaceholder"
        :format="startDateDisplayFormatter"
        :min-date="minDate"
        :max-date="maxDate"
        auto-apply
        prevent-min-max-navigation
        :enable-time-picker="false"
        @update:model-value="emitModelValue"
      />
      <Icon v-show="needBoth" icon="arrow-right" class="date-input-separator" />
      <Datepicker
        v-show="needBoth"
        v-model="dates"
        utc
        range
        input-class-name="date-field end-date-field"
        :start-date="maxDate"
        :placeholder="endPlaceholder"
        :format="endDateDisplayFormatter"
        :min-date="minDate"
        :max-date="maxDate"
        auto-apply
        :fixed-start="!!modelValue?.startDate"
        prevent-min-max-navigation
        :enable-time-picker="false"
        @update:model-value="emitModelValue"
      />
    </div>
  </div>
</template>

<script>
// import DateRange from '@/components/forms/DateRange.vue'

// TODO: can use custom calendar icons?
// import CalendarIcon from '@/components/icons/CalendarIcon.vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Icon from '@/components/icons/Icon.vue'

export default {
  name: 'DateRange',
  components: {
    // CalendarIcon,
    Datepicker,
    Icon
  },
  props: {
    minDate: String,
    maxDate: String,
    modelValue: { type: Object, required: true },
    icon: [Boolean, String],
    needBoth: Boolean,
    startPlaceholder: String,
    combinedPlaceholder: String,
    endPlaceholder: String
    // TODO: Support 'calendar', 'search' strings for icons
  },
  emits: ['update:modelValue'],
  data () {
    return {
      dates: null
    }
  },
  watch: {
    modelValue: {
      handler: function (newDates) {
        if (!newDates.startDate && !newDates.endDate) {
          this.dates = null
          return
        }
        this.dates = [newDates.startDate, newDates.endDate]
      },
      immediate: true,
      deep: true
    }

  },
  methods: {
    emitModelValue (e) {
      const formattedStart = this.dateOutputFormatter(e?.[0]) || null
      const formattedEnd = this.dateOutputFormatter(e?.[1]) || null

      const modelValue = {
        startDate: formattedStart,
        endDate: formattedEnd
      }
      this.$emit('update:modelValue', modelValue)
    },
    startDateDisplayFormatter (dates) {
      return this.dateDisplayFormatter(dates[0])
    },
    endDateDisplayFormatter (dates) {
      return this.dateDisplayFormatter(dates[1])
    },
    dateOutputFormatter (date) {
      // TODO: REFACTOR?
      if (!date) {
        return ''
      }
      if (date.getDate) {
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString().padStart(4, '0')
        return `${year}-${month}-${day}`
      }
      if (typeof date === 'string') {
        const day = date.substr(8, 2)
        const month = date.substr(5, 2)
        const year = date.substr(0, 4)
        return `${year}-${month}-${day}`
      }
    },
    dateDisplayFormatter (date) {
      // TODO: REFACTOR?
      if (!date) {
        return null
      }
      if (date.getDate) {
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString().padStart(4, '0')
        return `${day}/${month}/${year}`
      }
      if (typeof date === 'string') {
        const day = date.substr(8, 2)
        const month = date.substr(5, 2)
        const year = date.substr(0, 4)
        return `${day}/${month}/${year}`
      }
    }
  }
}
</script>

<style lang="css" scoped>
.fields {
  display: flex;
  align-items: center;
}
::v-deep(.dp__theme_light)  {
    --dp-background-color: #1BC5BD;
    --dp-border-color: #1BC5BD;
    --dp-text-color: white;
    --dp-icon-color: rgba(255,255,255,0.8);

    --dp-background-color-hover: #42bab2;
    --dp-border-color-hover: #18B4AC;
    --dp-text-color-hover: white;
    --dp-icon-color-hover: white;

}
::v-deep(.date-field) {
  height: 40px;
  border-radius: 5px;
  width: auto;
  max-width: 160px;
  transition: all 0.2s ease;
}
::v-deep(.date-field::placeholder)  {
  color:var(--dp-placeholder-color);
  opacity: 0.9;
  transition: all 0.2s ease;
}
::v-deep(.date-field:hover::placeholder),
::v-deep(.dp__input_focus::placeholder)  {
  opacity: 1;
}
::v-deep(.date-field:hover),
::v-deep(.dp__input_focus)  {
  color: var(--dp-text-color-hover);
  background-color: var(--dp-background-color-hover);
}
::v-deep(.dp__input_icons){
  transition: all 0.2s ease;
}
::v-deep(.dp__input_icon){
  pointer-events: none;
}
::v-deep(.date-field:hover ~ .dp__input_icons),
::v-deep(.dp__input_focus ~ .dp__input_icons)  {
  color: var(--dp-icon-color-hover);
}
.date-input-separator {
  width: 2em;
  padding: 0 .5em;
  color: #7E8299;
}

</style>

<style>
.dp__theme_light{
  --dp-hover-color: #F1FAFE;
  --dp-primary-color: #005B96;
}
</style>
