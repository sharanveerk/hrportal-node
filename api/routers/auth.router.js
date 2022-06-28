const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/database');
const {createUser, logoutUser,checkAutToken} = require("../controllers/users/user.controller");
const userMiddleware = require('../middleware/auth');
const errorResponse = require("../services/errorResponse.service");
const dateTime = require('node-datetime');
const dt = dateTime.create();
const created = dt.format('Y-m-d H:M:S')
const collect = require('collect.js');

router.post('/sign-up', createUser);
router.patch('/check-token', userMiddleware.isLoggedIn,checkAutToken);


router.post('/login', (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE email = ?`,
        [req.body.email],
      (err, result) => {
        
        // user does not exists
        if (err) {
          throw err;
          return errorResponse(res,400,false,err);
        }
        if (!result.length) {
          const message = "Email is incorrect!";
          return errorResponse(res,401,false,message);
         
        }

        // check password
        if (result) {
            const token = jwt.sign({
                email: result[0].email,
                userId: result[0].id
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );
            db.query(
                `INSERT INTO user_tokens (user_id, token, created_at,updated_at) VALUES (?,?,?,?)`,
                [
                    result[0].id,
                    token,
                    created,
                    created
                ],
            );
            return res.status(200).send({
                statusCode:200,
                success: true,
                message: "success",
                token,
                user: result[0]
            });
          }
          const message = "Email is incorrect!";
          return errorResponse(res,401,false,message);
        
      }
    );
  });
  
router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  return res.status(200).send({
      statusCode:200,
      success:true,
      message: "Authorized!"
  });
});

router.post('/logout', userMiddleware.isLoggedIn, logoutUser)

module.exports = router; 
