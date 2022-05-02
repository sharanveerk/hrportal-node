const pool = require("../../config/database");
const dateTime = require('node-datetime');
const jwt = require('jsonwebtoken');

const dt = dateTime.create();

const collect = require('collect.js');
const res = require("express/lib/response");
// let collection = collect(token);
// collection.dd();

const created = dt.format('Y-m-d H:M:S')
module.exports = {

    getUserQuery: (callback)=>{
        pool.query(
            `select * from users`,
            (error, results, fields) => {  
            
                if(error){
                  return  callback(error);
                }
                return callback(null, results);
            }
        );
    },

    assignRoleQuery: (data,callback)=>{
        let id = data.id;
        let roleName = data.role_name;
        pool.query(
            `UPDATE users SET role = '${roleName}' WHERE id = '${id}'`,
            
            (error, results, fields) => {
                if(error){
                    let collection = collect(error);
                    collection.dd();
                    return callback(error);
                }
                return callback(results);
            }
        );
    }
};