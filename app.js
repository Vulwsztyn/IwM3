var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const router = require('./routes/router')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
const patientIDs = [
    1656328,
    1656327,
    1656300,
    1656311,
    1656316,
    // z obserwacjami
    1909448, // obserwacja 1909478
    295670, // obserwacja 295694
    // z medication statementami
    1952851, // statement 1952915
]

const observationIDs = [
    1909478, // pacjent 1909448
    434055, // bez pacjenta
    295694, // pacjent 295670
]

const medicationStatementIDs = [
    1952915, // pacjent 1952851
    1952838,
    1952182,
]

const medicationIDs = [1946955]

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/data', router);

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

module.exports = app;
