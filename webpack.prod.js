const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              minimize: true
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
            presets: ['babel-preset-env', 'babel-preset-react'],
            plugins: ['transform-class-properties'],
            compact: true,
            minified: true
          }
        }
      }
    ]
  }
});
