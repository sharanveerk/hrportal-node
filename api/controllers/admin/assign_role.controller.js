const { json } = require("express/lib/response");
require('dotenv').config();
const config = require('../../../config/config');
const pool = require("../../../config/database");
const collect = require('collect.js');
const { NULL } = require("mysql/lib/protocol/constants/types");
const errorResponse = require("../../services/errorResponse.service");
const successResponse = require("../../services/successResponse.service");
const {getUserQuery,assignRoleQuery,updateRoleQuery,removeRoleQuery,createRoleQuery,getAllRoleQuery,queryUpdateRole,deleteRoleQuery,storePermissionQuery,getPermissionByIdQuery,listPermissionQuery,updatePermissionQuery,deletePermissionQuery,createAllowRolePermissionQuery,listAllowRolePermissionQuery,updateAllowRolePermissionQuery,viewAllowRolePermissionQuery,deleteAllowRolePermissionQuery} = require("../../services/admin.service");
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
        });
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
        });
    },
    editRole: (req,res) =>{
        const body = req.query;
        updateRoleQuery(body, (results,err)=>{
            if(err){
                const message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
            return res.status(200).json({
                statusCode:200,
                success:true,
                message: "data has been fetched.",
                data:results
            });
        });
    },

    removeRole: (req,res)=>{
        const id = req.query.id;
        removeRoleQuery(id, (results,err)=>{
            if(err){
                const message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
            return res.status(201).json({
                statusCode:201,
                success:true,
                message: "Role has been remove successfully.",
            });
        });
    },
    createRole: (req,res)=>{
        const body = req.body;

        pool.query(
            `select * from roles where name = '${body.name}'`,
            (error, results, fields) => {  
                
                if(results[0]){
                    const message = "Role has been  already created!";
                    return errorResponse(res,500,false,message);
                }else{
                    createRoleQuery(body, (err,results)=>{
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
            }
        );
    },
    getAllRole: (req,res)=>{
        getAllRoleQuery((results,err)=>{
            if(err){
                const message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
            return res.status(200).json({
                statusCode:200,
                success:true,
                message: "Role has been fetched successfully.",
                data: results
            });
        });
    },
    roleEdit: (req,res)=>{
        const body = req.body;
        queryUpdateRole(body, (results,err)=>{
            if(err){
                const message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
            return res.status(201).json({
                statusCode:201,
                success:true,
                message: "Role has been updated successfully.",
            });
        });
    },
    deleteRole: (req,res)=>{
        const id = req.query.id;

        pool.query(
            `select * from roles where id = '${id}'`,
            (error, results, fields) => {  
                
                if(results[0]){
                    deleteRoleQuery(id, (results,err)=>{
                        if(err){
                            const message = "Something went wrong!";
                            return errorResponse(res,500,false,message);
                        }
                        return res.status(201).json({
                            statusCode:201,
                            success:true,
                            message: "Role has been deleted successfully.",
                        });
                    });
                }else{
                    const message = "Role id does not exist!";
                    return errorResponse(res,500,false,message);
                }
            }
        );
    },
    permissionStore: (req, res)=>{
        const body = req.body;
        storePermissionQuery(body, (err,results)=>{
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
    },
    viewPermissionById: (req,res)=>{
        const id = req.query.id;
        getPermissionByIdQuery(id, (results,err)=>{
            if(err){
                const message = "Something went wrong!"
                return errorResponse(res,500,false,message);
            }
            return res.status(200).json({   
                statusCode:200,
                success:true,
                message: "Role has been fetched successfully.",
                data:results
            });
        });
    },
    listPermission: (req,res)=>{
        listPermissionQuery((results,err)=>{
            if(err){
                const message = "Something went wrong!"
                return errorResponse(res,500,false,message);
            }
            return res.status(200).json({   
                statusCode:200,
                success:true,
                message: "Role has been fetched successfully.",
                data:results
            });
        });
    },
    editPermission: (req, res)=>{
        const body = req.body;
        updatePermissionQuery(body, (results,err)=>{
            if(err){
                const message = "Something went wrong!"
                return errorResponse(res,500,false,message);
            }
            return res.status(201).json({   
                statusCode:201,
                success:true,
                message: "Role has been updated successfully.",
            });
        });
    },
    deletePermission: (req,res)=>{
        const id = req.query.id;
        pool.query(
            `select * from permissions where id = '${id}'`,
            (error, results, fields) => {  
                
                if(results[0]){
                    deletePermissionQuery(id, (results,err)=>{
                        if(err){
                            let message = "Something went wrong!"
                            return errorResponse(res,500,false,message);
                        }
                        return res.status(200).json({   
                            statusCode:200,
                            success:true,
                            message: "Role has been deleted successfully.",
                        });
                    });
                }else{
                    let message = "Permission id does not exist!";
                    return errorResponse(res,500,false,message);
                }
            }
        );
       
    },
    storeAllowRolePermission: (req,res)=>{
        const body = req.body;
        createAllowRolePermissionQuery(body, (err,results)=>{

            if(err){
              let message = "Something went wrong!";
              return errorResponse(res,500,false,message);
            }
            return res.status(201).json({
                statusCode:201,
                success:true,
                message: "Allow role permission has been created successfully."
            });
        });
    },
    allowRolePermission: (req,res)=>{
        listAllowRolePermissionQuery((results,err)=>{
            if(err){
                let message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
            return res.status(201).json({
                statusCode:201,
                success:true,
                message: "Allow role permission has been fetched successfully.",
                data: results
            });
        });
    },
    editAllowRolePermission: (req, res)=>{
        const body = req.body;
        updateAllowRolePermissionQuery(body,(results,err)=>{
            if(err){
                let message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
            return res.status(201).json({
                statusCode:201,
                success:true,
                message: "Allow role permission has been updated successfully."
            });
        });
    },
    viewAllowRolePermission: (req,res)=>{
        const id = req.query.id;
        viewAllowRolePermissionQuery(id,(results, err)=>{
            if(err){
                let message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
            return res.status(201).json({
                statusCode:201,
                success:true,
                message: "Allow role permission has been fetched successfully.",
                data: results
            });  
        })
    },
    deleteAllowRolePermission: (req,res)=>{
        const id = req.query.id;
        deleteAllowRolePermissionQuery(id,(results,err)=>{
            if(err){
                let message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
            return res.status(200).json({
                statusCode:200,
                success:true,
                message: "Allow role permission has been delete successfully."
            });  

        })
    }
};
