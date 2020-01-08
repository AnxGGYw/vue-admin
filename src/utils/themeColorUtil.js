import replacerClient from 'webpack-theme-color-replacer/client'
import generate from '@ant-design/colors/lib/generate'
import { message } from 'ant-design-vue'
import Vue from 'vue'

const getAntdSerials = color => {
  // 淡化（即less的tint）
  const lightens = new Array(9).fill().map((t, i) => {
    return replacerClient.varyColor.lighten(color, i / 10)
  })
  // colorPalette变换得到颜色值
  const colorPalettes = generate(color)
  // return lightens.concat(colorPalettes) 替换`24,144,255`这样的主题色
  const rgb = replacerClient.varyColor.toNum3(color.replace('#', '')).join(',')
  return lightens.concat(colorPalettes).concat(rgb)
}
const changeColor = newColor => {
  const options = {
    newColors: getAntdSerials(newColor), // new colors array, one-to-one corresponde with `matchColors`
    changeUrl(cssUrl) {
      return `/${cssUrl}` // while router is not `hash` mode, it needs absolute path
    }
  }
  return replacerClient.changer.changeColor(options, Promise)
}
const updateTheme = newPrimaryColor => {
  const hideMessage = message.loading('正在切换主题！', 0)
  changeColor(newPrimaryColor).finally(() => {
    Vue.nextTick(hideMessage)
  })
}

export { getAntdSerials, changeColor, updateTheme }
