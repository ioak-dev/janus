/* eslint-disable no-param-reassign */
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end();
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions = {
          ...(options.compilerOptions || {}), // merge existing compilerOptions, if any
          isCustomElement: (tag) => /^oak-/.test(tag)
        };
        return options;
      });
  }
};
