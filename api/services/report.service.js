const pool = require("../../config/database")
const dateTime = require('node-datetime');
const dt = dateTime.create();
var created = dt.format('Y-m-d H:M:S')
const collect = require('collect.js');
const res = require("express/lib/response");


module.exports = {
    createTesk: (data,created_by)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `insert into tasks(title,user_id,created_by,created_at,updated_at) values(?,?,?,?,?)`,
                [
                    data.title,
                    data.user_id,
                    created_by,
                    created,
                    created
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

    getUserTaskList: (userId)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `select * from tasks where user_id = '${userId}' and status = 1`,
                (error,results)=>{  
                    if(error){
                        return reject(error)
                    }
                    return resolver(results)
                }
            )  
        })
    },

    createUserTesk: (data,userId,image)=>{

        return new Promise((resolver,reject)=>{
            pool.query(
                `insert into users_update_status(user_id,task,working_hours,description,image,created_at,updated_at) values(?,?,?,?,?,?,?)`,
                [
                    userId,
                    data.task,
                    data.working_hours,
                    data.description,
                    image,
                    created,
                    created
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
    getUserReport: (userId)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `SELECT 
                users_update_status.id AS users_update_status_id,
                users_update_status.task AS task_id,
                users_update_status.description AS descriptions,
                users_update_status.working_hours AS working_hours,
                users_update_status.image AS imageUrl,
                users_update_status.status AS status,
                tasks.title AS task_title
            FROM
               users_update_status
                    INNER JOIN
                tasks ON users_update_status.task = tasks.id
            WHERE
                users_update_status.user_id = '${userId}'
            ORDER BY users_update_status.created_at DESC`,
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