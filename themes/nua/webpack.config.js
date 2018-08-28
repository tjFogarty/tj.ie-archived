const path = require('path')
const glob = require('glob-all')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

let env = process.env.NODE_ENV
let isDev = env === 'development'

const WEBPACK_CONFIG = {
  mode: env,
  entry: {
    main: './src/js/main.js',
    styles: './src/less/app.less'
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'static'),
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/chunks/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['static/assets']),
    new MiniCssExtractPlugin({
      filename: 'assets/css/app.css'
    })
  ]
}

if (!isDev) {
  WEBPACK_CONFIG.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }

  WEBPACK_CONFIG.plugins.push(
    new PurgecssPlugin({
      paths: glob.sync([
        `${__dirname}/**/*.html`,
        `${__dirname}/**/*.md`,
        `${__dirname}/src/**/*.js`
      ])
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'tj-ie-v2',
      filename: 'sw.js',
      minify: true,
      stripPrefix: 'static',
      staticFileGlobs: [
        'static/fonts/*.woff2',
        'static/fonts/*.woff',
        'static/assets/js/main.js',
        'static/assets/js/chunks/*.js',
      ]
    })
  )
}

module.exports = WEBPACK_CONFIG
