const { json } = require("express/lib/response");
require('dotenv').config();
const {create, getUserByid, userLogin}= require("../../services/users/user.service");
const config = require('../../../config/config');
const collect = require('collect.js');
// const bcrypt = require('bcrypt');
const { NULL } = require("mysql/lib/protocol/constants/types");
const errorResponse = require("../../services/errorResponse.service");
const successResponse = require("../../services/successResponse.service");

const domain = process.env.OFFICE_DOMAIN;

// let collection = collect(errorResponse);
// collection.dd();

module.exports = {
    createUser: (req,res)=>{
        const body = req.body;
        const validateEmail = req.body.email.split('@');
        
        if(validateEmail[1] == domain){
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
                return successResponse(res,201,false,message,response);
                // return res.status(201).json({
                //     statusCode:201,
                //     success:true,
                //     message:"success",
                //     data:response
                // });
            });
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
                    // return res.status(500).json({
                    //     statusCode:500,
                    //     success:false,
                    //     message:"Email does not exist!, Plese enter correct email"
                    // });
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
                    // return res.status(500).json({
                    //     statusCode: 500,
                    //     success:false,
                    //     message:"something wnet wrong!"
                    // });
                }
            });
        }else{
            const message = "Please enter valid email";
            return errorResponse(res,401,false,message);
            // return res.status(401).json({
            //     ststusCode:401,
            //     success: false,
            //     message:"Please enter valid email"
            // });
        }
    }
};