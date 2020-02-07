

module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@': 'src',
  //       'common': '@/common'
  //     }
  //   }
  // }

  // chainWebpack: config => {
  //   config.resolve.alias.set('common', resolve('src/common'))
  // }

  // chainWebpack: (config)=>{
  //   config.resolve.alias
  //       .set('@', resolve('src'))
  //       .set('assets',resolve('src/assets'))
  //       .set('components',resolve('src/components'))
  //       .set('layout',resolve('src/layout'))
  //       .set('common',resolve('src/common'))
  //       .set('static',resolve('src/static'))
  // }
}
