const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globImporter = require("node-sass-glob-importer");
const CopyPlugin = require("copy-webpack-plugin");

let plugins = [];
let page;
let links = [];

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          hot: true,
          port: 8081,
          open: "list.html",
        },
      };

fs.readdirSync("./src/").forEach((file) => {
  if (String(file).endsWith(".pug")) {
    page = new HtmlWebpackPlugin({
      template: `./src/${path.basename(file, ".pug")}.pug`,
      filename: `./${path.basename(file, ".pug")}.html`,
      minify: true,
      hash: true,
    });
    links.push({
      link: `./${path.basename(file, ".pug")}.html`,
      title: path.basename(file, ".pug"),
    });
    plugins.push(page);
  }
});

plugins.push(
  new HtmlWebpackPlugin({
    template: `./src/list-template/${path.basename("list.pug", ".pug")}.pug`,
    filename: `${path.basename("list.pug", ".pug")}.html`,
    minify: true,
    hash: true,
  })
);

plugins.push(
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css",
  })
);

plugins.push(
  new CopyPlugin({
    patterns: [
      {
        from: "src/images",
        to: path.resolve(__dirname, "dist/images"),
      },
    ],
  })
);

module.exports = ({ develop }) => ({
  mode: develop ? "development" : "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            use: [
              {
                loader: "html-loader",
                // options: {
                //   attrs: [
                //     "img:src",
                //     "link:href",
                //     "image:xlink:href",
                //     "img:data-src",
                //   ],
                // },
                options: {
                  sources: {
                    list: [
                      {
                        tag: "img",
                        attribute: "xlink:href",
                        type: "src",
                      },
                      {
                        tag: "svg",
                        attribute: "xlink:href",
                        type: "src",
                      },
                    ],
                  },
                },
              },
              {
                loader: "pug-html-loader",
                options: {
                  data: {
                    // JSON data here, see example below
                    // menu: require('./src/data/menu.json'),
                    linkslist: links,
                  },
                  pretty: true,
                },
              },
            ],
          },
        ],
      },

      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // sourceMap: true,
              // minimize: true
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                importer: globImporter(),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: plugins,
  ...devServer(develop),
});
