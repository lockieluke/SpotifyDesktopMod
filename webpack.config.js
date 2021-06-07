const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        use: 'ts-loader',
        exclude: [/node_modules/, /scripts/]
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'mod-sp-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production'
};