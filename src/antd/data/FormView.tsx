import { Col, Form, Row, FormItem, Button } from "ant-design-vue"
import { defineComponent, h, PropType } from "vue"
import { mergeData } from "complex-utils"
import { DefaultEdit, ObserveList, MenuData, AttributesData } from "complex-data-next"
import AutoFormItem from '../mod/AutoFormItem'
import config from '../config'
import AntdForm from "../class/AntdForm"
import { mergeAttributes, parseAttributes } from "../utils"

export default defineComponent({
  name: 'FormView',
  props: {
    form: {
      type: Object as PropType<AntdForm>,
      required: true
    },
    list: {
      type: Object as PropType<ObserveList>,
      required: true
    },
    menu: {
      type: Object as PropType<MenuData[]>,
      required: false
    },
    type: {
      type: String,
      required: true
    },
    layout: { // 表单布局'horizontal'|'vertical'|'inline'
      type: String,
      required: false,
      default: 'horizontal'
    },
    labelAlign: { // label 标签的文本对齐方式
      type: String,
      required: false,
      default: 'right'
    },
    layoutOption: { // layout != inline时的a-row的参数设置项
      type: Object,
      required: false,
      default: () => {
        return config.FormView.layoutOption
      }
    },
    formProps: { // form-model-view设置项
      type: Object,
      required: false,
      default: null
    },
  },
  computed: {
    currentFormProps() {
      // formProps格式化
      const formProps = {
        model: this.form.data,
        layout: this.layout,
        labelAlign: this.labelAlign
      }
      const currentFormProps = mergeData(formProps, this.formProps)
      currentFormProps.ref = 'form'
      return currentFormProps
    },
    payload() {
      return {
        type: this.type,
        form: this.form,
        list: this.list
      }
    }
  },
  mounted () {
    //
    this.form.setRef(this.$refs.form)
  },
  methods: {
    getGrid(data: DefaultEdit) {
      const ditem = data.$getParent()!
      return ditem.$getLayout(this.type).grid
    },
    formatItem(data: DefaultEdit, index: number) {
      return {
        data: data,
        index: index,
        list: this.list,
        form: this.form,
        type: this.type,
        target: this
      }
    },
    renderMenu() {
      if (this.menu) {
        return this.menu.map((item, index) => {
          const mainAttributes = new AttributesData({
            props: {
              name: item.prop,
              label: item.name,
              required: false
            },
            class: ['complex-form-item', 'complex-form-item-menu']
          })
          mergeAttributes(mainAttributes, item.$local.parent)
          h(FormItem, parseAttributes(mainAttributes), {
            default: () => {
              let hidden = item.hidden
              if (hidden && typeof hidden === 'function') {
                hidden = hidden(item, index, this.payload)
              }
              if (!hidden) {
                let loading = item.loading
                if (loading && typeof loading === 'function') {
                  loading = loading(item, index, this.payload)
                }
                let disabled = item.disabled
                if (disabled && typeof disabled === 'function') {
                  disabled = disabled(item, index, this.payload)
                }
                const itemAttributes = new AttributesData({
                  props: {
                    type: item.type,
                    loading: loading,
                    disabled: disabled,
                    required: false
                  },
                  on: {
                    click: () => {
                      this.$emit('menu', item.name, item, index, this.payload)
                    }
                  },
                  class: ['complex-form-item-type', 'complex-form-item-type-button', 'complex-form-item-type-menu']
                })
                mergeAttributes(itemAttributes, item.$local.target)
                return h(Button, parseAttributes(itemAttributes), item.name)
              } else {
                return null
              }
            }
          })
        })
      } else {
        return null
      }
    },
    renderList() {
      if (this.layout === 'inline') {
        return this.list.data.map((item, index) => {
          h(AutoFormItem, this.formatItem(item, index))
        })
      } else {
        return this.list.data.map((item, index) => {
          h(Row, this.layoutOption, {
            default: () => h(Col, this.getGrid(item), {
              default: () => h(AutoFormItem, this.formatItem(item, index))
            })
          })
        })
      }
    }
  },
  /**
   * 主要模板
   * @param {*} h createElement
   * @returns {VNode}
   */
  render() {
    const layoutClass = `complex-form-${this.layout}`
    const render = h(Form, {
      class: `complex-form ${layoutClass}`,
      ...this.formProps
    }, {
      default: () => {
        const list = this.renderList()
        const menu = this.renderMenu()
        if (menu) {
          return list.concat(menu)
        } else {
          return list
        }
      }
    })
    return render
  }
})
