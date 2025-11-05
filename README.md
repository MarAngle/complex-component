# complex-component

一个复杂的组件库。

## 安装

```bash
npm install complex-component
```

## 使用

```vue
<template>
  <NumberArea :data="12345.67" unit="元" />
</template>

<script lang="ts" setup>
import { NumberArea } from 'complex-component'
</script>
```

## API

### NumberArea

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | `number` | - | 数字 |
| color | `string` | - | 颜色 |
| time | `number` | - | 动画时间 |
| decimal | `number` | `0` | 小数位数 |
| comma | `string` | `,` | 分隔符 |
| format | `(n: number) => string` | - | 格式化函数 |
| unit | `string` | - | 单位 |
| unitOption | `object` | - | 单位样式 |

### AutoIndex

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| index | `number` | - | 索引 |
| pagination | `object` | - | 分页对象 |

### FileView

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| accept | `string` | - | 文件类型 |
| multiple | `boolean` \| `object` | `false` | 是否多选 |
| disabled | `boolean` | `false` | 是否禁用 |
| size | `number` | `0` | 文件大小限制（MB） |

### HighText

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | `string` \| `number` | - | 文本 |
| target | `string` | - | 高亮目标 |
| defaultOption | `object` | - | 默认样式 |
| highOption | `object` | - | 高亮样式 |
| limitNum | `number` | - | 高亮数量限制 |
| limitCase | `boolean` | `false` | 是否区分大小写 |

### ShowValue

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | `any` | - | 值 |
| isExist | `(value: any) => boolean` | `isExist` | 判断是否存在 |
| unExistText | `string` | `''` | 不存在时的文本 |
| format | `(value: any) => any` | - | 格式化函数 |
