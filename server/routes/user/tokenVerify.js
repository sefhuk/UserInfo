const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

router.post('/tokenVerify', (req, res) => {
  try {
    jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET_KEY);
    res.send('valid');
  } catch {
    res.send('expired');
  }
});

module.exports = router;
