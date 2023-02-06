const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.SERVER_PORT;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/user/login');
const registerRouter = require('./routes/user/register');
const buildingRouter = require('./routes/location/building');
const tokenVerifyRouter = require('./routes/user/tokenVerify');

app.use('/', indexRouter);
app.use('/account', loginRouter);
app.use('/account', registerRouter);
app.use('/account', tokenVerifyRouter);
app.use('/location', buildingRouter);

app.listen(port, () => {
  console.log('server start!  port: ', port);
});
