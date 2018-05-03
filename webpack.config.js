const webpack = require('webpack');
const production = process.env.NODE_ENV === 'production';
module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: production ? './dist/dataframe-min.js' : './dist/dataframe.js',
        library: 'dfjs',
    },
    node: {
        fs: 'empty',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel-loader'],
        }],
    },
    plugins: production ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ] : [],
};
