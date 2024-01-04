<style scoped>
.complex-auto-index{
  cursor: default;
}
</style>
<template>
  <span class="complex-auto-index" v-bind="$attrs">{{ currentIndex }}</span>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue"
import { AutoIndexProps } from "../type"

export default defineComponent({
  name: 'AutoIndex',
  props: {
    index: {
      type: Number,
      required: true
    },
    pagination: {
      type: Object as PropType<AutoIndexProps['pagination']>,
      required: false
    }
  },
  computed: {
    currentIndex() {
      let currentIndex = this.index + 1
      if (this.pagination) {
        const page = this.pagination.getPage()
        const size = this.pagination.getSize()
        currentIndex = currentIndex + (page - 1) * size
      }
      return currentIndex
    }
  }
})
</script>
