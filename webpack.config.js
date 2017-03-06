module.exports = {
    entry: './lib/index',
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: 'form-test.js',
        library: 'FormTest',
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
}
