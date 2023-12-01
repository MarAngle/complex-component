import { upperCaseFirstChar } from "complex-utils"
import { AttributeValue } from "complex-data"

const config = {
  highText: {
    style: {
      color: '#FF4D4F'
    }
  },
  // 挂载到具体对象下，可后期模块中更改
  parseAttributes: function(attributesData: AttributeValue) {
    const data: Record<PropertyKey, unknown> = {
      ...attributesData.attributes,
      ...attributesData.props,
      style: attributesData.style
    }
    for (const funcName in attributesData.on) {
      data['on' + upperCaseFirstChar(funcName)] = attributesData.on[funcName]
    }
    if (attributesData.id.length > 0) {
      data.id = attributesData.id
    }
    if (attributesData.class.length > 0) {
      data.class = attributesData.class
    }
    return data
  }
}

export default config
