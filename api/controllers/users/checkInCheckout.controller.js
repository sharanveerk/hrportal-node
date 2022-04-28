const { json } = require("express/lib/response");
require('dotenv').config();
const {create, userLogin,emailExist,checkIn}= require("../../services/users/user.service");
const config = require('../../../config/config');
const pool = require("../../../config/database");
const collect = require('collect.js');
const { NULL } = require("mysql/lib/protocol/constants/types");
const errorResponse = require("../../services/errorResponse.service");
const successResponse = require("../../services/successResponse.service");
const jwt = require('jsonwebtoken');

module.exports = {
    
    userCheckIn: (req,res) =>{
        const id = req.userData.userId;
        // 1 is a check in status value 
        checkIn(id, 1,(err,results) => {
          
            if(err){
                const message = "Something went wrong!";
                return errorResponse(res,500,false,message);
               
            }
            return res.status(201).json({
                statusCode:201,
                success:true,
                message:"checkin successfully"
            });
        })
    },
    userCheckOut: (req,res) =>{
        const id = req.userData.userId;
        // 2 is a check out status value 
        checkIn(id, 2,(err,results) => {
          
            if(err){
                const message = "Something went wrong!";
                return errorResponse(res,500,false,message);
               
            }
            return res.status(201).json({
                statusCode:201,
                success:true,
                message:"checkout successfully"
            });
        })
    },
  
};



// (req, res, next) => {
//     // let collection = collect('errorResponse');
//     // collection.dd();
//     // return checkIncheckoutController(req,res,req.userData)
//     return res.status(200).send({
//         statusCode:200,
//         success:true,
//         message: "Authorized!",
//         data:req.userData
//     });
//   }