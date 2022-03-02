const path = require('path');

const postCSSPlugins = [
 require('postcss-import'),
 require('postcss-mixins'),
 require('postcss-simple-vars'),
 require('postcss-nested'),
 require('postcss-hexrgba'),
 require('autoprefixer'),
]

module.exports = {
 entry: "./app/assets/scripts/App.js",
 output: {
  filename: 'bundled.js',
  path: path.resolve(__dirname, './app'),
 },
 devServer: {
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
 mode: 'development',
 module: {
  rules: [
   {
    test: /\.css/,
    use: [
     'style-loader',
     {
      loader: 'css-loader',
      options: {
       url: false,
      },
     },
     {
      loader: 'postcss-loader',
      options: {postcssOptions: {plugins: postCSSPlugins}},
     }
    ],
   }
  ]
 }
}