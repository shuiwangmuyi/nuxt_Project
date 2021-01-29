const webpack = require('webpack')
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt项目',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    //配置elementui
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/reset.css',
    '~/assets/css/global.css'
  ], 
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // ssr: true表示这个插件只在服务端起作用
     '~/plugins/ElementUI',
    
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true, // 表示开启代理
    //timeout: 5000,
    //prefix: '/api', // 表示给请求url加个前缀 /api
    //withCredentials: true // 表示跨域请求时是否需要使用凭证
    credentials:true
  },
  proxy: {
    '/api/': { 
      target: 'https://localhost:5001',// 接口
      ws:true,
      secure:false,
      changeOrigin:true,//表示是否跨域       
      pathRewrite: {
        //'^/api': '', // 把 /api 替换成 /          
      }    
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // 防止element-ui、axios被多次打包  
    vendor: ['element-ui','axios'],
    plugins: [
      new webpack.ProvidePlugin({
          '$' : 'jquery' 
      })
  ]
  }
}
