const CompressionPlugin = require('compression-webpack-plugin')

const compress = new CompressionPlugin({
  filename: '[path].gz[query]',
  algorithm: 'gzip',
  minRatio: 0.8,
  test: /\.(js|css)$/, // 符合的檔名
  threshold: 10240, // 對超過 10k的檔案進行壓縮
  deleteOriginalAssets: false // 不刪除原本檔案
})

module.exports = {
  // transpileDependencies: ['*'],
  publicPath: './',
  devServer: {
    port: 2019
  },
  // pages: {
  //   index: {
  //     entry: ['@babel/polyfill', './src/main.js']
  //   }
  // },
  chainWebpack: config => {
    // pug
    const pugRule = config.module.rule('pug')
    pugRule
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
    // config.resolve.alias.set('querystring', 'querystring-browser')
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@as': '@/assets',
        '@c': '@/components',
        '@v': '@/views',
        '@img': '@/assets/img',
        '@css': '@/assets/css',
        '@mix': '@/assets/mixins',
        '@js': '@/assets/js',
        '@api': '@/api'
      }
    },
    plugins: [compress]
    // entry: {
    //   app: ['babel-polyfill', './src/main.js']
    // }
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@css/mixins.sass";'
      }
    }
  }
}
