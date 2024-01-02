const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const distPath = path.resolve(__dirname, "./dist/").replace(/\\/g, "/")
const entries = ["./src/scss/Home.scss", "./src/js/index.js"]

module.exports = (env, args) => {
    const isDev = args.mode !== "production"

    const config = {
        watchOptions: {
            ignored: /node_modules/
        },
        cache: {
            type: "filesystem",
            buildDependencies: {
                config: [__filename]
            }
        },
        entry: entries,
        output: {
            filename: "./js/[name].js",
            path: distPath,
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        },
                        "postcss-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        optimization: isDev
            ? {}
            : {
                runtimeChunk: "single"
                // splitChunks: {
                //   maxInitialRequests: Infinity,
                //   minSize: 0,
                //   chunks: "async",
                //   cacheGroups: {
                //     vendor: {
                //       name: "vendor",
                //       test: /[\\/]node_modules[\\/]/
                //     }
                //   }
                // }
            },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "./css/[name].css"
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "./src/static",
                        to: "./"
                    }
                ]
            })
        ]
    }
    return config
}
