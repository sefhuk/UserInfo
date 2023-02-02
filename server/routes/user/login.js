const express = require('express');
const connection = require('./db');

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

module.exports = router;
