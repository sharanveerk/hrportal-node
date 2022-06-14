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