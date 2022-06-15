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

    makeActiveDeactiveEventType: (data)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `update event_types set status = '${data.value}' where id='${data.id}'`,
                (error,results)=>{
                    if(error){
                        return reject(error)
                    }
                    return resolver(results)
                }
            )
        })
    },
    createEvent: (data,image)=>{

        return new Promise((resolver,reject)=>{
            pool.query(
                `insert into events(title,event_type,date,description,is_holiday,holiday_from_date,holiday_to_date,image,created_at,updated_at) values(?,?,?,?,?,?,?,?,?,?)`,
                [
                    data.title,
                    data.event_type,
                    formatDate,
                    data.description,
                    data.is_holiday,
                    formatFDate,
                    formatTDate,
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
    getLeaveList: ()=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `SELECT 
                events.id AS events_id,
                events.title AS events_title,
                events.date AS events_date,
                events.description AS events_descriptions,
                events.is_holiday AS is_holiday,
                events.holiday_from_date AS holiday_from_date,
                events.holiday_to_date AS holiday_to_date,
                event_types.name AS event_type_name,
                events.image AS image_url,
                events.status AS status
            FROM
                events
                    INNER JOIN
                event_types ON events.event_type = event_types.id
            WHERE
                events.status = 1
            ORDER BY events.created_at DESC`,
                (error,results)=>{ 
                    if(error){
                        return reject(error)
                    }
                    return resolver(results)
                }
            )  
        })
    },

    getEventById: (id)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `SELECT 
                events.id AS events_id,
                events.title AS events_title,
                events.date AS events_date,
                events.description AS events_descriptions,
                events.is_holiday AS is_holiday,
                events.holiday_from_date AS holiday_from_date,
                events.holiday_to_date AS holiday_to_date,
                event_types.name AS event_type_name,
                events.image AS image_url,
                events.status AS status
            FROM
                events
                    INNER JOIN
                event_types ON events.event_type = event_types.id
            WHERE
                events.id = '${id}'`,
                (error,results)=>{ 
                    if(error){

                        return reject(error)
                    }
                    return resolver(results[0])
                }
            )  
        })
    },

    updateEvent: (data,imageUrl)=>{

        let fromDate = data.holiday_from_date.split('/')
        let formatFDate = fromDate[2]+'-'+fromDate[1]+'-'+fromDate[0]
        
        let toDate = data.holiday_to_date.split('/')
        let formatTDate = toDate[2]+'-'+toDate[1]+'-'+toDate[0]

        let date = data.date.split('/')
        let formatDate = date[2]+'-'+date[1]+'-'+date[0]
        return new Promise ((resolver,reject)=>{
            pool.query(
                `update events set title = '${data.title}',event_type = '${data.event_type_id}',date = '${formatDate}',description = '${data.description}',is_holiday = '${data.is_holiday}',holiday_from_date = '${formatFDate}',holiday_to_date = '${formatTDate}',image = '${imageUrl}',updated_at = '${created}'`,
                (error,results)=>{
                    if(error){
                        return reject(error)
                    }
                    return resolver(results)
                }
            )
        })
    },
    deleteEventById: (id)=>{
        return new Promise ((resolver,reject)=>{
            pool.query(
                `delete from events where id ='${id}'`,
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
