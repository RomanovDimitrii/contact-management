module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/contact-management/' : '/',
  chainWebpack: config => {
    config.module
      .rule('ts')
      .test(/\.tsx?$/)
      .use('ts-loader')
      .loader('ts-loader')
      .end();

    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end();
  }
};
