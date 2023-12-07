import { upperCaseFirstChar, parseNum } from "complex-utils"
import { AttrsValue } from "complex-data"

const config = {
  animateTime: 800,
  highText: {
    style: {
      color: '#FF4D4F'
    }
  },
  parseData<D = unknown>(data: undefined | Record<string, undefined | D>, prop: string) {
    if (data) {
      return data[prop]
    }
  },
  formatStyle(value: number, unit = 'px') {
    return value + unit
  },
  parseNumberByComma(data: number | string, comma?: string, decimal?: boolean, list?: boolean) {
    let decimalStr = ''
    if (decimal) {
      let decimalData = 0;
      [data, decimalData] = parseNum(data)
      if (decimalData) {
        decimalStr = decimalData.toString().slice(1)
      }
    }
    if (typeof data === 'number') {
      data = data.toString()
    }
    const strList = data.split('')
    if (comma) {
      for (let i = strList.length - 3; i > 0; i = i - 3) {
        strList.splice(i, 0, comma)
      }
    }
    if (list) {
      return decimalStr ? strList.concat(decimalStr.split('')) : strList
    } else {
      return decimalStr ? strList.join('') + decimalStr : strList.join('')
    }
  },
  // 挂载到具体对象下，可后期模块中更改
  parseAttrs: function(attrsData?: AttrsValue) {
    if (attrsData) {
      const data: Record<PropertyKey, unknown> = {
        ...attrsData.attrs,
        ...attrsData.props,
        style: attrsData.style
      }
      for (const funcName in attrsData.on) {
        data['on' + upperCaseFirstChar(funcName)] = attrsData.on[funcName]
      }
      if (attrsData.id.length > 0) {
        data.id = attrsData.id.join(' ')
      }
      if (attrsData.class.length > 0) {
        data.class = attrsData.class.join(' ')
      }
      return data
    } else {
      return {}
    }
  }
}

export default config
