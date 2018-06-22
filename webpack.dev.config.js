var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    target: 'web',
    mode: 'development',
    entry: './scripts/chart.ts',
    output: {
        filename: '[name].js',
        path: __dirname + '/scripts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            {
                test: /\.s?css$/,
                use: ['style', 'css', 'sass']
            }
        ]
    },
    devServer: {
        https: true
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './*.html', to: './' },
            { from: './css', to: 'css' },
            { from: './libs', to: 'libs' },
            { from: './img', to: 'img' },
            { from: './vss-extension.json', to: 'vss-extension.json' }
        ])
    ]
}