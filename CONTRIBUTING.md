# Contributing A New Skeleton

Your first step in contributing a new skeleton is to add your skeletons to the `closet`. It is also possible to use existing skeletons in the `closet` and simply combine them in a unique way. For the purposes here, I will be using a combination of some new skeletons, and reusing existing skeletons.

We will be adding support for a skeleton that adds the needed config for a base React project that uses [Webpack](https://webpack.js.org/) as it’s build tool. We will need a couple of config files to start.

1. webpack.config.js
2. .babelrc
3. .prettierrc
4. .eslintrc.js

To keep the skeleton together, and ease implementation, create a new folder called `react-webpack` under `closet/skeletons`. Next we add our `webpack.config.js` file.

```
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
        use: ["babel-loader", "eslint-loader"]
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
```

And next our config for [Babeljs](https://babeljs.io/), aka `.babelrc`

```
{
  "presets": [
    "@babel/react",
    [
      "@babel/env",
      {
        "targets": {
          "browsers": "last 2 versions"
        }
      }
    ]
  ],
  "plugins": [
    "react-hot-loader/babel",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties"
  ]
}
```

For [Prettier](https://prettier.io/) we do not have anything custom here, so we will simply be reusing the one already in `closet/skeletons`.
With regards to [ESLint](https://eslint.org/), we do have some custom additions that needs to be added so, we add our own `.eslintrc.json` to `closet/skeletons`:

```
{
    "extends": [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier",
        "prettier/react"
    ],
    "rules": {
        "react/prop-types": 0,
        "no-console": 1
    },
    "plugins": ["react", "import", "jsx-a11y"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
        "jsx": true
        }
    },
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
        "node": true
    }
}
```
