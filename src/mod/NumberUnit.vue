<style lang="less" scoped>

.number-unit{
  display: inline-block;
}
</style>

<template>
  <span class="number-unit" :style="unitStyle">{{ unit }}</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import config from '../../config'

export type unitOption = {
  fontSize?: number
  lineHeight?: number
  top?: number
  left?: number
  color?: string
}

export default defineComponent({
  name: 'NumberUnit',
  props: {
    unit: {
      type: String,
      required: true
    },
    unitOption: {
      type: Object as PropType<unitOption>,
      required: false,
      default: undefined
    }
  },
  computed: {
    unitStyle() {
      const unitStyle: Record<string, string> = {}
      if (this.unitOption) {
        if (this.unitOption.color) {
          unitStyle.color = this.unitOption.color
        }
        if (this.unitOption.fontSize) {
          unitStyle.fontSize = config.formatStyle(this.unitOption.fontSize)
        }
        if (this.unitOption.lineHeight) {
          unitStyle.lineHeight = config.formatStyle(this.unitOption.lineHeight)
        }
        if (this.unitOption.top) {
          unitStyle.transform = `translateY(${config.formatStyle(this.unitOption.top)})`
        }
        if (this.unitOption.left) {
          unitStyle.marginLeft = config.formatStyle(this.unitOption.left)
        }
      }
      return unitStyle
    }
  }
})
</script>
