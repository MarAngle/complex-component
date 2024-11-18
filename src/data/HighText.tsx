import { defineComponent, h, PropType } from "vue"
import { findTargetInStr } from "complex-utils"
import { HighTextProps } from "../../type"

export default defineComponent({
  name: 'HighText',
  data () {
    const list: {
      data: string,
      high: boolean
    }[] = []
    return {
      list: list
    }
  },
  props: {
    data: {
      required: true
    },
    target: {
      type: String,
      required: true
    },
    defaultOption: {
      type: Object as PropType<HighTextProps['defaultOption']>,
      required: false
    },
    highOption: {
      type: Object as PropType<HighTextProps['highOption']>,
      required: false
    },
    limitNum: {
      type: Number,
      required: false
    },
    limitCase: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    data: {
      immediate: true,
      handler: function(val) {
        this.initList(val)
      }
    }
  },
  methods: {
    initList(data?: string | number) {
      this.list = []
      if (data) {
        const origindata: string = data.toString()
        const findList = findTargetInStr(origindata, this.target, {
          limitNum: this.limitNum,
          case: this.limitCase
        })
        const indexList = this.getHighIndex(findList, this.target.length)
        const list = origindata.split('')
        for (let n = 0; n < list.length; n++) {
          this.list.push({
            data: list[n],
            high: indexList.indexOf(n) > -1
          })
        }
      }
    },
    getHighIndex(startList: number[], size: number) {
      const list = []
      for (let i = 0; i < startList.length; i++) {
        for (let n = 0; n < size; n++) {
          list.push(startList[i] + n)
        }
      }
      return list
    }
  },
  render() {
    return h('span', {
      class: 'complex-high-text'
    }, this.list.map(item => {
      const option = !item.high ? this.defaultOption : this.highOption
      return h('span', {
        class: !item.high ? '' : 'complex-high-text-is-high',
        ...option
      }, item.data)
    }))
  }
})
