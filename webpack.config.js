"use strict";
const path = require("path");
const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/",
  },
  mode: "development",
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser.js",
    }),
  ],
  devtool: "source-map",
  // externals: {
  //   fs: require("fs"),
  // },
  // =======
  //   resolve: {
  //     extensions: ['', '.js', '.jsx']
  //   },
  //   devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx|png)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        loader: "css-loader",
      },
      {
        test: /\.(flac|mp3|png)$/i,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    fallback: {
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      constants: require.resolve("constants-browserify"),
      crypto: require.resolve("crypto-browserify"),
      fs: false,
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"),
      querystring: require.resolve("querystring-es3"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      vm: require.resolve("vm-browserify"),
      zlib: require.resolve("browserify-zlib"),
    },
  },
};
