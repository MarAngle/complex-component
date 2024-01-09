import { StyleValue } from "vue"
import { PaginationData } from "complex-data"
import { DefaultEditFileOption } from "complex-data/src/dictionary/DefaultEditFile"

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
  defaultStyle?: StyleValue
  highStyle?: StyleValue
  limitNum?: number
  limitCase?: boolean
}

export interface FileProps {
  accept?: string
  size?: number
  disabled?: boolean
  multiple?: boolean | DefaultEditFileOption['multiple']
}

export interface ShowValueProps {
  value?: unknown
  isExist?: (value?: unknown) => boolean
  unExistText?: string
  format?: (value?: unknown) => unknown
}

