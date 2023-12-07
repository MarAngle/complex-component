<style lang="less" scoped>
.simple-table{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  .simple-table-column{
    color: rgba(255, 255, 255, 0.85);
    line-height: 32px;
    &.simple-table-column-left{
      text-align: left;
    }
    &.simple-table-column-right{
      text-align: right;
    }
    &.simple-table-column-center{
      text-align: center;
    }
    .simple-table-header{
      height: 33px;
      white-space: nowrap; /* 不换行 */
      overflow: hidden; /* 隐藏超出部分 */
      text-overflow: ellipsis; /* 显示省略号 */
      word-wrap: break-word;
      word-break: break-all;
      padding: 0 4px;
      cursor: pointer;
      border-bottom: 1px rgba(255, 255, 255, 0.25) solid;
      background-color: rgba(255, 255, 255, 0.1);
    }
    .simple-table-row{
      padding: 0 4px;
      border-bottom: 1px rgba(255, 255, 255, 0.25) solid;
      p{
        height: 33px;
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 隐藏超出部分 */
        text-overflow: ellipsis; /* 显示省略号 */
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }
}
</style>

<template>
  <div class="simple-table">
    <div class="simple-table-column" v-for="column in columns" :class="'simple-table-column-' + column.align || 'left'" :key="column.prop" :style="rowStyle(column)" >
      <div class="simple-table-header">{{ column.name }}</div>
      <div class="simple-table-row" v-for="(val, key) in list" :key="key" >
        <p :style="column.style ? column.style(val[column.prop], val, key) : undefined">{{ column.format ? column.format(val[column.prop], val, key) : val[column.prop] }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import config from '../../config'
type SimpleTableColumnType = {
  prop: string
  name: string
  width?: number
  align?: 'left' | 'right' | 'center'
  grow?: number
  format?: (value: unknown, record: Record<PropertyKey, unknown>, index: number) => undefined | string
  style?: (value: unknown, record: Record<PropertyKey, unknown>, index: number) => undefined | Record<string, string | number>
}

export default defineComponent({
  name: 'SimpleTable',
  props: {
    columns: {
      type: Object as PropType<SimpleTableColumnType[]>,
      required: true
    },
    list: {
      type: Object as PropType<Record<PropertyKey, unknown>[]>,
      required: true
    }
  },
  methods: {
    rowStyle(column: SimpleTableColumnType) {
      const style: Record<string, string | number> = {}
      if (column.width !== undefined) {
        style.width = config.formatStyle(column.width)
      }
      style.flexGrow = column.grow === undefined ? 0 : column.grow
      return style
    }
  }
})
</script>
