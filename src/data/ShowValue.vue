<template>
  <span class="complex-show-value" >{{ currentValue }}</span>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue"
import { isExist } from "complex-utils"
import { ShowValueProps } from "../type"

export default defineComponent({
  name: 'ShowValue',
  props: {
    value: {
      required: false
    },
    isExist: {
      type: Function as PropType<ShowValueProps['isExist']>,
      required: false,
      default: isExist
    },
    unExistText: {
      required: false,
      default: ''
    },
    format: {
      type: Function as PropType<ShowValueProps['format']>,
      required: false
    }
  },
  computed: {
    currentValue() {
      let currentValue = this.format ? this.format(this.value) : this.value
      if (!this.isExist!(currentValue)) {
        currentValue = this.unExistText
      }
      return currentValue
    }
  }
})
</script>
