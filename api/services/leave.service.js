const pool = require("../../config/database")
const dateTime = require('node-datetime');
const dt = dateTime.create();
var created = dt.format('Y-m-d H:M:S')
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


    //***********here stop leave type function */

    //*********here start leave function */

    createLeave: (data,documents,userId)=>{
        let fromDate = data.from_date.split('/')
        let formatFDate = fromDate[2]+'-'+fromDate[1]+'-'+fromDate[0]
        
        let toDate = data.to_date.split('/')
        let formatTDate = toDate[2]+'-'+toDate[1]+'-'+toDate[0]

        return new Promise ((resolver,reject)=>{
            pool.query(
                `insert into leaves(leave_type_id,user_id,from_date,to_date,reasons,document) values(?,?,?,?,?,?)`,
                [
                    data.leave_type_id,
                    userId,
                    formatFDate,
                    formatTDate,
                    data.reasons,
                    documents
                ],
                (error,results)=>{
                    if(error){
                        return reject(error)
                    }
                    return resolver(results)
                }
            )
        })
    },

    getByLeaveId :(id)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `select * from leaves where id = '${id}'`,
                (error,results)=>{
                    if(error){
                        return reject(error)
                    }
                    return resolver(results[0])
                }
            )
        })
    },
    getLeaves : (id)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `select * from leaves`,
                (error,results)=>{
                    if(error){
                        return reject(error)
                    }
                    return resolver(results)
                }
            )
        })
    },

    updateLeave: (data,userId,document=null)=>{
        return new Promise((resolver,reject)=>{
            let fromDate = data.from_date.split('/')
            let formatFDate = fromDate[2]+'-'+fromDate[1]+'-'+fromDate[0]
            
            let toDate = data.to_date.split('/')
            let formatTDate = toDate[2]+'-'+toDate[1]+'-'+toDate[0]

            if(document !== null){
                pool.query(
                    `update leaves set leave_type_id = '${data.leave_type_id }',from_date = '${formatFDate}',to_date = '${formatTDate}',reasons = '${data.reasons}',document = '${document}',updated_at = '${created}' where id = '${data.leave_id}' and user_id = '${userId}'`,
                    (error,results)=>{
                        if(error){
                            return reject(error)
                        }
                        return resolver(results)
                    }
                )
                //update with image
            }else{
                pool.query(
                    `update leaves set leave_type_id = '${data.leave_type_id }',from_date = '${formatFDate}',to_date = '${formatTDate}',reasons = '${data.reasons}',updated_at = '${created}' where id = '${data.leave_id}' and user_id = '${userId}'`,
                    (error,results)=>{
                        if(error){
                            return reject(error)
                        }
                        return resolver(results)
                    }
                )
                //update without image
            }
        })
    },
    statusUdateLeaves: (id,val)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `update leaves set status='${val}' where id = '${id}'`,
                (error,results)=>{
                    if(error){
                        return reject(error)
                    }
                    return resolver(results)
                }
            )
        })
    },
    approveByApproverLeaves: (id,userId)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `update leaves set approver='${userId}' where id = '${id}'`,
                (error,results)=>{
                    if(error){
                        return reject(error)
                    }
                    return resolver(results)
                }
            )
        })
    },
    geUserByLeaves: (userId)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `SELECT 
                    leaves.id AS leaves_id,
                    leaves.leave_type_id,
                    leaves.user_id,
                    leaves.approver,
                    leaves.from_date,
                    leaves.to_date,
                    leaves.reasons,
                    leaves.document,
                    leave_types.id,
                    leave_types.leave_type_name,
                    leave_types.is_paid,
                    leave_types.allow_number_of_leaves,
                    users.name AS approved_by,
                    DATEDIFF(leaves.to_date, leaves.from_date) AS total_leaves_days,
                    CASE
                        WHEN leaves.approver = 0 THEN 'not approved'
                        ELSE 'approved'
                    END AS approver
                FROM
                    leaves
                        INNER JOIN
                    leave_types ON leaves.leave_type_id = leave_types.id
                        LEFT JOIN
                    users ON leaves.approver = users.id
                WHERE
                    user_id = '${userId}'
                ORDER BY leaves.id DESC`,
                (error,results)=>{
                    if(error){
                        return reject(error)
                    }
                    return resolver(results)
                }
            )
        })
    }

}