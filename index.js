const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// config
const { PORT, CONNECTION_URL, DATABASE_NAME } = require('./config/config');
const port = process.env.PORT || 3000;

// routes
const authRouter = require('./routes/authRoute');
const shopRouter = require('./routes/shopRoute');
const userRouter = require('./routes/userRoute');
const ticketRouter = require('./routes/ticketRoute');
const appointmentRouter = require('./routes/appointmentRoute');

// helpers
const reqHelper = require('./helpers/request');
const resHelper = require('./helpers/response');

// logger
const log4js = require("log4js");
const logger = log4js.getLogger();
log4js.configure({
  appenders: {
    out: { type: 'stdout', layout: {
      type: 'pattern',
      pattern: '[%d] (%z) [%p]: %m'
    }}
  },
  categories: { default: { appenders: ['out'], level: 'debug' } }
});
app.use(log4js.connectLogger(logger, { 
  level: 'auto', 
  format: ':method :url HTTP/:http-version | request end | status: :status | elapsed time: :response-time ms'
}));

// mongodb connection
mongoose.connect(CONNECTION_URL+DATABASE_NAME, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
});

// mongodb connection error handling
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.log = logger;
  req.logger = reqHelper.logMsg;
  res.sendRes = resHelper;

  //initialize request parameters (request_id / start time...)
  req.logger(req, "info", "request start");
  
  return next();
});

app.use(shopRouter);
app.use(userRouter);
app.use(ticketRouter);
app.use(appointmentRouter);

app.set('json spaces', 2); // number of spaces for indentation

app.all('/oauth/token', authRouter.obtainToken);

app.get('/', authRouter.authenticateRequest, function(req, res) {

	res.send('Check token success');
});

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});