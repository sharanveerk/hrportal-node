var express = require('express');
var router = express.Router();
// const usersRouter = require("../api/routers/user.router")
const authRouter = require("../api/routers/auth.router")
const checkinCheckout = require("../api/routers/checkinCheckout.router")
const assignRole = require("../api/routers/admin.router");
const acl = require('express-acl');
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/api',authRouter);
router.use('/api/checkin-checkout',checkinCheckout);
router.use('/api/role-assign',assignRole);
// acl.config({
//   //specify your own baseUrl
//   baseUrl: '/api/check-acl'
// });

// router.use(acl.authorize);

// router.use("/api/create-user",usersRouter);

module.exports = router;
