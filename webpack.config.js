const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, './dist/min'),
    filename: 'onscreen-console.min.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
  resolve: {
    extensions: [
      '.ts',
      '.js',
    ],
  },
};