// Configuration for your app

const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = function (ctx) {
  return {
    // sourceFiles: {
      //   common: 'src/common'
      // },
    // app plugins (/src/plugins)
    plugins: [
      'axios'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons' // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      vueRouterBase: '/wisdom',
      publicPath: '/wisdom',
      // assetsPublicPath: '/wisdom',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
      //   cfg.resolve.alias
      //     .set('@', resolve('src'))
      //     .set('assets',resolve('src/assets'))
      //     .set('components',resolve('src/components'))
      //     .set('layout',resolve('src/layout'))
      //     .set('common',resolve('src/common'))
      //     .set('static',resolve('src/static'))
      //     .set('pages',resolve('src/pages'))
      },
      chainWebpack: (config)=>{
        config.resolve.alias
          .set('@', resolve('src'))
          .set('assets',resolve('src/assets'))
          .set('components',resolve('src/components'))
          .set('layout',resolve('src/layout'))
          .set('common',resolve('src/common'))
          .set('static',resolve('src/static'))
          .set('pages',resolve('src/pages'))
          .set('network',resolve('src/network'))
      }
    },
    devServer: {
      // https: true,
      // port: 8088,
      // proxy: {
      //   // 将所有以/api开头的请求代理到jsonplaceholder
      //   '/api': {
      //     // target: 'http://localhost:8180/api/v1.0',
      //     target: 'http://118.25.153.140:88/wisdomapi/v1.0',
      //     changeOrigin: true,
      //     pathRewrite: {
      //       '^/api': ''
      //     }
      //   }
      // },
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      // all: true,
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemTile',
        'QInput',
        'QTimelineEntry',
        'QTab',
        'QTabs',
        'QTabPane',
        'QTable',
        'QTd',
        'QTr',
        'QSearch',
        'QSelect',
        'QRange',
        'QField',
        'QRadio',
        'QChip',
        'QBtnGroup',
        'QDatetime',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QSlideTransition'
        // 'QBreadcrumbs',
        // 'QBreadcrumbsEl'
      ],
      directives: [
        'Ripple'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog'
      ],
      config: {
        notify: {
          timeout: 1200,
          color: 'secondary',
          textColor: 'blue-grey-1',
          icon: 'announcement'
        }
      }
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
