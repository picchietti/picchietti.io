const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new CleanWebpackPlugin('../dist'),
    new CopyWebpackPlugin([
      { from: './src/public/components/app/assets', to: '../' },
      { from: './src/public/pages/resource/assets', to: '../pages/resource/assets/' }
    ]),
    new HtmlWebpackPlugin({
      minify: {
        html5: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        quoteCharacter: '"',
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        collapseBooleanAttributes: true
      },
      showErrors: true,
      template: './src/public/index.html',
      filename: '../index.html',
      inject: false
    })
    // new BundleAnalyzerPlugin()
  ],
  output: {
    filename: '[name].js',
    // chunkFilename: '[hash].js',
    path: path.resolve(__dirname, '../dist/public/bundles'),
    publicPath: '/bundles/'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /font/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../images/',
              publicPath: '/images/'
            }
          }
        ]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /image/,
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
        type: 'javascript/auto',
        test: /\.(json|pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../other/',
              publicPath: '/other/'
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
