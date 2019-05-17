const path = require('path')
const glob = require('glob-all')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
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
    filename: 'js/[name].js',
    chunkFilename: 'js/chunks/[name].js'
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
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    })
  ],
  devtool: 'source-map'
}

if (!isDev) {
  WEBPACK_CONFIG.optimization = {
    minimizer: [
      new TerserPlugin({ parallel: true }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }

  WEBPACK_CONFIG.plugins.push(
    new PurgecssPlugin({
      paths: glob.sync([
        `${__dirname}/**/*.html`,
        `${__dirname}/**/*.md`,
        `${__dirname}/src/**/*.js`
      ]),
      whitelist: function() {
        return ['splitting', 'wf-active', 'no-js']
      }
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'tj-ie-v3',
      filename: 'service-worker.js',
      minify: true,
      stripPrefix: 'static',
      staticFileGlobs: [
        'static/js/main.js',
        'static/js/chunks/*.js',
        'static/fonts/*.woff2',
      ]
    })
  )
}

module.exports = WEBPACK_CONFIG
