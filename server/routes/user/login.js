const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('./db');
require('dotenv').config();

const router = express.Router();

router.get('/login', (req, res) => {
  const { id, password } = req.query;

  connection.query(
    `SELECT id, name FROM info WHERE id='${id}' && password='${password}'`,
    (err, result) => {
      if (!result[0]) {
        res.send('failed');
      } else {
        const accessToken = signToken(result[0].id, 'a');
        const refreshToken = signToken(result[0].id, 'r');
        connection.query(
          `UPDATE info SET refreshToken='${refreshToken}' WHERE id='${id}'`
        );
        res.send({
          name: result[0].name,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      }
    }
  );
});

const signToken = (id, type) => {
  let token = jwt.sign(
    {
      iss: 'hyuk.ml',
      exp:
        type === 'r'
          ? new Date().getTime() / 1000 + 1209600
          : new Date().getTime() / 1000 + 7200,
      aud: id,
    },
    process.env.TOKEN_SECRET_KEY
  );
  return token;
};

module.exports = router;
