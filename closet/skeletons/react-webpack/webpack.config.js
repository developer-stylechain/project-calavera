const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "cheap-eval-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.jsx?$/,
        exclude: "/node_modules/",
        use: ["babel-loader"]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5000
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ["file-loader", "svgo-loader"]
      }
    ]
  },
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "./src/ClientApp.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "public")
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HTMLWebpackPlugin({
      title: "Featured Banner",
      template: "./src/tmpl/banner.html"
    })
  ]
};
