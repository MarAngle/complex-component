<template>
  <CommaNumber class="number-change" :data="currentData" :color="color" :decimal="decimal > 0" :comma="comma" :format="format" />
</template>

<script lang="ts">
import { getNum } from 'complex-utils'
import { defineComponent, PropType } from 'vue'
import CommaNumber from './CommaNumber.vue'
import config from '../../config'
import { NumberChangeProps } from '../type'

export default defineComponent({
  name: 'NumberChange',
  components: {
    CommaNumber
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
      required: false,
      default: () => {
        return config.animateTime
      }
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
      type: Function as PropType<NumberChangeProps['format']>,
      required: false
    }
  },
  data() {
    return {
      change: false,
      currentData: 0
    }
  },
  watch: {
    data() {
      this.onChange()
    }
  },
  mounted() {
    this.onChange()
  },
  methods: {
    onChange() {
      if (!this.change && this.data !== this.currentData) {
        this.change = true
        const totalTime = this.time
        const startData = this.currentData
        const decimal = this.decimal
        const offset = this.data - this.currentData
        const startTime = Date.now()
        const step = () => {
          const offsetTime = Date.now() - startTime
          if (offsetTime < totalTime) {
            const currentOffset = getNum((offsetTime / totalTime) * offset, 'round', decimal)
            this.currentData = getNum((startData + currentOffset), 'round', decimal)
            requestAnimationFrame(step)
          } else {
            this.currentData = this.data
            this.change = false
            this.onChange()
          }
        }
        requestAnimationFrame(step)
      }
    }
  }
})
</script>
