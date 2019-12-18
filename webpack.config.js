/* eslint-disable no-undef */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const SRC_PATH = path.resolve(__dirname, "src");
const DIST_PATH = path.resolve(__dirname, "dist");

module.exports = {
  entry: path.join(SRC_PATH, "js", "app.js"),
  output: {
    filename: "app.bundle.js",
    path: DIST_PATH
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC_PATH, "index.html")
    })
  ]
};
