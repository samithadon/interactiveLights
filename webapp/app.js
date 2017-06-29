// var browserify = require('browserify-middleware');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var nib = require('nib');

// Data base manager
var DBM = new require('./db/DBManager.js');
var db = new DBM('App');
DBM.initModels();
DBM.init();

var app = express();

var routes = require('./routes/index');
var users = require('./routes/users');
// var about = require('./routes/about');

//  Stylus an nib combination
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    // .set('compress', true)
    .set('warn', true)
    .use(nib());
    // .import('nib');
    // .render(function(err, css){
    // // logic
    //     if (err){
    //         console.log(css);
    //     }
    // });
}

//provide browserified versions of all the files in a directory
// app.use('/js/pixi.js', browserify('./client/pixi/pixi.js'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));

// things that has to be changed according to the environment
if (app.get('env') === 'development') {
    app.use(logger('dev'));
    app.set('port', process.env.PORT || 3000);
}else if(app.get('env') === 'production'){
    app.set('port', process.env.PORT || 80);
    app.use(logger('short'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Database MongoDB
// Make our db accessible to our router
// app.use(function(req,res,next){
//     req.db = db;
//     next();
// });

//  Stylus
// app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(stylus.middleware({
    src: path.join(__dirname, 'stylus'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    compile: compile
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
// app.use('/about', about);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
