var webpack = require('webpack');
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'js'),
    aliasConfig = {
        'jquery': path.resolve(APP_DIR, 'vendors/jquery.min.js'),
        'components': path.resolve(APP_DIR, 'components'),
        'views': path.resolve(APP_DIR, 'views'),
        'controllers': path.resolve(APP_DIR, 'controllers'),
        'modules': path.resolve(APP_DIR, 'modules')
    };

var config = {
    entry: APP_DIR + '/loadApp.js',
    output: {
        path: BUILD_DIR,
        filename: 'main.js'
    },
    devtool: 'source-map',
    module: {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.html' ],
        alias: aliasConfig
    },
    devServer: {
        contentBase: './dist',
        publicPath: '/',
        compress: true,
        port: 9000,
        stats: 'errors-only',
        overlay: { errors: true },
        open: false,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin(
			{
                title: 'Star Wars',
                filename: 'index.html',
                inject: false,
                minify: { collapseWhitespace: false },
                hash: true,
                template: path.resolve( __dirname, 'pages/index.html' )
            }
        ),
        new webpack.ExtendedAPIPlugin()
    ]
};

module.exports = config;
