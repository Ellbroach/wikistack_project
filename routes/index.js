const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki.js')
const userRouter = require('./user.js')

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

router.use('/', function(req, res, next) {
  res.send('Main page');
})

module.exports = router;
