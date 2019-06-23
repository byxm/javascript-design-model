const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

function getCurrentDirDate() {
    let allPages = [];
    fs.readdirSync(path.join(__dirname, 'src')).forEach(entries => {
        const fullDir = path.join(__dirname, 'src', entries);
        //   const entry = path.join(fullDir, "app.ts");
        if (fs.statSync(fullDir).isDirectory()) {
            const entry = fs.readdirSync(fullDir);
            const onwPage = entry.reduce((ety, dir) => {
                const fileEntry = path.join(fullDir, dir);
                if (fs.existsSync(fileEntry) && /\.ts$/.test(fileEntry)) {
                    ety[dir.replace(/\.ts/, '')] = ['webpack-hot-middleware/client?noInfo=true&reload=true', fileEntry];
                }
                return ety;
            }, {});
            allPages.push(onwPage);
        }
    });

    const realPages = allPages.reduce((preEntry, nextEntry) => {
        return Object.assign(preEntry, nextEntry);
    }, {});

    return realPages;
}
const entryDir = getCurrentDirDate();
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: entryDir,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'awesome-typescript-loader',
                },
            },
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
