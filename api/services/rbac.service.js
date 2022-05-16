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

    /**
     * Role functionality services start here 
     * @param {body} body 
     * @param {callback} callback
     * @returns message 
     * store the role data in databse 
     * @author sharanveer kannaujiya 
     */

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

    roleStatusUpdate: (data)=>{
        return new Promise((resolver,reject)=>{
            rbacModule.viewByIdQuery(data.id, (err,results)=>{
                if(results == null){
                    return reject(err)
                }else{
                    rbacModule.roleStatusUpdateQuery(data, (err,results)=>{
                        if(err){
                            return reject(err)
                        }
                        return resolver(results)
                    })
                }
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

    /**
     * Permission function service start here
     * @param {data} async
     * @returns results and err
     * @author sharanveer kannaujiya 
     */

     storePermissionService: (body)=>{
        // 
         return  new Promise((resolver,reject)=>{
             rbacModule.createPemissionQuery(body, (err, results)=>{
               
                 if(err){
                     return reject(err)
                 }
                 return resolver(results)
             })

         })
     },

     permissionListService: ()=>{
         return new Promise((resolver,reject)=>{
            rbacModule.listPermissionQuery((err,results)=>{

                if(err){
                    return reject(err)
                }
                return resolver(results)
            })
         })
     },
     permissionViewService: (id)=>{
         return new Promise((resolver,reject)=>{
             rbacModule.viewPermissionQuery(id, (err,results)=>{
                 if(err){
                     return reject(err)
                 }
                 return resolver(results)
             })
         })

     },

     permissionUpdateService: (data)=>{
         return new Promise((resolver,reject)=>{
             rbacModule.updatePermissionQuery(data,(err,results)=>{
                 if(err){
                     return reject(err)
                 }
                 return resolver(results)
             })
         })
     },
     permissionChangeStatus: (data)=>{
         return new Promise((resolver,reject)=>{
             rbacModule.statusUpdatePermissionQuery(data,(err,results)=>{
                 if(err){
                     return reject(err)
                 }
                 return resolver(results)
             })
         })
     },

     /**
      * Role Permission service start here
      * @param {body} async
      * @returns error and results
      * @author sharanveer kannaujiya 
      */
     storeRolePermissionService: (body)=>{
      return new Promise((resolver,reject)=>{
          rbacModule.createRolePermissionQuery(body,(err,results)=>{
              if(err){
                  return reject(err)
              }
              return resolver(results)
          })
      })
     },
     ListRolePermissionService: ()=>{
        return new Promise((resolver,reject)=>{
            rbacModule.listRolePermissionQuery((err,results)=>{
                if(err){
                    return reject(err)
                }
                return resolver(results)
            })
        })
     },
     viewRolePermissionService: (id)=>{
        return new Promise((resolver,reject)=>{
            rbacModule.viewRolePermissionQuery(id, (err,results)=>{
                if(err){
                    return reject(err)
                }
                return resolver(results)
            })
        })
     },

     editRolePermissionService: (data)=>{
        return new Promise((resolver,reject)=>{
            rbacModule.updateRolePermissionQuery(data, (err,results)=>{
                if(err){
                    return reject(err)
                }
                return resolver(results)
            })
        })
     },
     changeStatusRolePermissionService: (data)=>{
         return new Promise((resolver,reject)=>{
             rbacModule.updateStatusRolePermissionQuery(data, (err,results)=>{
                //  let collection = collect(err);
                //  collection.dd();
                 if(err){
                    return reject(err)
                }
                return resolver(results)
            })
        })
     },
     // End Role Permission service here





    assignRoleToUserService: (body)=>{
        return new Promise((resolver,reject)=>{
            rbacModule.assignRoleToUserQuery(body,(err,results)=>{
               if(err){
                   return reject(err)
               }
               return resolver(results)
            })
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
