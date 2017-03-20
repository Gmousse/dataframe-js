module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: process.env.NODE_ENV === 'production' ? './dist/dataframe-min.js' : './dist/dataframe.js',
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
};
