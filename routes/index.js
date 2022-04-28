var express = require('express');
var router = express.Router();
const usersRouter = require("../api/routers/user.router")
const authRouter = require("../api/routers/auth.router")
const checkinCheckout = require("../api/routers/checkinCheckout.router")

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/api',authRouter);
router.use('/api/checkin-checkout',checkinCheckout);

router.use("/api/create-user",usersRouter);

module.exports = router;
