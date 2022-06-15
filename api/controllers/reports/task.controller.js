const reportService = require("../../services/report.service")
const errorResponse = require("../../services/errorResponse.service")
const express = require('express')
const collect = require('collect.js');

module.exports = {

    storeTask: async(req,res)=>{
        try {
            let body = req.body
            const id = req.userData.userId;
            if(body.title == null && body.user_id == null){
                let message = "all field is required!";
                return errorResponse(res,500,false,message);
            }else{
                let storeResponse = await reportService.createTesk(body,id)
                if(storeResponse){
                    return res.status(201).json({
                        statusCode:201,
                        success:true,
                        message:"task has been saved successfully.",
                    });
                }
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },

    viewTask: async(req,res)=>{
        try {
            let id = req.query.id

            const userId = req.userData.userId;
            if(id){
                let viewResponse = await reportService.viewTaskById(id,userId)
                if(viewResponse){
                    return res.status(200).json({
                        statusCode:200,
                        success:true,
                        message:"task has been fetched successfully.",
                        data: viewResponse
                    });
                }
            }else{
                let message = "id field is required!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    listTask: async(req,res)=>{
        try {
            const userId = req.userData.userId;
            let listResponse = await reportService.getTaskList(userId)
            if(listResponse){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"task has been fetched successfully.",
                    data: listResponse
                });
            }
            
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    
    editTask: async(req,res)=>{

        try {
            let body = req.body
            const userId = req.userData.userId;
            if(body.title == null && body.user_id == null){
                let message = "all field is required!";
                return errorResponse(res,500,false,message);
            }else{
                let checkId = await reportService.viewTaskById(body.id,userId)
                if(checkId){
                    let storeResponse = await reportService.updateTesk(body,userId)
                    if(storeResponse){
                        return res.status(201).json({
                            statusCode:201,
                            success:true,
                            message:"task has been updated successfully.",
                        });
                    }
                }else{
                    let message = "Incorrect id!";
                    return errorResponse(res,500,false,message);
                }
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    deleteTask: async(req,res)=>{
        try {
            let id = req.query.id
            let checkId = await reportService.viewTaskById(id)
            if(checkId){
                let deleteResponse = await reportService.delteTaskById(id)
                if(deleteResponse){
                    return res.status(200).json({
                        statusCode:200,
                        success:true,
                        message:"task has been deleted successfully.",
                    });
                }

            }else{
                let message = "Incorrect id!";
                return errorResponse(res,500,false,message);
            }
          
            
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },

    getUserTask: async(req,res)=>{
        try {     
            const id = req.userData.userId;
            let listResponse = await reportService.getUserTaskList(id)
            if(listResponse){
                return res.status(201).json({
                    statusCode:200,
                    success:true,
                    message:"task has been fetched successfully.",
                    data: listResponse
                });
            }else{
                let message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    storeUserTask: async(req,res)=>{
        try {
            let body = req.body
            const id = req.userData.userId;
            if(body.task == null && body.description == null && body.working_hours){
                let message = "all field is required!";
                return errorResponse(res,500,false,message);
            }else{
                var imageUrl=null
                if(req.file){
                    var host = req.get('host');
                    imageUrl = `${host}/report/${req.file.filename}`
                   let imageAcceptedType = req.file.mimetype
                   if(imageAcceptedType){
                       if(imageAcceptedType == "image/png" || imageAcceptedType == "image/jpeg" || imageAcceptedType == "image/jpg" ){
                      
                            let storeResponse = await reportService.createUserTesk(body,id,imageUrl)
                            if(storeResponse){
                                return res.status(201).json({
                                    statusCode:201,
                                    success:true,
                                    message:"task has been saved successfully.",
                                });
                            }
                       }else{
                           let message = "Only .png, .jpg and .jpeg format allowed!";
                           return errorResponse(res,500,false,message);
                       }
                   }
               }else{   
                   let storeResponse = await reportService.createUserTesk(body,id,imageUrl)
                   if(storeResponse){
                       return res.status(201).json({
                           statusCode:201,
                           success:true,
                           message:"task has been saved successfully.",
                       });
                   }
               }
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },

    getUserReportList: async(req,res)=>{
        try {     
            const id = req.userData.userId;
            let listResponse = await reportService.getUserReport(id)
            if(listResponse){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"task has been fetched successfully.",
                    data: listResponse
                });
            }else{
                let message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },

}