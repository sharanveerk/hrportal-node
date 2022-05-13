const pool = require("../../config/database");
const dateTime = require('node-datetime');
const jwt = require('jsonwebtoken');
const dt = dateTime.create();
const rbacModule = require("../modules/rbac")
const created = dt.format('Y-m-d H:M:S')
const collect = require('collect.js');
const res = require("express/lib/response");
const { NULL } = require("mysql/lib/protocol/constants/types");
// let collection = collect(token);
// collection.dd();

module.exports = {

    createRoleQuery: (body, callback)=>{
        rbacModule.storeRoleQuery(body,(err,results)=>{
            if(err){
                return callback(err)
            }
            return callback(err,results)
        })
    },
    
    getAllRoleQuery: ()=>{
        return  new Promise ((resolver,reject)=>{
                rbacModule.roleList((err,results)=>{
                if(err){
                    return reject(err)
                }
                 return resolver(results)

            }) 
        })
    },
    
    queryUpdateRole: (body)=>{
        return  new Promise((resolver,reject)=>{
            rbacModule.updateRoleQuery(body,(err,results)=>{
                if(err){
                    return reject(err)
                }
                return resolver(results)
            })
        })
    },
    viewRole: (id)=>{
        return new Promise((resolver,reject)=>{
            rbacModule.viewByIdQuery(id,(err,results)=>{
                if(err){
                    return reject(err)
                }
                return resolver(results)
            })
        })
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
    roleNameExist:(roleName, callback)=>{ 
        rbacModule.checkRoleNameExist(roleName, (err,results)=>{
            if(err){
                return callback(err)
            }
            return callback(err,results)
        })
    },
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
    createAllowRolePermissionQuery: (body,callback)=>{
        pool.query(
            `insert into allow_role_permissions(role_id,permission_id,created_at,updated_at) values(?,?,?,?)`,
            [
                body.role_id,
                body.permission_id,
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
    listAllowRolePermissionQuery: (callback)=>{
        pool.query(
            `select * from allow_role_permissions`,
            
            (error, results, fields) => {
                  
                if(error){
                    return callback(error);
                }
                return callback(results);
            }
        );
    },
    updateAllowRolePermissionQuery: (body, callback)=>{
        let id = body.id;
        let roleId = body.role_id;
        let permissionId = body.permission_id;
        pool.query(
            `UPDATE allow_role_permissions SET role_id = '${roleId}', permission_id='${permissionId}', updated_at='${created}' WHERE id = '${id}'`,
            (error, results, fields) => {
            
                if(error){
                    return callback(error);
                }
                return callback(results);
            }
        );
    },

    viewAllowRolePermissionQuery: (id,callback)=>{
        pool.query(
            `select * from allow_role_permissions where id = '${id}'`,
            
            (error, results, fields) => {
                  
                if(error){
                    return callback(error);
                }
                return callback(results);
            }
        );
    },
    deleteAllowRolePermissionQuery: (id,callback)=>{
        pool.query(
            `DELETE FROM allow_role_permissions WHERE id = '${id}'`,
            (error, results, fields) => {
               
                if(error){
                    return callback(error);
                }
                return callback(results);
            }
        );
    },


};
