const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/database');
const {createUser} = require("../controllers/users/user.controller");
const userMiddleware = require('../middleware/auth');
const dateTime = require('node-datetime');
const dt = dateTime.create();
const created = dt.format('Y-m-d H:M:S')
const collect = require('collect.js');
// let collection = collect('ddd');
// collection.dd();

router.post('/sign-up', userMiddleware.validateRegister, createUser);
router.post('/login', (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE email = ?`,
        [req.body.email],
      (err, result) => {
           
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
                statusCode:400,
                success:false,
                message:err,
          });
        }
        if (!result.length) {
          return res.status(401).send({
              statusCode: 401,
              success:false,
              message: 'Username or password is incorrect!'
          });
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
            //   `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
                statusCode:200,
                success: true,
                message: "success",
                token,
                user: result[0]
            });
          }
          return res.status(401).send({
              statusCode:401,
              success:false,
              message: "Username or password is incorrect!"
          });
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
module.exports = router; 