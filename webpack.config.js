const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin('./build'),
    new CopyWebpackPlugin([{from: './source', to: '../../'}])
  ],
  entry: {
    app: './source/public/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build/public/bundles'),
    publicPath: '/bundles/'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../fonts/',
              publicPath: '../'
            }
          }
        ]
      }
    ]
  }
};
