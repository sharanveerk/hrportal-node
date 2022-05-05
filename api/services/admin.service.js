const pool = require("../../config/database");
const dateTime = require('node-datetime');
const jwt = require('jsonwebtoken');

const dt = dateTime.create();

const collect = require('collect.js');
const res = require("express/lib/response");
const { NULL } = require("mysql/lib/protocol/constants/types");
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
    },
    updateRoleQuery: (data,callback)=>{
        let id = data.id;
        pool.query(
            `select * from users where id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(results);
            }
        );
    },
    removeRoleQuery: (id,callback)=>{
        pool.query(
            `UPDATE users SET role = NULL WHERE id = '${id}'`,
            
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(results);
            }
        );
    },
    createRoleQuery: (body, callback)=>{
        pool.query(
            `insert into roles(name,created_at,updated_at) values(?,?,?)`,
            [
                body.name,
                created,
                created
            ],
            
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        ); 
    },
    getAllRoleQuery: (callback)=>{
        pool.query(
            `select * from roles`,
            
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(results);
            }
        );
    },
    queryUpdateRole: (body, callback)=>{
        let name = body.name;
        let id = body.id
        pool.query(
            `UPDATE roles SET name = '${name}', updated_at='${created}' WHERE id = '${id}'`,
            (error, results, fields) => {
                // let collection = collect(results);
                // collection.dd();
                if(error){
                    return callback(error);
                }
                return callback(results);
            }
        );
    },
    deleteRoleQuery: (id, callback)=>{
     
        pool.query(
            `DELETE FROM roles WHERE id = '${id}'`,
            (error, results, fields) => {
               
                if(error){
                    return callback(error);
                }
                return callback(results);
            }
        );
    },
    storePermissionQuery: (body, callback)=>{
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
                return callback(null, results);
            }
        ); 
    },
    getPermissionByIdQuery: (id,callback)=>{
        pool.query(
            `select * from permissions where id = '${id}'`,
            
            (error, results, fields) => {
                    //    let collection = collect(results);
                    // collection.dd();
                if(error){
                    return callback(error);
                }
                return callback(results);
            }
        );
    },
    listPermissionQuery: (callback)=>{
        pool.query(
            `select * from permissions`,
            
            (error, results, fields) => {
                    //    let collection = collect(results);
                    // collection.dd();
                if(error){
                    return callback(error);
                }
                return callback(results);
            }
        );
    },
    updatePermissionQuery: (body, callback)=>{
        let permission_name = body.permission_name;
        let parent = body.parent;
        let id = body.id;
        pool.query(
            `UPDATE roles SET permission_name = '${permission_name}', parent='${parent}', updated_at='${created}' WHERE id = '${id}'`,
            (error, results, fields) => {
                // let collection = collect(results);
                // collection.dd();
                if(error){
                    return callback(error);
                }
                return callback(results);
            }
        );
    },
    deletePermissionQuery: (id, callback)=>{
       
        pool.query(
            `DELETE FROM permissions WHERE id = '${id}'`,
            (error, results, fields) => {
               
                if(error){
                    return callback(error);
                }
                return callback(results);
            }
        );
    },
};
