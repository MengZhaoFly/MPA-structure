const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var minify = require('html-minifier').minify
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 

module.exports = {
  output: {
    path: path.resolve('./dist/assets'),
    filename: 'js/[name].[contenthash:5].js',
    publicPath: '/'
  },
  plugins: [
    new CopyPlugin([
      {
        from: './src/web/views/layouts',
        to: '../views/layouts',
        transform(content, path) {
          return minify(content.toString(), {
            collapseWhitespace: true
          })
        }
      },
      {
        from: './src/web/components',
        to: '../components',
        transform(content, path) {
          return minify(content.toString(), {
            collapseWhitespace: true
          })
        }
      }
    ]),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: true
    }),
    new BundleAnalyzerPlugin()
  ]
}
