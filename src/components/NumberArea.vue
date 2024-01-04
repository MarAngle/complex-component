<style scoped>
.number-area{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
}
</style>

<template>
  <div class="number-area">
    <NumberChange :data="data" :color="color" :time="time" :decimal="decimal" :comma="comma" :format="format" />
    <NumberUnit :unit="unit" :unitOption="unitOption" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import NumberChange from './NumberChange.vue'
import NumberUnit from './NumberUnit.vue'
import { NumberAreaProps } from '../type'

export default defineComponent({
  name: 'NumberArea',
  components: {
    NumberChange,
    NumberUnit
  },
  props: {
    data: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: false
    },
    time: {
      type: Number,
      required: false
    },
    decimal: {
      type: Number,
      required: false,
      default: 0
    },
    comma: {
      type: String,
      required: false,
      default: ','
    },
    format: {
      type: Function as PropType<NumberAreaProps['format']>,
      required: false
    },
    unit: {
      type: String,
      required: true
    },
    unitOption: {
      type: Object as PropType<NumberAreaProps['unitOption']>,
      required: false,
      default: undefined
    }
  }
})
</script>
