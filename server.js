const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');

const connectDb = require('./config/db');

const app = express();
//connecting to db
connectDb()

const PORT = process.env.PORT || 5000;

//defining routes
app.get('/', (req, res) => {res.send('api is running...')})
app.use('/api/v1/users', require('./routes/api/users')());
app.use('/api/v1/auth', require('./routes/api/auth')());
app.use('/api/v1/profile', require('./routes/api/profile')());
app.use('/api/v1/posts', require('./routes/api/posts')());

app.listen(PORT, () => {
    debug(`running server on port ${chalk.green(PORT)}`)
})