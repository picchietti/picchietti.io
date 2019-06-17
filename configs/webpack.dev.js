const merge = require('webpack-merge');

const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['react-css-modules', {
                generateScopedName: '[local]_[hash:base64:5]'
              }]
            ],
            compact: false
          }
        }
      }
    ]
  }
});
