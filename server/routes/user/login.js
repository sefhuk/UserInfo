const e = require('express');
const express = require('express');
const connection = require('./db');
require('dotenv').config();

const router = express.Router();

router.get('/login', (req, res) => {
  const { id, password } = req.query;

  connection.query(
    `SELECT name FROM info WHERE id='${id}' && password='${password}'`,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.post('/login', (req, res) => {
  console.log(req.body);
});

module.exports = router;
