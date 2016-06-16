var gulp = require('gulp'),
   // bs = require('browser-sync').create(),
    server = require( 'gulp-develop-server' ),
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
                // browse to http://localhost:3000/ during development
                host: 'localhost',
                port: 3000,
                // proxy the Webpack Dev Server endpoint
                // (which should be serving on http://localhost:3100/)
                // through BrowserSync
                proxy: 'http://localhost:8000/',
                notify:false
            },
            // plugin options
            {
                // prevent BrowserSync from reloading the page
                // and let Webpack Dev Server take care of this
                reload: true
            }
        )
    );
    new WebpackDevServer(webpack(myConfig), {
        publicPath: '/assets/',
        stats: {
            colors: true
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

