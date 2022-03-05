const currentTask = process.env.npm_lifecycle_event
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')

const postCSSPlugins = [
 require('postcss-import'),
 require('postcss-mixins'),
 require('postcss-simple-vars'),
 require('postcss-nested'),
 require('autoprefixer'),
]

class RunAfterCompile{
  apply(compiler){
    compiler.hooks.done.tap('Copy images', function(){
      fse.copySync('./app/assets/images', './docs/assets/images')
    })
  }
}

let cssConfig = {
  test: /\.css/,
  use: [
    {
      loader: "css-loader",
      options: {
        url: false,
      },
    },
    {
      loader: "postcss-loader",
      options: { postcssOptions: { plugins: postCSSPlugins } },
    },
  ],
}

let config = {
  entry: "./app/assets/scripts/App.js",
  plugins: [new HtmlWebpackPlugin({filename: 'index.html', template: './app/index.html', minify: false})],
  module: {
    rules: [
     cssConfig
    ],
  },
};

if(currentTask == 'dev'){
  cssConfig.use.unshift('style-loader'),
  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, './app'),
  },
  config.devServer = {
    port: 3000,
    static: {
      directory: path.join(__dirname, './app')
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: false,
    },
    hot: true,
    host: '0.0.0.0',
  },
  config.mode = 'development'
}

if(currentTask == 'build'){
  config.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  })
  cssConfig.use.unshift(MiniCssExtractPlugin.loader)
  config.output = {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, './docs'),
    clean: true,
  }
  config.mode = 'production'
  config.optimization = {
    splitChunks: {chunks: 'all'},
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()]
  },
  config.plugins.push(
    new MiniCssExtractPlugin({filename: 'styles.css'}),
    new RunAfterCompile()
  )
}

module.exports = config