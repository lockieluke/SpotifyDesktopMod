import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  entry: path.join(process.cwd(), 'src', 'index.ts'),
  module: {
    rules: [
      {
        use: 'ts-loader',
        exclude: [
          path.join(process.cwd(), 'node_modules'),
          path.join(process.cwd(), 'scripts')
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'mod-sp-bundle.js',
    path: path.join(process.cwd(), 'dist')
  }
};

export default config;