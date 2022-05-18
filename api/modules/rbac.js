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
function createRolePermissionQuery(data, callback){
    pool.query(
        `insert into allow_role_permissions(role_id,permission_id,created_at,updated_at) values(?,?,?,?)`,
        [
            data.role_id,
            data.permission_id,
            created,
            created
        ],      
        (error, results) => {
            if(error){
                return callback(error);
            }
            return callback(error, results);
        }
    );
}

function listRolePermissionQuery(callback){
    pool.query(
        `select * from allow_role_permissions`,
        (error,results)=>{
            if(error){
                return callback(error)
            }
            return callback(error,results)
        }
    )
}

function viewRolePermissionQuery(id, callback){
    pool.query(
        `select * from allow_role_permissions where id = '${id}'`,
        (error,results)=>{
            if(error){
                return callback(error)
            }
            return callback(error,results)
        }
    )
}

function updateRolePermissionQuery(body,callback){
    let id = body.id;
    let roleId = body.role_id;
    let permissionId = body.permission_id;
    pool.query(
        `UPDATE allow_role_permissions SET role_id = '${roleId}', permission_id='${permissionId}', updated_at='${created}' WHERE id = '${id}'`,
        (error, results) => {
            if(error){
                return callback(error);
            }
            return callback(error,results);
        }
    );
}

function updateStatusRolePermissionQuery(data, callback){
    let id = data.id;
    let value = data.value;
    pool.query(
        `UPDATE allow_role_permissions SET status = '${value}', updated_at='${created}' WHERE id = '${id}'`,
        (error, results) => {
            if(error){
                return callback(error);
            }
            return callback(error,results);
        }
    );
}
function assignRoleToUserQuery(data,callback){
    let userId = data.user_id;
    let roleId = data.role_id;
    pool.query(
        `UPDATE users SET role = '${roleId}', updated_at='${created}' WHERE id = '${userId}'`,
        (error, results) => {
            if(error){
                return callback(error);
            }
            return callback(error,results);
        }
    );
}

function getPermissionByRoleId(roleId,callback){

    pool.query(
        `select permission_id from allow_role_permissions where role_id = '${roleId}' and status = 1`,
        (error,results)=>{
            if(error){
                return callback(error)
            }
            return callback(error,results)
        }
    )
}

function checkPermission(permissionName,callback){
   
    pool.query(
        `select * from permissions where permission_name = '${permissionName}' and status = 1`,
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
    roleStatusUpdateQuery,
    createPemissionQuery,
    listPermissionQuery,
    viewPermissionQuery,
    updatePermissionQuery,
    statusUpdatePermissionQuery,
    createRolePermissionQuery,
    listRolePermissionQuery,
    viewRolePermissionQuery,
    updateRolePermissionQuery,
    updateStatusRolePermissionQuery,
    assignRoleToUserQuery,
    checkPermission,
    getPermissionByRoleId,

}