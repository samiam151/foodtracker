const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './client');

const config = {

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[hash].css"
        })
    ],
    entry: {
        main: APP_DIR + '/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: BUILD_DIR,
    },
    module: {
        rules: [{
                test: /(\.css|.scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader" 
                    }, 
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(jsx|js)?$/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        presets: ["@babel/env", "@babel/react"]
                    }
                }]
            }
        ],

    }
};

module.exports = config;