const { json } = require("express/lib/response");
const pool = require("../../../config/database")
const config = require("../../../config/config")
const jwt = require('jsonwebtoken');
const rbacServices = require("../../services/rbac.service")
const errorResponse = require("../../services/errorResponse.service");
const successResponse = require("../../services/successResponse.service");

const collect = require('collect.js');

module.exports = {
     createRole: (req,res)=>{
        try {
            const body = req.body;
            rbacServices.roleNameExist(body.name,(err,results)=>{
                if(results){
                    const message = "Role has been  already created!";
                    return errorResponse(res,500,false,message);
                }else{
                    rbacServices.createRoleQuery(body, (err,results)=>{
                        if(err){
                            const message = "Something went wrong!";
                            return errorResponse(res,500,false,message);
                        }
                        return res.status(201).json({
                            statusCode:201,
                            success:true,
                            message: "Role has been created successfully.",
                        });
                    });
                }
            })
        } catch (error) {
            const message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },

    getAllRole: async(req,res)=>{
        try {
            const responseData = await rbacServices.getAllRoleQuery()
            if(responseData){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message: "Role has been updated successfully.",
                    data: responseData
                }); 
            }else{
                const message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            const message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
           
    },

    roleEdit: async(req,res)=>{

        try {
            const body = req.body;
            if(body.id!== "" && body.name !== ""){

                const checkUpdateResponse = await rbacServices.queryUpdateRole(body)
                if(checkUpdateResponse){
    
                    return res.status(201).json({
                        statusCode:201,
                        success:true,
                        message: "Role has been updated successfully.",
                    });
                }else{
                    const message = "Something went wrong!";
                    return errorResponse(res,500,false,message);
                }
            }else{
                const message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            const message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        } 
    },
    viewRoleById: async(req,res)=>{
        try {
            let id = req.query.id
            const viewResponse = await rbacServices.viewRole(id)
            if(viewResponse){
                return res.status(201).json({
                    statusCode:201,
                    success:true,
                    message: "Role has been updated successfully.",
                    data: viewResponse
                });  
            }else{
                const message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            const message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    }
}