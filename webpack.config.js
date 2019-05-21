const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development',
    entry:path.resolve(__dirname,'./高阶函数/currying.js'),
    output: {
        path:path.join(__dirname,'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules:[
            {
            test: /\.js$/,
            use: {}
        }
    ]
    }
}