<style scoped>

</style>
<template>
  <input
    class="complex-file"
    ref="file"
    type="file"
    :accept="accept"
    :multiple="!!multiple"
    :disabled="disabled"
    @change="onChange"
  />
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { notice } from 'complex-plugin'
import type { MultipleFileProps } from '../../type'

export default defineComponent({
  name: 'FileView',
  props: {
    accept: {
      type: String,
      required: false
    },
    multiple: {
      type: Object as PropType<MultipleFileProps['multiple']>,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    size: { // MB
      type: Number,
      required: false,
      default: 0
    }
  },
  methods: {
    checkAccept(file: File, accept?: string) {
      if (accept) {
        const fileType = file.type
        const fileName = '.' + file.name.split('.').pop()?.toLowerCase()
        const acceptList = accept.split(',')
        return acceptList.some(acceptItem => {
          if (acceptItem.startsWith('.')) {
            return acceptItem === fileName
          } else if (acceptItem === fileType) {
            return true
          } if (fileType && acceptItem.includes('*')) {
            acceptItem = acceptItem.split('*').join('')
            return fileType.includes(acceptItem)
          }
          return false
        })
      } else {
        return true
      }
    },
    check(file: File) {
      if (!this.checkAccept(file, this.accept)) {
        notice.message(`文件格式不匹配!`, 'error')
        return false
      } else if (this.size && file.size / 1024 / 1024 > this.size) {
        notice.message(`文件大小不能大于${this.size}MB!`, 'error')
        return false
      }
      return true
    },
    onChange(e: Event) {
      const input = (e.target as HTMLInputElement)
      const fileList = input.files
      if (fileList && fileList.length > 0) {
        if (!this.multiple) {
          const file = fileList[0]
          if (this.check(file)) {
            this.$emit('select', file)
          }
        } else {
          const currentFileList: File[] = []
          let currentNum = fileList.length
          if (this.multiple.max && currentNum > this.multiple.max) {
            currentNum = this.multiple.max
          }
          for (let n = 0; n < currentNum; n++) {
            const file = fileList[n]
            if (this.check(file)) {
              currentFileList.push(file)
            }
          }
          if (currentFileList.length > 0) {
            if (currentFileList.length !== currentNum) {
              // 存在不合格数据
              if (this.multiple.append) {
                this.$emit('select', currentFileList)
              }
            } else {
              this.$emit('select', currentFileList)
            }
          }
        }
      }
      input.value = ''
    }
  }
})
</script>
