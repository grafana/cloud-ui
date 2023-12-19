'use strict';
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = (env = {}) =>
  merge(common, {
    devtool: 'eval-source-map',
    mode: 'development',
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        async: true, // don't block webpack emit
        issue: {
          include: [{ file: '**/*.{ts,tsx}' }],
        },
        typescript: { configFile: path.join(process.cwd(), 'tsconfig.json') },
      }),
      // next major version of ForkTsChecker is dropping support for ESLint
      new ESLintPlugin({
        lintDirtyModulesOnly: true, // don't lint on start, only lint changed files
        extensions: ['.ts', '.tsx'],
      }),
    ],
  });
