const pool = require("../../config/database")

const collect = require('collect.js');
const res = require("express/lib/response");


module.exports = {
    createLeaveType: (data)=>{

        let isPaid = (data.is_paid == "yes") ? "yes" : "no";
        return new Promise((resolver,reject)=>{
          pool.query(
              `insert into leave_types(leave_type_name,is_paid,allow_number_of_leaves) values(?,?,?)`,
              [data.leave_type_name,isPaid,data.allow_number_of_leaves],
              (error,results)=>{  
              
                  if(error){
                      return reject(error)
                  }
                  return resolver(results)
              }
          )  
        })
    },

    getLeaveType: (id = null)=>{

        return new Promise ((resolver,reject)=>{
            if(id !== null){
                pool.query(
                    `select * from leave_types where id = '${id}'`,
                    (error,results)=>{
                      
                        if(error){
                            return reject(error)
                        }
                        return resolver(results[0])
                    }
                )
            }else{
                pool.query(
                    `select * from leave_types`,
                    (error,results)=>{
                       
                        if(error){
                            return reject(error)
                        }
                        return resolver(results)
                    }
                )
            }
        })
    },
    updateLeaveType: (body)=>{
        return new Promise ((resolver,reject)=>{
            let id = body.id
            let isPaid = (body.is_paid == "yes") ? "yes" : "no"
            let leaveTypeName = body.leave_type_name
            let anol = body.allow_number_of_leaves
            pool.query(
                `update leave_types set leave_type_name = '${leaveTypeName}',is_paid = '${isPaid}', allow_number_of_leaves = '${anol}' where id = '${id}'`,
                (error,results)=>{
                    if(error){
                        return reject(error)
                    }
                    return resolver(results)
                }
            )
        })
    },
    statusUpdateLeaveType: (data)=>{
        return new Promise ((resolver,reject)=>{
            pool.query(
                `update leave_types set status = '${data.value}' where id = '${data.id}'`,
                (error,results)=>{
                    if(error){
                        return reject(error)
                    }
                    return resolver(results)
                }
            )
        })
    },
}