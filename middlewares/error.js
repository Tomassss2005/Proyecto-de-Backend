const express = require('express');
const app = express();

const error = ((error, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = error;