const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const srcPath = './src/';
const buildPath = './build/';

module.exports = {
  mode: NODE_ENV,

  entry: {
    app: [
      path.resolve(__dirname, `${srcPath}scripts/index`)
    ]
  },

  output: {
    filename: NODE_ENV === 'development' ? 'js/[name].js?[hash]' : 'js/[name].min.js?[hash]',
    path: path.resolve(__dirname, buildPath),
    sourceMapFilename: '[name].js.map'
  },

  devtool: NODE_ENV === 'development' ? "eval-source-map" : false,

  resolve: {
    extensions: ['.js', '.css']
  },

  watch: NODE_ENV === 'development',
  watchOptions: {
    aggregateTimeout: 100
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath + '/assets/index.html'),
      filename: 'index.html',
      path: buildPath
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: [path.resolve(__dirname, buildPath)] }
    })
  ]

};

if (NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.NoEmitOnErrorsPlugin()
  );
  module.exports.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            warnings:     false,
            drop_console: true,
            unsafe:       true
          },
          mangle: true
        },
      })
    ]
  }
}
