const pool = require("../../../config/database");
const dateTime = require('node-datetime');
const dt = dateTime.create();

const collect = require('collect.js');

// let collection = collect(token);
// collection.dd();

const created = dt.format('Y-m-d H:M:S')
module.exports = {

    create: (data,token,callback)=>{

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
                let tokk =  pool.query(`insert into user_tokens(user_id,token,created_at,updated_at) values(?,?,?,?)`,
                [
                    results.insertId,
                    token,
                    created,
                    created
                ]);
                return callback(null, results)
            }
        );
    }
};