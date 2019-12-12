const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AfterHtmlPlugin = require('./config/AfterHtmlPlugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')

const argv = require('yargs').argv

const env = argv.mode
const envConfig = require(`./config/webpack.${env}.js`)

console.log('webpack 编译环境：', env)

const files = glob.sync('./src/web/views/**/entrys/*.entry.js')

const entrys = {
  // 'books-index':'./src/web/views/books/entrys/books-create.entry.js'
  // 'books-index':'./src/web/views/books/entrys/books-create.entry.js'
}

const htmlPlugins = []

files.forEach(url => {
  const entryName = /([a-zA-Z]+-[a-zA-Z]+)\.entry.js/.exec(url)[1]
  entrys[entryName] = url

  const [dirName, pageName] = entryName.split('-')
  htmlPlugins.push(
    new HtmlWebpackPlugin({
      template: `./src/web/views/${dirName}/pages/${pageName}.html`,
      filename: `../views/${dirName}/pages/${pageName}.html`,
      inject: false
    })
  )
})

const baseConfig = {
  mode: env,
  entry: entrys,
  output: {
    path: path.resolve('./dist/assets'),
    filename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            }
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    ...htmlPlugins,
    new AfterHtmlPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      ignoreOrder: false
    })
  ]
}

module.exports = merge(baseConfig, envConfig)
