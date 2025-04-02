
<template>
  <span class="comma-number" :class="currentClass" >{{ !format ? currentData : format(currentData) }}</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CommaNumberProps } from '../../type'
import { componentConfig } from '../../index'

export default defineComponent({
  name: 'CommaNumber',
  props: {
    data: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: false
    },
    decimal: {
      type: Boolean,
      required: false,
      default: false
    },
    comma: {
      type: String,
      required: false,
      default: ','
    },
    format: {
      type: Function as PropType<CommaNumberProps['format']>,
      required: false
    }
  },
  computed: {
    currentClass() {
      return this.color ? 'local-main-color-' + this.color : ''
    },
    currentData() {
      return componentConfig.parseNumberByComma(this.data, this.comma, this.decimal) as string
    }
  }
})
</script>
