module.exports = {
  devServer: {
    port: 2019
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
        '@api': '@/api'
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@css/mixins.sass";'
      }
    }
  }
}
