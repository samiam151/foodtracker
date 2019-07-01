const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AntdScssThemePlugin = require('antd-scss-theme-plugin');
var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './client');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    mode: "production",
    plugins: [
        new AntdScssThemePlugin(path.join(__dirname, 'client', 'styles/core/globals/themes.scss')),
        
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
        rules: [
            {
                test: /(\.css|.scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader"
                    },
                    // AntdScssThemePlugin.themify({
                    //     loader: 'sass-loader',
                    //     options: {
                    //       sourceMap: !isProduction,
                    //     },
                    //   }),
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
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: !isProduction,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: !isProduction,
                        },
                    },
                    AntdScssThemePlugin.themify('less-loader')
                ],
            },
        ],

    }
};

module.exports = config;