const { json } = require("express/lib/response");
require('dotenv').config();
const {create, userLogin,emailExist,checkIn}= require("../../services/user.service");
const config = require('../../../config/config');
const pool = require("../../../config/database");
const collect = require('collect.js');
const { NULL } = require("mysql/lib/protocol/constants/types");
const errorResponse = require("../../services/errorResponse.service");
const successResponse = require("../../services/successResponse.service");
const jwt = require('jsonwebtoken');
// const acl = require('express-acl');
// let collection = collect(acl);
// collection.dd();


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
                message:"checkin successfully",
                checkInTime: results
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
                message:"checkout successfully",
                checkoutTime: results,
                totalTime: "6:30:00"
            });
        })
    },
  
};
