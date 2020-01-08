const WebpackThemeColorReplacer = require('webpack-theme-color-replacer')

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        views: '@/views',
        utils: '@/utils',
        config: '@/config'
      }
    },
    plugins: [
      new WebpackThemeColorReplacer({
        fileName: 'css/theme-colors.css',
        matchColors: getAntdSerials('#1890ff') // 主色系列
      })
    ]
  }
}

function getAntdSerials(color) {
  let lightens = new Array(9).fill().map((t, i) => {
    return WebpackThemeColorReplacer.varyColor.lighten(color, i / 10)
  })
  // 此处为了简化，采用了darken。实际按color.less需求可以引入tinycolor, colorPalette变换得到颜色值
  let darkens = new Array(6).fill().map((t, i) => {
    return WebpackThemeColorReplacer.varyColor.darken(color, i / 10)
  })
  return lightens.concat(darkens)
}
