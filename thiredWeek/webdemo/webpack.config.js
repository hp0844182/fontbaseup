const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
console.log(process.env.BUILD_TO )
const devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.stringify(process.env.BUILD_TO || 'false'))
  });
module.exports = {
    entry: './index.js',
    output: {
        filename: 'webpack.bundle.js'
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ],

    },
    plugins: [

        new HtmlWebpackPlugin({ template: './dist/index.html' }),
        devFlagPlugin
    ]
};