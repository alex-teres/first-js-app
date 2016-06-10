var gulp = require('gulp'),
    bs = require('browser-sync'),
    server = require( 'gulp-develop-server' ),
    webpack = require('webpack'),
    WebpackDevServer = require("webpack-dev-server"),
    webpackConfig = require("./webpack.config.js");

gulp.task("webpack-dev-server", function() {
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;
    new WebpackDevServer(webpack(myConfig), {
        publicPath: '/assets/',
        stats: {
            colors: true
        },
        contentBase: __dirname + '/public'

    }).listen(8880, "localhost");
});

gulp.task('public', function () {
    bs.init({
       notify: false,
        proxy: 'http://localhost:8880'
    });
    gulp.watch('./public/**/*.*').on('change', bs.reload);
});

var options = {
    server: {
        path: 'server.js'
    },
    proxy: 'http://localhost:8080'
};

var serverFiles = [
    'server.js',
    'app/*/*.js'
];

gulp.task( 'server:start', function() {
    server.listen( options.server, function( error ) {
        if( ! error ) bs( options.bs );
    });
});

gulp.task( 'server:restart', function() {
    server.restart( function( error ) {
        if( !error ) bs.reload();
    });
});

gulp.task('default',['server:start', 'public','webpack-dev-server'], function () {
    gulp.watch( serverFiles, [ 'server:restart' ] )
});

