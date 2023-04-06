//var createError = require('http-errors');
const express = require('express');
const expressHbs = require('express-handlebars')
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require("body-parser");
const config = require('./config/database');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const apiRouter = require('./routes/api');

const app = express();

app.engine('.hbs', expressHbs.engine({
  extname: 'hbs',
  defaultLayout:'main',
  layoutsDir: 'views/layouts/'
}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });



app.use(passport.initialize());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next();
});

module.exports = app;

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
