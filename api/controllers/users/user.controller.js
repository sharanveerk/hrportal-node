const { json } = require("express/lib/response");
require('dotenv').config();
const userService = require("../../services/users/user.service");
// const {create,userLogin,emailExist,userListQuery,updateUserDetailsQuery,userIdExitQuery,userUpdateStatusQuery}= require("../../services/users/user.service");
const config = require('../../../config/config');
const pool = require("../../../config/database");
const collect = require('collect.js');
const { NULL } = require("mysql/lib/protocol/constants/types");
const errorResponse = require("../../services/errorResponse.service");
const successResponse = require("../../services/successResponse.service");
const rbacServices = require("../../services/rbac.service")
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
            if(body.name !== "" && body.firebase_token !== ""){

                pool.query( `select * from users where email = '${req.body.email}' and name = '${req.body.name}'`,
                    // [req.body.email,req.body.name],
                    (error, results, fields) => {
                        if(results[0]){
                            email = results[0].email;
    
                            var roleId = 3;
                            var configSuperAdminEmail1 = config.super_admin_email1;       //"sharanveerk@bootesnull.com";
                            var configSuperAdminEmail2 = config.super_admin_email2;      //"sharan@bootesnull.com";
                            if(configSuperAdminEmail1 == results[0].email || configSuperAdminEmail2 == results[0].email){
                                var roleId  = 1;
                            }
                            const token = jwt.sign({
                                email: email,
                                userId: results[0].id,
                                role: roleId,
                              },
                              'SECRETKEY', {
                                expiresIn: '7d'
                              }
                            );
                            let id = results[0].id;
                            userService.emailExist(token, id,(err,result) => {
                                
                                response = {};
                                response.name = results[0].name;
                                response.email = results[0].email;
                                response.token = token;
                                const message = "Employee created successfully";
                                return successResponse(res,201,true,message,response);
                            });
                
                        }else{
                            userService.create(body,(err,results,token)=>{
                
                                if(err){ 
                              
                                    const message = "Something went wrong!";
                                    return errorResponse(res,500,false,message);
                                }
                                response = {};
                                response.name = body.name;
                                response.email = body.email;
                                response.token = token;
                                const message = "Employee created successfully";
                                return successResponse(res,201,true,message,response);
                               
                            });
                        }
                    }
                );
            }else{
                const message = "fields can not empty!";
                return errorResponse(res,401,false,message);
            }
        }else{
           const message = "Email id is not valid";
           return errorResponse(res,401,false,message);
           
        }
    },
    getUserById: (req,res) =>{
        const id = req.params.id;
        userService.getUserByid(id, (err,results) => {
        
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

            userService.userLogin(email,(err, results) => {
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
    },

    /**
     * @params {req} req
     * @params {res} req
     * @return users details
     * @callback userListQuery
     * @author sharanveer kannaujiya
     */
    userList: (req,res)=>{

        userService.userListQuery( (results,error) => {
        
            if(error){
                const message = "Something went wrong!";
                return errorResponse(res,500,false,message);
               
            }
            return res.status(200).json({
                statusCode:200,
                success:true,
                message:"success",
                data:results
            });
        });
    },

    /**
     * @params {req} req
     * @params {res} res
     * @return success message when users details updated successfully 
     * I have use three conditions first is check user id is availble in user table or not, second is check user id is available already in user details tablle when available then update other wise insert record 
     * @callback updateUserDetailsQuery
     * @author sharanveer kannaujiya
     */

     editUserDetails: (req,res)=>{
         const data = req.body
         const userId = req.body.user_id
         
         //check user id exist or not 
         userService.userIdExitQuery(userId,(results,err)=>{
             if(results){
                 //update user details if user id does not exist in user details table then insert the recors otherwise update the the records
                 userService.updateUserDetailsQuery(data,(err,results)=>{
                     if(err){
                        const message = "Something went wrong!"
                        return errorResponse(res,500,false,message)
                     }
                     return res.status(201).json({
                        statusCode:201,
                        success:true,
                        message:"User details have been created successfully."
                    })
                 })
             }else{
                const message = "User id does not exist!"
                return errorResponse(res,500,false,message)
             }
         })
     },
     userUpdateStatus: (req,res)=>{
         const body = req.body
         const userId = req.userData.userId;
         if(userId !== "" && body.project_name !== "" && body.working_hours !== "" && body.description !== ""){

            userService.userUpdateStatusQuery(body,userId,(err,results)=>{
    
                 if(err){
                    const message = "Something went wrong!"
                    return errorResponse(res,500,false,message)
                 }
                 return res.status(201).json({
                    statusCode:201,
                    success:true,
                    message:"Status has been updated successfully."
                })
             })
         }else{
            const message = "Something went wrong!"
            return errorResponse(res,500,false,message)
         }
     },
    //  const userId = req.userData.userId;

    checkPermissionTest: async(req,res)=>{
        try {
            let data = req.query.permission
            let userId = req.userData.userId;
            let response = await rbacServices.checkPermissionService(userId,data)
            
            if(response){
                return res.status(201).json({
                    statusCode:201,
                    success:true,
                    message: "Permission grented.",
                });   
            }else{
                const message = "Not  authorized!";
                return errorResponse(res,500,false,message);
            }
           
        
        } catch (error) {
            const message = "Not authorized";
            return errorResponse(res,500,false,message);
        }
    }

};
