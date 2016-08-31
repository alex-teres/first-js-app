var gulp = require('gulp'),
   // bs = require('browser-sync').create(),
    server = require('gulp-develop-server'),
    webpack = require('webpack'),
    WebpackDevServer = require("webpack-dev-server"),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    webpackConfig = require("./webpack.config.js");

gulp.task("webpack-dev-server", function() {
    var myConfig = webpackConfig;
    myConfig.devtool = "eval";
    myConfig.debug = true;
    myConfig.plugins.push(
        new BrowserSyncPlugin(
            // BrowserSync options
            {
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:8000/',
                notify:false
            },
            // plugin options
            {
                reload: true
            }
        )
    );

    new WebpackDevServer(webpack(myConfig), {
        publicPath: '/assets/',
        stats: {
            colors: true
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                secure: false
            }
        },
        contentBase: __dirname + '/public'
    }).listen(8000, "localhost");
});


gulp.task( 'server:serve', ['server:start'],function () {
    gulp.watch(
        [
            'server.js',
            'app/*/*.js'
        ],
        [ 'server:restart' ]
    )
});

gulp.task( 'server:start', function() {
    server.listen({
        path: 'server.js'
    })
});

gulp.task( 'server:restart', function() {
    server.restart();
});

gulp.task('default', ['server:serve', 'webpack-dev-server']);

