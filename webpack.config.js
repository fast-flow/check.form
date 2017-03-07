module.exports = {
    entry: './lib/index',
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json' }
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'form-test.js',
        library: 'FormTest',
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
}
