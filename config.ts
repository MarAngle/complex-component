import { upperCaseFirstChar } from "complex-utils"
import { AttrsValue } from "complex-data"

const config = {
  highText: {
    style: {
      color: '#FF4D4F'
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
