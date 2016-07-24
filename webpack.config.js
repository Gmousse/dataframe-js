module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './lib/browser/dataframe.js',
        library: 'dfjs',
    },
    node: {
        fs: 'empty',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
};
