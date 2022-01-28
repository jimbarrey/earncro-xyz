module.exports = {
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
    },
    chainWebpack: webpackConfig => {
        webpackConfig.optimization.minimizer('terser').tap(args => {
            args[0].terserOptions.output = {
                ...args[0].terserOptions.output,
                comments: false, // exclude all comments from output
            }
            return args
        })
    },
    transpileDependencies: [
        // can be string or regex
        /vue/,
    ],
}
