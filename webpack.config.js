const path = require('path');

const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const context = path.resolve(process.cwd(), 'src');
const outPutPath = path.resolve(process.cwd(), 'dist');

module.exports = {
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  entry: [
    './src/index',
  ],
  output: {
    path: outPutPath,
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    modules: [
      context,
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: context,
      },
      {
        test: /\.css/,
        include: context,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]-[local]-[hash:base64:5]',
              modules: true,
              sourceMap: !isProduction,
              minimize: isProduction,
            },
          },
        ],
      },
    ],
  },
};
