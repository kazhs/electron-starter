const webpack = require('webpack');
const helpers = require('./config/helpers');

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: argv.mode,

    target: 'electron-main',

    node: {
      __dirname: false,
      __filename: false,
    },

    entry: {
      'main': helpers.root('src', 'main', 'main'),
    },

    resolve: {
      extensions: ['.ts', '.js']
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            configFile: helpers.root('config', 'tsconfig.main.json'),
          },
        },
        { test: /\.node$/, loader: 'node-loader' }
      ]
    },

    output: {
      path: helpers.root('dist'),
      filename: 'main.js',
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.ENV': JSON.stringify(isProduction ? 'prod' : 'dev'),
      })
    ]
  };
};
