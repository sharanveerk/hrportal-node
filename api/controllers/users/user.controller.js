const { json } = require("express/lib/response");
require('dotenv').config();
const {create, getUserByid, userLogin,emailExist}= require("../../services/users/user.service");
const config = require('../../../config/config');
const pool = require("../../../config/database");
const collect = require('collect.js');
const { NULL } = require("mysql/lib/protocol/constants/types");
const errorResponse = require("../../services/errorResponse.service");
const successResponse = require("../../services/successResponse.service");
const jwt = require('jsonwebtoken');
const dateTime = require('node-datetime');
const dt = dateTime.create();
const created = dt.format('Y-m-d H:M:S')

const domain = process.env.OFFICE_DOMAIN;

// let collection = collect(errorResponse);
// collection.dd();

module.exports = {
    createUser: (req,res)=>{
        const body = req.body;
        const validateEmail = req.body.email.split('@');
        
        if(validateEmail[1] == domain){
               
                pool.query( `select * from users where email = ?`,
                    [req.body.email],
                    (error, results, fields) => {
                        if(results[0]){
                            email = results[0].email;
                           
                            const token = jwt.sign({
                                email: email,
                                userId: results[0].id
                              },
                              'SECRETKEY', {
                                expiresIn: '7d'
                              }
                            );
                           let id = results[0].id;
                            emailExist(token, id,(err,result) => {
                                
                                
                                response = {};
                                response.name = results[0].name;
                                response.gender = results[0].gender;
                                response.email = results[0].email;
                                response.number = results[0].phone;
                                response.token = token;
                                const message = "Employee created successfully";
                                return successResponse(res,201,true,message,response);
                                
                            });
                
                        }else{
                            create(body,(err,results,token)=>{
                
                                if(err){ 
                              
                                    const message = "Something went wrong!";
                                    return errorResponse(res,500,false,message);
                                }
                                response = {};
                                response.name = body.name;
                                response.gender = body.gender;
                                response.email = body.email;
                                response.number = body.number;
                                response.token = token;
                                const message = "Employee created successfully";
                                return successResponse(res,201,true,message,response);
                               
                            });
                        }
                    }
                );
        }else{
            
           const message = "Mail id is not valid";
           return errorResponse(res,401,false,message);
           
        }
    },
    getUserById: (req,res) =>{
        const id = req.params.id;
        getUserByid(id, (err,results) => {
        
            if(err){
                const message = "Something went wrong!";
                return errorResponse(res,500,false,message);
               
            }
            return res.status(200).json({
                statusCode:200,
                success:true,
                message:"success",
                data:results
            });
        })
    },
    userLogin: (req,res) =>{
        const email = req.query;
        const validateEmail = email.email.split('@');
        if(validateEmail[1] == domain){

            userLogin(email,(err, results) => {
                if(err){
                    const message = "Email does not exist!, Plese enter correct email";
                    return errorResponse(res,500,false,message);
                }
                if(results.length>0){

                    return res.status(200).json({
                        statusCode:200,
                        success:true,
                        message:"success",
                        data:results,
                    });
                }else{
                    const message = "Something went wrong!";
                    return errorResponse(res,500,false,message);
                }
            });
        }else{
            const message = "Please enter valid email";
            return errorResponse(res,401,false,message);
        }
    }
};
