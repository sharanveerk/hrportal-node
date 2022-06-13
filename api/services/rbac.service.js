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
                 if(err){
                    return reject(err)
                }
                return resolver(results)
            })
        })
     },

     // End Role Permission service here
     
     /**
      * 
      * @param {body} body 
      * @returns results or error by using Promises
      * @author sharanveer kannaujiya
      */

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
    /**
     * check permission 
     * @return role base permissions by role id
     * @author sharanveer kannaujiya
     */
    //  checkPermissionService,
    checkPermissionService: (userId,permissionName)=>{
        return new Promise ((resolver,reject)=>{
            pool.query(
                `select role from users where id='${userId}' and status = 1`,
                (error,results)=>{
                    
                    if(error){
                        return reject(error)
                    }
                    let roleId = results[0].role
                    rbacModule.getPermissionByRoleId(roleId, (prErr,prResults)=>{
                        if(prErr){
                            return reject(prErr)
                        }
                        rbacModule.checkPermission(permissionName,(pErr,pResults)=>{
                         
                            if(pResults == null){
                                return reject(pErr)
                            }
                            var arr = prResults
                            let pId  = pResults.id
                            let result = arr.map(ele => ele.permission_id);
                            let arrInCheck = result.includes(pId)
                            if(arrInCheck){
                                return resolver(pResults)
                            }
                        })
                    })
                }
            )
        })
    },
    getAssignUserRoleList: ()=>{
        return new Promise ((resolver,reject)=>{
            pool.query(
                `SELECT 
                    roles.id AS role_id,
                    roles.name AS role_name,
                    users.name AS user_name,
                    users.id AS user_id
                FROM
                    roles
                        INNER JOIN
                    users ON roles.id = users.role
                ORDER BY users.id DESC`,
                (error,results)=>{
                    if(error){
                        return reject(error)
                    }
                    return resolver(results)
                }
            )
        })
    }
};


