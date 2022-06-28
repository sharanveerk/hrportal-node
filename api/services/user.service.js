const pool = require("../../config/database");
const config = require("../../config/config");
const dateTime = require('node-datetime');
const jwt = require('jsonwebtoken');
const dt = dateTime.create();
const collect = require('collect.js');
const res = require("express/lib/response");

var created = dt.format('Y-m-d H:M:S')
module.exports = {

    create: (data,callback)=>{
  
        pool.query(
            `insert into users(name,email,firebase_token,created_at,updated_at) values(?,?,?,?,?)`,
            [
                data.name,
                data.email,
                data.firebase_token,
                created,
                created
            ],
            (error,results,fields)=>{
               
                if(error){
                  return callback(error);
                }
                var roleId = 3;
                var configSuperAdminEmail1 = config.super_admin_email1;       //"sharanveerk@bootesnull.com";
                var configSuperAdminEmail2 = config.super_admin_email2;      //"sharan@bootesnull.com";
                if(configSuperAdminEmail1 == data.email || configSuperAdminEmail2 == data.email){
                    var roleId  = 1;
                }
                const token = jwt.sign({
                    email: data.email,
                    userId: results.insertId,
                    role: roleId,
                  },
                  'SECRETKEY', {
                    expiresIn: '7d'
                  }
                );
                
                let tokk =  pool.query(`insert into user_tokens(user_id,token,created_at,updated_at) values(?,?,?,?)`,
                [
                    results.insertId,
                    token,
                    created,
                    created
                ]);
                return callback(null, results,token)
            }
        );
    },

    checkIn: (id,status,callback)=>{
        pool.query(
            `insert into checkin_checkout(user_id,timestamp,status) values(?,?,?)`,
            [
                id,
                created,
                status

            ],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                var createdDate ;
                if(status == 2){

                    var createdDate = created.split(' ');
                }else{
                    var createdDate = created.split(' ');
                }
                // collect(status).dd();
               return callback(error, createdDate[1]);
            }
        );

    },

    emailExist: (token ,id ,callback)=>{
        
        pool.query(
            `UPDATE user_tokens SET token = '${token}',updated_at = '${created}' WHERE user_id = '${id}'`,
                
            (error, results, fields) => {
                
                if(error){
                    return callback(error);
                }
                return callback(results);
            }
        );
    },
    userLogin: (data,callback)=>{
       
        const email = data.email;
        pool.query(
            `select * from users join user_tokens on users.id = user_tokens.user_id where email = ?`,
            [email],
            (error, results, fields) => {  
                // let collection = collect(results);
                // collection.dd();
                if(error){
                  return  callback(error);
                }
                return callback(null, results);
            }
        );
    },

    userListQuery: (callback)=>{
        pool.query(
            `SELECT 
            users.id AS id,
            users.name AS name,
            users.last_name AS last_name,
            users.email AS email,
            users.email_verified_at AS email_verified_at,
            roles.name AS role,
            users.status AS status,
            users.gender AS gender,
            users.phone AS phone,
            users.firebase_token AS firebase_token,
            users.created_at AS created_at,
            users.updated_at AS updated_at
        FROM
            hrportal.users
                LEFT JOIN
            roles ON roles.id = users.role
        WHERE
            users.status = 1`,
            (error,results,fields)=>{
                if(error){
                    return callback(error)
                }
                return callback(results)
            }
        )
    },
    updateUserDetailsQuery: (data,callback)=>{

        let document = data.documents
        let documentJoin = document.join(",")
        let userId = data.user_id
        let personalEmail = data.personal_email

        let phone = data.phone
        let gender = data.gender
        let dob = data.date_of_birth
        let dobSplit = dob.split("/")

        let dobFormat = dobSplit[2]+'-'+dobSplit[1]+'-'+dobSplit[0]
        let doj = data.date_of_joining
        let dojSplit = doj.split("/")
        let dojFormat = dojSplit[2]+'-'+dojSplit[1]+'-'+dojSplit[0]
        
        let position = data.position
        let qualification = data.qualification
        let maritialStatus = data.maritial_status

        let bloodGroup = data.blood_group
        let permanentAddress = data.permanent_address
        let currentAddress = data.current_address
        let profileImage = data.profile_imag

        pool.query(
            `select * from user_details where  user_id = '${userId}'`,
            (error,results,fields)=>{
                if(results[0]){
                    pool.query(
                        `update user_details set personal_email= '${personalEmail}',phone='${phone}',gender= '${gender}',date_of_birth='${dobFormat}',position='${position}',qualification='${qualification}',maritial_status='${maritialStatus}',date_of_joining='${dojFormat}',blood_group='${bloodGroup}',permanent_address='${permanentAddress}',current_address='${currentAddress}',profile_image='${profileImage}',document='${document}' where user_id = '${userId}'`,
                        (error,results,fields)=>{
                            if(error){
                                return callback(error)
                            }
                            return callback(error,results)
                        }
                    )
                    //update user details
                }else{
                    pool.query(
                        `insert into user_details(user_id,personal_email,phone,gender,date_of_birth,position,qualification,maritial_status,date_of_joining,blood_group,permanent_address,current_address,profile_image,document,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                        [
                            userId,
                            personalEmail,
                            phone,
                            gender,
                            dob,
                            position,
                            qualification,
                            maritialStatus,
                            doj,
                            bloodGroup,
                            permanentAddress,
                            currentAddress,
                            profileImage,
                            documentJoin,             
                            1,             
                        ],
                        (error, results, fields) => {
                            if(error){
                                return callback(error);
                            }
                            return callback(null, results);
                        }
                    )
                }
            }
        )
    },

    userIdExitQuery: (userId, callback)=>{
        pool.query(
            `select * from users where id = '${userId}'`,
            (error,results,fields)=>{
                if(error){
                    return callback(error)
                }
                return callback(results[0])
            }
        )
    },
    userUpdateStatusQuery: (data,userId,callback)=>{
        let ticketNumber = data.ticket_number
        let ticketNumberJoin = ticketNumber.join(",")
        pool.query(
            `insert into users_update_status(user_id,project_name,working_hours,description,ticket_number) values(?,?,?,?,?)`,
            [
                userId,
                data.project_name,
                data.working_hours,
                data.description,
                ticketNumberJoin
            ],
            (error,results,fields)=>{
                if(error){
                    return callback(error)
                }
                return callback(error,results)
            }
        )
    },
    userIdExist: (userId)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                `select * from users where id = '${userId}'`,
                (error,results)=>{
                    if(error){
                        return reject(error)
                    }
                    return resolver(results[0])
                }
            )
        })
    },

    AttendencePerUser: (userId, filterData)=>{
        return new Promise((resolver,reject)=>{
            pool.query(
                // `select * from checkin_checkout where user_id = '${userId}'` ,
                `SELECT 
                    DATE(cc.timestamp) dd1, nt.checkin, ncheckout.checkout
                FROM
                    hrportal.checkin_checkout cc
                        INNER JOIN
                    (SELECT 
                        GROUP_CONCAT(timestamp) AS checkin, DATE(timestamp) nd
                    FROM
                        hrportal.checkin_checkout
                    WHERE
                        status = 1 AND user_id = 8
                    GROUP BY DATE(timestamp)) nt ON nt.nd = DATE(cc.timestamp)
                    INNER JOIN
                    (SELECT 
                        GROUP_CONCAT(timestamp) AS checkout, DATE(timestamp) nc
                    FROM
                        hrportal.checkin_checkout
                    WHERE
                        status = 2 AND user_id = 8
                    GROUP BY DATE(timestamp)) ncheckout ON ncheckout.nc = DATE(cc.timestamp)
                WHERE
                    cc.user_id = 8
                GROUP BY DATE(cc.timestamp)`,

                (error,results)=>{
                    // collect(error).dd()
                    if(error){
                        return reject(error)
                    }
                    return resolver(results)
                }
            )
        })
    }
};
// https://onlinephp.io/c/2fa6a


/**
 * [
    {
        "session_data": [
            {
                "checkintime": "2022-05-23 23:00:00",
                "checkoutTime": "2022-05-23 23:00:00",
                "session_hours": 4
            },
            {
                "checkintime": "2022-05-23 23:00:00",
                "checkoutTime": "2022-05-23 23:00:00",
                "session_hours": 5
            }
        ],
        "date": "2022-05-23",
        "total_hours": 9
    },
    {
        "session_data": [
            {
                "checkintime": "2022-05-23 23:00:00",
                "checkoutTime": "2022-05-23 23:00:00",
                "session_hours": 4
            },
            {
                "checkintime": "2022-05-23 23:00:00",
                "checkoutTime": "2022-05-23 23:00:00",
                "session_hours": 4
            }
        ],
        "date": "2022-05-23",
        "total_hours": 8
    }
]
 */