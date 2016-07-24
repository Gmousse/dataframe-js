module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './lib/dataframe.js',
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
