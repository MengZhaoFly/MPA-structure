const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
  plugins: [
    new CopyPlugin([
      { from: './src/web/views/layouts', to: '../views/layouts' },
      { from: './src/web/components', to: '../components' }
    ])
  ]
}
