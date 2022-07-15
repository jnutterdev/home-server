const createError = require('http-errors');
const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./app/server/routes/index');
const usersRouter = require('./app/server/routes/users.routes');

const app = express();

const dotenv = require('dotenv');
dotenv.config();


app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// DB connection
const db = require("./app/server/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.json({
    message: err.message,
    error: err
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;