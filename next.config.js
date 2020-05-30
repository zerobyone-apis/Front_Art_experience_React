// const withSass = require('@zeit/next-sass');
const withStyles = require('@webdeb/next-styles');
// module.export = withSass({
//   cssModules: true,
//   cssLoaderOptions: {
//     importLoaders: 1,
//     localIdentName: '[local]__[hash:base64:5]',
//   },
// });
module.exports = withStyles({
  sass: true,
  modules: true,
});
