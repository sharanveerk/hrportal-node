var express = require('express');
var router = express.Router();
const usersRouter = require("../api/routers/user.router")
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.get('/api',function(req,res,next){
//   res.json({
//     success:200,
//     message:"success"
//   });
// });

router.use("/api/create-user",usersRouter);
module.exports = router;
