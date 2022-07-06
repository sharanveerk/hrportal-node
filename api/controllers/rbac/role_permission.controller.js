const { json } = require("express/lib/response")
const pool = require("../../../config/database")
const config = require("../../../config/config")
const rbacServices = require("../../services/rbac.service")
const errorResponse = require("../../services/errorResponse.service")
const successResponse = require("../../services/successResponse.service")

const collect = require('collect.js');

module.exports = {

    storeRolePermission: async(req,res)=>{
        try {
            let body = req.body
            if(body.role_id !== 0 && body.permission_id !== 0){
                const saveResponse = await rbacServices.storeRolePermissionService(body)
                if(saveResponse){
                   
                    return res.status(201).json({
                        statusCode:201,
                        success:true,
                        message: "Role Permission has been saved successfully.",
                    });   
                }else{
                    const message = "Something went wrong!";
                    return errorResponse(res,500,false,message);
                    
                }
            }else{
                const message = "role and permission name does not empty!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            const message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    ListRolePermission: async(req,res)=>{

        try {
            const dataResponse = await rbacServices.ListRolePermissionService()
            if(dataResponse){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message: "Role Permission has been fetched successfully.",
                    data: dataResponse
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
    viewRolePermission: async(req,res)=>{
        try {
            let id = req.query.id
            if(id !== 0){
                const viewResponse = await rbacServices.viewRolePermissionService(id)
                if(viewResponse){
                    return res.status(200).json({
                        statusCode:200,
                        success:true,
                        message: "Role Permission has been fetched successfully.",
                        data: viewResponse[0]
                    });  
                }else{
                    const message = "Something went wrong!";
                    return errorResponse(res,500,false,message);
                }
            }else{
                const message = "Id does not empty!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            const message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    editRolePermission: async(req,res)=>{
        try {
            let body = req.body
            if(body.id !== 0 && body.role_id !== 0 && body.permission_id !== 0){
                const editResponse = await rbacServices.editRolePermissionService(body)
                if(editResponse){
                    return res.status(201).json({
                        statusCode:201,
                        success:true,
                        message: "Role Permission has been updated successfully.",
                    });  
                }else{
                    const message = "Something went wrong!";
                    return errorResponse(res,500,false,message);
                }
            }else{
                const message = "Id, role and permission name does not empty!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            const message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    updateStatusRolePermission: async(req,res)=>{

        try {
            let body = req.body
            if(body.id !== "" && body.value !== ""){
                const changeResponse = await rbacServices.changeStatusRolePermissionService(body)
                if(changeResponse){
                    return res.status(201).json({
                        statusCode:201,
                        success:true,
                        message: "Role Permission status has been changed successfully.",
                    });  
                }else{
                    const message = "Something went wrong!";
                    return errorResponse(res,500,false,message);
                }
            }else{
                const message = "Id and value does not empty";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            const message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    }
}