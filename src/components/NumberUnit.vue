<style scoped>
.number-unit{
  display: inline-block;
}
</style>

<template>
  <span class="number-unit" :style="unitStyle">{{ unit }}</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NumberUnitProps } from '../../type'
import { componentConfig } from '../../index'

export default defineComponent({
  name: 'NumberUnit',
  props: {
    unit: {
      type: String,
      required: true
    },
    option: {
      type: Object as PropType<NumberUnitProps['option']>,
      required: false
    }
  },
  computed: {
    unitStyle() {
      const unitStyle: Record<string, string> = {}
      if (this.option) {
        if (this.option.color) {
          unitStyle.color = this.option.color
        }
        if (this.option.fontSize) {
          unitStyle.fontSize = componentConfig.dataConfig.formatPixel(this.option.fontSize)
        }
        if (this.option.lineHeight) {
          unitStyle.lineHeight = componentConfig.dataConfig.formatPixel(this.option.lineHeight)
        }
        if (this.option.top) {
          unitStyle.transform = `translateY(${componentConfig.dataConfig.formatPixel(this.option.top)})`
        }
        if (this.option.left) {
          unitStyle.marginLeft = componentConfig.dataConfig.formatPixel(this.option.left)
        }
      }
      return unitStyle
    }
  }
})
</script>
