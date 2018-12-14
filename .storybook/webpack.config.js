const mainWebpackConfig = require('../webpack/client.dev')

module.exports = {
  resolve: mainWebpackConfig.resolve,
  plugins: mainWebpackConfig.plugins,
  module: mainWebpackConfig.module,
}
