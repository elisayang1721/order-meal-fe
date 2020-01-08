const CompressionPlugin = require('compression-webpack-plugin')

const compress = new CompressionPlugin({
  filename: '[path].gz[query]',
  algorithm: 'gzip',
  minRatio: 0.8,
  test: /\.(js|css)$/, // 符合的檔名
  threshold: 10240, // 對超過 10k的檔案進行壓縮
  deleteOriginalAssets: false, // 不刪除原本檔案
})

module.exports = {
  publicPath: './',
  devServer: {
    port: 2019,
    // https: true
  },
  chainWebpack: config => {
    // pug
    const pugRule = config.module.rule('pug')
    pugRule
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
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
        '@api': '@/api',
      },
    },
    plugins: [compress],
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@css/mixins.sass";',
      },
    },
  },
}
