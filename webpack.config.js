var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'js'),
    aliasConfig = {
        'jquery': APP_DIR + '/vendors/jquery.min.js',
        'components': APP_DIR + '/components',
        'views': APP_DIR + '/views',
        'controllers': APP_DIR + '/controllers',
        'modules': APP_DIR + '/modules'
    };

var config = {
    entry: APP_DIR + '/loadApp.js',
    output: {
        path: BUILD_DIR,
        filename: 'main.js'
    },
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
    }
};

module.exports = config;
