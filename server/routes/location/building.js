const express = require('express');
const connection = require('./db');
require('dotenv').config();

const router = express.Router();

router.get('/list', (req, res) => {
  connection.query(
    'SELECT engName, newName, oldName, latitude, longitude from building',
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

module.exports = router;
