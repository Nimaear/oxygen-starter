const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin'); // here so you can see what chunks are built
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const PWAManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');
const Colors = require('../src/lib/Colors');
// const HappyPack = require('happypack');
// const happyThreadPool = HappyPack.ThreadPool({ size: 2 });

const isDev = process.env.NODE_ENV === 'development';

const manifestPlugin = new PWAManifest({
  name: 'Comviq store',
  orientation: 'portrait',
  display: 'standalone',
  start_url: '/',
  crossorigin: null,
  inject: true,
  fingerprints: true,
  ios: false,
  publicPath: null,
  theme_color: Colors.comviq[0],
  background_color: '#ffffff',
  icons: [
    {
      src: path.resolve('public/icon.png'),
      sizes: [36, 48, 72, 96, 144, 192, 512], // multiple sizes
    },
  ],
});

const define = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    API_HOST: JSON.stringify(process.env.API_HOST || 'localhost:1337'),
  },
});
module.exports = {
  client: {
    dev: [
      // new HappyPack({
      //   id: 'jsClient',
      //   threadPool: happyThreadPool,
      //   loaders: ['babel-loader'],
      // }),
      new WriteFilePlugin(),
      new ExtractCssChunks({
        filename: isDev ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      manifestPlugin,
      // new ErrorOverlayPlugin(),
      define,
      new WorkboxPlugin.GenerateSW(),
    ],
    prod: [
      new WriteFilePlugin(),
      new ExtractCssChunks({
        filename: isDev ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      manifestPlugin,
      define,
      new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
      new WorkboxPlugin.GenerateSW(),
    ],
  },
  server: {
    dev: [
      // new HappyPack({
      //   id: 'jsServer',
      //   threadPool: happyThreadPool,
      //   loaders: ['babel-loader'],
      // }),
      // new WriteFilePlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      // manifestPlugin,
      define,
      // new WorkboxPlugin.GenerateSW(),
    ],
    prod: [
      // new WriteFilePlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      define,
      //manifestPlugin,
      new webpack.HashedModuleIdsPlugin(),
    ],
  },
};
