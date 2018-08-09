var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

const fatura = require('./routes/fatura.route'); 
var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let dev_db_url = 'mongodb://faturas-db:faturas-db123@ds159641.mlab.com:59641/faturas-db';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.set('view engine', 'html');
app.use('/faturas', express.static(path.join(__dirname, 'dist')));
app.use('/api/faturas', fatura);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
