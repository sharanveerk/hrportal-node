const pool = require("../../config/database");
const dateTime = require('node-datetime');
const jwt = require('jsonwebtoken');
const dt = dateTime.create()
const created = dt.format('Y-m-d H:M:S')
const collect = require('collect.js');
const res = require("express/lib/response");
const { NULL } = require("mysql/lib/protocol/constants/types");

function storeRoleQuery(data, callback){

    pool.query(
        `insert into roles(name,created_at,updated_at) values(?,?,?)`,
        [
            data.name,
            created,
            created
        ],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }else{
                return callback(error,results);
            }
        }
    ); 
}

function checkRoleNameExist(roleName, callback){
    
    pool.query(
        `select * from roles where name = '${roleName}'`,
        (error,results)=>{
           
            if(error){
                return callback(error)
            }
           return callback(error,results[0])
        }
    )
}
function roleList(callback){

    pool.query(
        `select * from roles`,
        (error,results)=>{  
          
            if(error){
                return callback(error)
            }
            return callback(error,results)
        }
    )
}

function updateRoleQuery(data,callback){
    let name = data.name
    let id = data.id
    pool.query(
        `UPDATE roles SET name = '${name}', updated_at='${created}' WHERE id = '${id}'`,
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(error,results);
        }
    );
}
function viewByIdQuery(id,callback){
    pool.query(
        `select * from roles where id='${id}'`,
        (error,results)=>{  
            if(error){
                return callback(error)
            }
            return callback(error,results[0])
        }
    )
}
module.exports = {
    storeRoleQuery,
    checkRoleNameExist,
    roleList,
    updateRoleQuery,
    viewByIdQuery,

}