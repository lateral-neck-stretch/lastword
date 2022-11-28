"use strict";
const path = require("path");
const webpack = require("webpack");
require("dotenv").config();
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
// const Dotenv = require("dotenv-webpack");
// const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  mode: "development",
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser.js",
    }),
  ],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
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
        test: /\.flac$/i,
        exclude: /node_modules/,
        use: "file-loader",
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
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      vm: require.resolve("vm-browserify"),
      zlib: require.resolve("browserify-zlib"),
    },
    // mainFields: ["browser", "module", "main"],
  },
  // node: {
  //   // see http://webpack.github.io/docs/configuration.html#node
  //   // and https://webpack.js.org/configuration/node/
  //   fs: "empty",
  //   module: "empty",
  //   net: "empty",
  //   tls: "empty",
  // },
};
