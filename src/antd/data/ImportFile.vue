<style lang="less" scoped>
.complex-import-file{
  display: inline-block;
  width: 100%;
  .complex-input-file{
    display: none;
  }
  .complex-import-file-name{
    width: 100%;
    .complex-import-file-name-item{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .complex-import-file-name-item-content{
        width: 100%;
        flex: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .anticon {
        flex: none;
        color: rgba(255, 77, 79, 1);
        line-height: 14px;
        margin-left: 8px;
      }
    }
  }
}

</style>
<template>
  <div class="complex-import-file">
    <InputFile
      ref="file"
      :accept="accept"
      :multiple="multiple"
      :max="max"
      :min="min"
      :append="append"
      :disabled="disabled"
      :placeholder="placeholder"
      :size="size"
      @file="onFile"
    />
    <Button type="primary" :loading="loading || isImport" :disabled="disabled || isImport" @click="onImport">
      <template #icon>
        <slot name="icon" />
      </template>
      {{ name }}
    </Button>
    <div class="complex-import-file-name">
      <template v-if="multiple && (data as uploadFileDataType[]).length > 0">
        <div class="complex-import-file-name-item" v-for="(item, index) in (data as uploadFileDataType[])" :key="index">
          <span class="complex-import-file-name-item-content">{{ item.name }}</span>
          <CloseOutlined @click="onRemove(index)" />
        </div>
      </template>
      <template v-else-if="!multiple && data">
        <div class="complex-import-file-name-item">
          <span class="complex-import-file-name-item-content">{{ (data as uploadFileDataType).name }}</span>
          <CloseOutlined @click="onRemove()" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue"
import { Button } from "ant-design-vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import { notice } from "complex-plugin";
import InputFile from "../../base/data/InputFile.vue"

interface uploadFileDataType {
  data: any
  name: string
  url?: string
}

export default defineComponent({
  name: 'ComplexImportFile',
  components: {
    InputFile,
    Button,
    CloseOutlined
  },
  props: {
    value: {
      type: [String, Object, Array]
    },
    name: {
      type: String,
      required: false,
      default: '上传'
    },
    upload: {
      type: Function as PropType<(file: File) => Promise<unknown>>,
      required: true
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    accept: {
      type: String,
      required: false,
      default: ''
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    max: {
      type: Number,
      required: false,
      default: 0
    },
    min: {
      type: Number,
      required: false,
      default: 0
    },
    append: {
      type: Boolean,
      required: false,
      default: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    size: { // MB
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      isImport: false,
      currentValue: this.value || (!this.multiple ? undefined : []),
      data: !this.multiple ? undefined as undefined | uploadFileDataType : [] as uploadFileDataType[]
    }
  },
  watch: {
    value: function() {
      this.syncData()
    }
  },
  methods: {
    syncData() {
      if (!this.multiple) {
        if (this.currentValue !== this.value) {
          this.currentValue = this.value
          this.data = this.value ? { data: this.value as string, name: this.value as string, url: undefined } : undefined
        }
      } else {
        if (this.value !== this.currentValue) {
          this.currentValue = this.value || []
          this.data = (this.currentValue as string[]).map(item => {
            return {
              data: item,
              name: item,
              url: undefined
            }
          })
        }
      }
    },
    onImport() {
      if (!this.disabled) {
        (this.$refs['file'] as any).$el.click()
      }
    },
    setSingleUpload(file: uploadFileDataType, emit?: boolean) {
      if (this.currentValue !== file.data) {
        this.currentValue = file.data
        this.data = file
        if (emit) {
          this.emitData()
        }
      }
    },
    onRemove(index?: number) {
      if (index === undefined) {
        this.currentValue = undefined
        this.data = undefined
      } else {
        (this.currentValue as any[]).splice(index, 1);
        (this.data as uploadFileDataType[]).splice(index, 1)
      }
      this.emitData()
    },
    emitData() {
      this.$emit('select', this.currentValue)
    },
    setMutipleUpload(file: uploadFileDataType[], emit?: boolean) {
      file.forEach(fileItem => {
        if ((this.currentValue as string[]).indexOf(fileItem.data) === -1) {
          (this.currentValue as string[]).push(fileItem.data);
          (this.data as uploadFileDataType[]).push(fileItem)
        }
      })
      if (this.max && (this.currentValue as string[]).length > this.max) {
        (this.currentValue as string[]).length = this.max;
        (this.data as uploadFileDataType[]).length = this.max
        notice.showMsg(`当前选择的文件数量超过限制值${this.max}，超过部分已被删除！`, 'error')
      }
      if (emit) {
        this.emitData()
      }
    },
    onFile(file: File) {
      this.isImport = true
      this.upload(file).then((res: any) => {
        !this.multiple ? this.setSingleUpload(res.file as uploadFileDataType, true) : this.setMutipleUpload(res.file as uploadFileDataType[], true)
        this.isImport = false
      }).catch(() => {
        this.isImport = false
      })
    }
  }
})
</script>
