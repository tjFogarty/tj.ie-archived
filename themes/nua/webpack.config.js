const path = require('path')
const glob = require('glob-all')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
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
    path: path.resolve(__dirname, 'static/assets'),
    filename: 'js/[name].js',
    chunkFilename: 'assets/js/chunks/[name].js'
  },
  resolve: {
    mainFields: ['svelte', 'browser', 'module', 'main']
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
      },
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: 'svelte-loader'
      }
    ]
  },
  plugins: [
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
        return [
          'no-js',
          'cp_embed_wrapper',
          'c-upvote-button',
          'is-active',
          'c-upvote-button__icon'
        ]
      }
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'tj-ie-v3',
      filename: 'service-worker.js',
      minify: true,
      stripPrefix: 'static',
      staticFileGlobs: [
        'static/assets/js/main.js',
        'static/assets/js/chunks/*.js',
        'static/fonts/*.woff2',
        'static/vendor/*.js'
      ]
    })
  )
}

module.exports = WEBPACK_CONFIG
