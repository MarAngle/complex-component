import { StyleValue } from "vue"
import { PaginationData } from "complex-data"
import { multipleFileOption } from "complex-data/type"

export interface CommaNumberProps {
  data: number
  color?: string
  decimal?: boolean
  comma?: string
  format?: (n: number | string) => (number | string)
}

export interface NumberChangeProps extends CommaNumberProps {
  time?: number
}
export interface NumberUnitProps {
  unit: string
  option?: {
    fontSize?: number
    lineHeight?: number
    top?: number
    left?: number
    color?: string
  }
}

export interface NumberAreaProps extends NumberChangeProps {
  unit: string
  unitOption?: NumberUnitProps['option']
}

export interface AutoIndexProps {
  index: number
  pagination?: PaginationData
}

export interface HighTextProps {
  data: unknown
  target: string
  limitNum?: number
  limitCase?: boolean
  defaultOption?: Record<PropertyKey, any>
  highOption?: Record<PropertyKey, any>
}

export interface FileProps {
  accept?: string
  size?: number
  disabled?: boolean
}

export interface MultipleFileProps {
  multiple: multipleFileOption['multiple']
}

export interface ShowValueProps {
  value?: unknown
  isExist?: (value?: unknown) => boolean
  unExistText?: string
  format?: (value?: unknown) => unknown
}

