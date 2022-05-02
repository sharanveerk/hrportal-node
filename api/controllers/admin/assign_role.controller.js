const { json } = require("express/lib/response");
require('dotenv').config();
const config = require('../../../config/config');
const pool = require("../../../config/database");
const collect = require('collect.js');
const { NULL } = require("mysql/lib/protocol/constants/types");
const errorResponse = require("../../services/errorResponse.service");
const successResponse = require("../../services/successResponse.service");
const {getUserQuery,assignRoleQuery} = require("../../services/admin.service");
const jwt = require('jsonwebtoken');

// const acl = require('express-acl');
// let collection = collect(acl);
// collection.dd();


module.exports = {
    
    fetchAllUser: (req,res) =>{
      
        getUserQuery((err,results) => {
            if(err){
                const message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }else{
                var array = [];
                results.forEach(function(item) {
                    array.push({id:item.id,name:item.name,email:item.email});
                });
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"Fetch users data successfully",
                    data:array
                });
            }
        })
    },
    assignRole: (req,res) =>{
        const body = req.body;
        // const id = req.userData.userId;
        
        assignRoleQuery(body, (results,err) => {
           
            if(err){
                const message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
            return res.status(201).json({
                statusCode:201,
                success:true,
                message:"Role has been assigned successfully."
            });
        })
    },
};
