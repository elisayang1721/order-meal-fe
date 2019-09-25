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
  }
}