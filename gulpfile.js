const { src, dest, series } = require('gulp')
const babel = require('gulp-babel')
const watch = require('gulp-watch')
const rollup = require('gulp-rollup')
const replace = require('@rollup/plugin-replace')

const entrys = './src/server/**/*.js'

console.log('gulp 编译环境：', process.env.NODE_ENV)

function serverDev() {
  return watch(entrys, { ignoreInitial: false })
    .pipe(
      babel({
        plugins: ['@babel/plugin-transform-modules-commonjs']
      })
    )
    .pipe(dest('dist'))
}

function serverProd() {
  return src(entrys)
    .pipe(
      babel({
        plugins: ['@babel/plugin-transform-modules-commonjs']
      })
    )
    .pipe(dest('dist'))
}

function cleanConfig() {
  return src(entrys)
    .pipe(
      babel({
        plugins: ['@babel/plugin-transform-modules-commonjs']
      })
    )
    .pipe(
      rollup({
        input: './src/server/config/index.js',
        output: {
          format: 'cjs'
        },
        plugins: [replace({ 'process.env.NODE_ENV': "'production'" })]
      })
    )
    .pipe(dest('dist'))
}

let build = null

switch (process.env.NODE_ENV) {
  case 'development':
    build = series(serverDev)
    break
  case 'production':
    build = series(serverProd, cleanConfig)
    break
  default:
    build = series(serverProd)
    break
}

exports.default = build
