const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('api is running...');
})

app.listen(PORT, () => {
    debug(`running server on port ${chalk.green(PORT)}`)
})