const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const merge = require('webpack-merge');

const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(png)$/,
          options: {
            lossless: true
          }
        }, {
          test: /\.(jpe?g)$/,
          options: {
            quality: 65
          }
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:5]',
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './configs/postcss.config.js'
              }
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['react-css-modules', {
                generateScopedName: '[local]_[hash:base64:5]',
                filetypes: {
                  '.scss': {
                    syntax: 'postcss-scss'
                  }
                }
              }]
            ],
            compact: true,
            minified: true
          }
        }
      }
    ]
  }
});
