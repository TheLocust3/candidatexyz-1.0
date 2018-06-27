const environment = require('./environment')

environment.loaders.prepend('babel', {
    test: /\.js/,
    exclude: /react-parallax/,
    loader: 'babel-loader',
    query: {
        presets: ['react', 'es2015']
    }
});

module.exports = environment.toWebpackConfig()
