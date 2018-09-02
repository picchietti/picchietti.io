const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              modules: true,
              localIdentName: '[local]_[hash:base64:5]'
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
            plugins: [
              'transform-class-properties',
              ['react-css-modules', {
                'generateScopedName': '[local]_[hash:base64:5]',
                'filetypes': {
                  '.scss': {
                    'syntax': 'postcss-scss'
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
