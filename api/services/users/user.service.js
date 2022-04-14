const pool = require("../../../config/database");
const dateTime = require('node-datetime');
const jwt = require('jsonwebtoken');

const dt = dateTime.create();

const collect = require('collect.js');
const res = require("express/lib/response");
// let collection = collect(token);
// collection.dd();

const created = dt.format('Y-m-d H:M:S')
module.exports = {

    create: (data,callback)=>{

        pool.query(
            `insert into users(name,gender,email,phone,created_at,updated_at) values(?,?,?,?,?,?)`,
            [
                data.name,
                data.gender,
                data.email,
                data.number,
                created,
                created
            ],
            (error,results,fields)=>{
                
                if(error){
                  return callback(error);
                }
                

                const token = jwt.sign({
                    email: data.email,
                    userId: results.insertId
                  },
                  'SECRETKEY', {
                    expiresIn: '7d'
                  }
                );
                
                let tokk =  pool.query(`insert into user_tokens(user_id,token,created_at,updated_at) values(?,?,?,?)`,
                [
                    results.insertId,
                    token,
                    created,
                    created
                ]);
                return callback(null, results,token)
            }
        );
    },

    getUserByid: (id,callback)=>{
        pool.query(
            `select * from users where id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                   return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    userLogin: (data,callback)=>{
       
        const email = data.email;
        // let collection = collect(data.items);
        // collection.dd(collection);
        pool.query(
            `select * from users join user_tokens on users.id = user_tokens.user_id where email = ?`,
            [email],
            (error, results, fields) => {  
                // let collection = collect(results);
                // collection.dd();
                if(error){
                  return  callback(error);
                }
                return callback(null, results);
            }
        );
    }
};