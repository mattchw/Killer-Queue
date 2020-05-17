const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// config
const { PORT, CONNECTION_URL, DATABASE_NAME } = require('./config/config');

// routes
const authRouter = require('./routes/authRoute');
const restaurantRouter = require('./routes/restaurantRoute');
const userRouter = require('./routes/userRoute');
const ticketRouter = require('./routes/ticketRoute');

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

app.use(restaurantRouter);
app.use(userRouter);
app.use(ticketRouter);

app.set('json spaces', 2); // number of spaces for indentation

app.all('/oauth/token', authRouter.obtainToken);

app.get('/', authRouter.authenticateRequest, function(req, res) {

	res.send('Check token success');
});

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});