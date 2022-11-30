"use strict";
const path = require("path");
const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
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
        loader: ["css-loader", "style-loader"],
      },
      {
        test: /\.(flac|mp3)$/i,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
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
  },
};
