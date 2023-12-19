const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // handle resolving "rootDir" paths
    modules: [path.resolve(process.cwd(), 'src'), 'node_modules'],
    unsafeCache: true,
  },
  externals: [
    'lodash',
    'jquery',
    'moment',
    'slate',
    'emotion',
    '@emotion/react',
    '@emotion/css',
    'prismjs',
    'slate-plain-serializer',
    '@grafana/slate-react',
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'rxjs',
    'react-router',
    'react-router-dom',
    'd3',
    'angular',
    '@grafana/ui',
    '@grafana/runtime',
    '@grafana/data',
    'uuid',
    '@reduxjs/toolkit',
  ],
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'package.json' }],
    }),
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/',
    library: 'GrafanaCloudUI',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
};
