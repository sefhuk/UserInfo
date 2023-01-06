const e = require('express');
const express = require('express');
const connection = require('./db');
require('dotenv').config();

const router = express.Router();

router.get('/register/checkId', (req, res) => {
  const id = req.query.id;

  connection.query(`SELECT * FROM info WHERE id='${id}'`, (err, result) => {
    if (err) throw err;
    result[0] ? res.send('true') : res.send('false');
  });
});

router.post('/register', (req, res) => {
  const { id, password, name, phone_number, email } = req.body;

  connection.query(
    `INSERT INTO info VALUES ('${id}', '${password}', '${name}', '${phone_number}', '${email}')`,
    (err, rows) => {
      if (err) throw err;
      res.json({ result: 'true' });
    }
  );
});

module.exports = router;
