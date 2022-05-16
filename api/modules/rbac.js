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

function roleStatusUpdateQuery(data, callback){

    pool.query(
        `UPDATE roles SET status = '${data.value}', updated_at='${created}' WHERE id = '${data.id}'`,
        (error, results)=>{
            if(error){
                return callback(error)
            }
            return callback(error,results)
        }
    )
}

function createPemissionQuery(body,callback){

    let parent = (body.parent) ? body.parent : 0;
    pool.query(
        `insert into permissions(permission_name,parent,created_at,updated_at) values(?,?,?,?)`,
        [
            body.permission_name,
            parent,
            created,
            created
        ],      
        (error, results, fields) => {
        
            if(error){
                return callback(error);
            }
            return callback(error, results);
        }
    ); 
}

function listPermissionQuery(callback){
    pool.query(
        `select * from permissions`,
        (error,results)=>{
            if(error){
                return callback(error)
            }
            return callback(error,results)
        }
    )
}

function viewPermissionQuery(id,callback){
    pool.query(
        `select * from permissions where id = '${id}'`,
        (error,results)=>{
            if(error){
                return callback(error)
            }
            return callback(error,results[0])
        }
    )
}
function updatePermissionQuery(body,callback){
    let permission_name = body.permission_name;
    let parent = body.parent;
    let id = body.id;
    pool.query(
        `UPDATE permissions SET permission_name = '${permission_name}', parent='${parent}', updated_at='${created}' WHERE id = '${id}'`,
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(error,results);
        }
    )
}

function statusUpdatePermissionQuery(data, callback){
    pool.query(
        `UPDATE permissions SET status = '${data.value}', updated_at='${created}' WHERE id = '${data.id}'`,
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(error,results);
        }
    )
}
// let collection = collect(error);
// collection.dd();
module.exports = {
    storeRoleQuery,
    checkRoleNameExist,
    roleList,
    updateRoleQuery,
    viewByIdQuery,
    roleStatusUpdateQuery,
    createPemissionQuery,
    listPermissionQuery,
    viewPermissionQuery,
    updatePermissionQuery,
    statusUpdatePermissionQuery,

}