const pool = require("../../../config/database");
const config = require("../../../config/config");
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
            `insert into users(name,gender,email,phone,firebase_token,created_at,updated_at) values(?,?,?,?,?,?,?)`,
            [
                data.name,
                data.gender,
                data.email,
                data.number,
                data.firebase_token,
                created,
                created
            ],
            (error,results,fields)=>{
                
                if(error){
                  return callback(error);
                }

                configSuperAdminEmail1 = config.super_admin_email1;       //"sharanveerk@bootesnull.com";
                configSuperAdminEmail2 = config.super_admin_email2;      //"sharan@bootesnull.com";
                var roleType = '';

                switch (data.email) {
                    case configSuperAdminEmail1:
                        var roleType = "superAdmin";
                        break;
                    case configSuperAdminEmail2:
                        var roleType = "superAdmin";
                        break;
                    default:
                        var roleType = "user";
                        break;
                }
                const token = jwt.sign({
                    email: data.email,
                    userId: results.insertId,
                    role: roleType,
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

    checkIn: (id,status,callback)=>{
        pool.query(
            `insert into checkin_checkout(user_id,status) values(?,?)`,
            [
                id,
                status,
            ],
            
            (error, results, fields) => {
                    if(error){
                           return callback(error);
                        }
                        return callback(null, results);
            }
        );

    },

    emailExist: (token ,id ,callback)=>{
        
       let check = pool.query(
            `UPDATE user_tokens SET token = '${token}',updated_at = '${created}' WHERE user_id = '${id}'`,
                
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(results);
            }
        );
    },
    userLogin: (data,callback)=>{
       
        const email = data.email;
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
    },

    userListQuery: (callback)=>{
        pool.query(
            `select * from users`,
            (error,results,fields)=>{
                // let collection = collect(results);
                // collection.dd();
                if(error){
                    return callback(error)
                }
                return callback(results)
            }
        )
    },
    updateUserDetailsQuery: (data,callback)=>{


        pool.query(
            `insert into user_details(user_id,personal_email,phone,gender,date_of_birth,position,qualification,maritial_status,date_of_joining,blood_group,permanent_address,current_address,profile_image,document,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.user_id,
                data.personal_email,
                data.phone,
                data.gender,
                data.date_of_birth,
                data.position,
                data.qualification,
                data.maritial_status,
                data.date_of_joining,
                data.blood_group,
                data.permanent_address,
                data.current_address,
                data.profile_image,
                data.document,             
                1,             
            ],
            (error, results, fields) => {
                // let collection = collect(data);
                // collection.dd();
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    }
};