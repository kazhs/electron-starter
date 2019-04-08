const webpack = require('webpack');
const helpers = require('./config/helpers');

const isProductionMode = (argv) => argv.mode === 'production';

const mainConfig = argv => {
  const isProduction = isProductionMode(argv);
  return {
    mode: argv.mode,
    target: 'electron-main',
    devtool: 'source-map',

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

const rendererConfig = argv => {
  const isProduction = isProductionMode(argv);
  return {
    mode: argv.mode,
    target: 'electron-renderer',
    devtool: 'source-map',

    entry: {
      'main': helpers.root('src', 'renderer', 'App'),
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx']
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            configFile: helpers.root('config', 'tsconfig.renderer.json'),
          },
        }
      ]
    },

    output: {
      path: helpers.root('dist'),
      filename: 'renderer.js',
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.ENV': JSON.stringify(isProduction ? 'prod' : 'dev'),
      })
    ]
  };
};

module.exports = (_, argv) => {
  let config;
  if (argv.type === 'main') {
    config = mainConfig(argv);

  } else {
    config = rendererConfig(argv);
  }

  return config;
};
