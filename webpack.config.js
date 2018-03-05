const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new CleanWebpackPlugin('./build'),
    new CopyWebpackPlugin([{from: './source', to: '../../'}])
    // new BundleAnalyzerPlugin()
  ],
  entry: {
    app: './source/public/index.js'
  },
  output: {
    filename: '[name].js',
    // chunkFilename: '[hash].js',
    path: path.resolve(__dirname, './build/public/bundles'),
    publicPath: '/bundles/'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../fonts/',
              publicPath: '/fonts/'
            }
          }
        ]
      },
      {
        test: /\.bundle\.js$/,
        use: {
          loader: 'bundle-loader',
          options: {
            lazy: true
          }
        }
      }
    ]
  }
};
