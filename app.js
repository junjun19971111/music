var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodemailer=require("nodemailer");
var session=require("express-session");
var bodyparser=require("body-parser");


var app=express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var playRouter = require('./routes/play');
var emailRouter = require('./routes/email');
var mannageRouter = require('./routes/mannage');
var addRouter = require('./routes/add');
var loginRouter = require('./routes/login');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyparser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/play', playRouter);
app.use('/email',emailRouter);
app.use('/mannage', mannageRouter);
app.use('/add', addRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {secure:false,maxAge:1000*60*20}
}));

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

});





module.exports = app;
