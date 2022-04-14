const { json } = require("express/lib/response");
require('dotenv').config();
const {create, getUserByid, userLogin}= require("../../services/users/user.service");
const config = require('../../../config/config');
const collect = require('collect.js');
// const bcrypt = require('bcrypt');
const { NULL } = require("mysql/lib/protocol/constants/types");
// const errorResponse = require("../../services/errorResponse.service");
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
                //   return  errorResponse.error;
                    return res.status(500).json({
                        statusCode:500,
                        success:false,
                        message:"Something went wrong"
                    });
                }
                response = {};
                response.name = body.name;
                response.gender = body.gender;
                response.email = body.email;
                response.number = body.number;
                response.token = token;

                return res.status(201).json({
                    statusCode:201,
                    success:true,
                    message:"success",
                    data:response
                });
            });
        }else{
            return res.status(500).json({
                statusCode:500,
                success:false,
                message:"Something went wrong"
            });
        //    message = "Something went wrong";
        //    return errorResponse.error(res,500,false,message);
        }
    },
    getUserById: (req,res) =>{
        const id = req.params.id;
        getUserByid(id, (err,results) => {
        
            if(err){
                return res.status(500).json({
                    statusCode:500,
                    success:false,
                    message:"something wnet wrong!"
                });
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
                    return res.status(500).json({
                        statusCode:500,
                        success:false,
                        message:"Email does not exist!, Plese enter correct email"
                    });
                }
                if(results.length>0){

                    return res.status(200).json({
                        statusCode:200,
                        success:true,
                        message:"success",
                        data:results,
                    });
                }else{
                    return res.status(500).json({
                        statusCode: 500,
                        success:false,
                        message:"something wnet wrong!"
                    });
                }
            });
        }else{
            return res.status(401).json({
                ststusCode:401,
                success: false,
                message:"Please enter valid email"
            });
        }
    }
};