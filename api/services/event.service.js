const pool = require("../../config/database")
const dateTime = require('node-datetime');
const dt = dateTime.create();
var created = dt.format('Y-m-d H:M:S')
const collect = require('collect.js');
const res = require("express/lib/response");


module.exports = {
    createEventType: (data)=>{

        return new Promise((resolver,reject)=>{
            pool.query(
                `insert into event_types(name,created_at,updated_at) values(?,?,?)`,
                [data.name,
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
    checkEvent: (data)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `select * from event_types where name = '${data.name}'`,
                [data.name],
                (error,results)=>{  
                    if(error){
                        return reject(error)
                    }
                    return resolver(results[0])
                }
            )  
        })
    },
    getLeaveTypeById: (id)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `select * from event_types where id = '${id}'`,
                (error,results)=>{  
                    if(error){
                        return reject(error)
                    }
                    return resolver(results[0])
                }
            )  
        })
    },

    getLeaveTypeList: (id)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `select * from event_types`,
                (error,results)=>{  
                    if(error){
                        return reject(error)
                    }
                    return resolver(results)
                }
            )  
        })
    },
    updateEventType: (body)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `update event_types set name= '${body.name}' where id = '${body.id}'`,
                (error,results)=>{
                    if(error){
                        return reject(error)
                    }
                    return resolver(results)
                }
            )
        })
    },
    createEvent: (data)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `insert into events(title,event_type,date,description,is_holiday,holiday_from_date,holiday_to_date,created_at,updated_at) values(?,?,?,?,?,?,?,?,?)`,
                [
                    data.title,
                    data.event_type,
                    data.date,
                    data.description,
                    data.is_holiday,
                    data.holiday_from_date,
                    data.holiday_to_date,
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
    }
}
