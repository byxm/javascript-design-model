const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');


function getCurrentDirDate() {
    let allPages;
    fs.readdirSync(path.join(__dirname, 'src')).forEach(entries => {
        const fullDir = path.join(__dirname, 'src', entries);
        //   const entry = path.join(fullDir, "app.ts");
        if (fs.statSync(fullDir).isDirectory()) {
            const entry = fs.readdirSync(fullDir);
            allpages = entry.reduce((ety, dir) => {
                const fileEntry = path.join(fullDir,dir);
                if (fs.existsSync(fileEntry) && /\.js$/.test(fileEntry)) {
                    ety[dir.replace(/\.js/,'')] = ['webpack-hot-middleware/client?noInfo=true&reload=true',fileEntry]
                }
                return ety;
            }, {});
        }
    })
    return allpages
}

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: getCurrentDirDate(),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        // ...getCurrentPages,
        // new HtmlWebpackPlugin({
        //   chunks:['/'],
        //   template:path.resolve(__dirname,'./public/index.html')
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            src: path.resolve(__dirname, 'src'),
        },
    },
};
