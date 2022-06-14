const leaveService = require("../../services/leave.service")
const errorResponse = require("../../services/errorResponse.service")
const express = require('express')
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/documents' })
const collect = require('collect.js');

module.exports = {

    storeLeave: async(req,res)=>{
        try {

            let body = req.body
            var host = req.get('host');
            
            let userId = req.userData.userId
            let checkIdExist = await leaveService.getLeaveType(req.body.leave_type_id)
            var imageUrl = null;
            if(checkIdExist){
                if(req.file){
                     imageUrl = `${host}/documents/${req.file.filename}`
                    let imageAcceptedType = req.file.mimetype
                    if(imageAcceptedType){
                        if(imageAcceptedType == "image/png" || imageAcceptedType == "image/jpeg" || imageAcceptedType == "image/jpg" ){
                       
                            if(body.from_date !== "" && body.to_date !== "" ){
                                let storeResponse = await leaveService.createLeave(body, imageUrl,userId)                    
                                if(storeResponse){
                                    return res.status(201).json({
                                        statusCode:201,
                                        success:true,
                                        message:"leave has been saved successfully.",
                                    });
                                }
                            }else{
                                let message = "from date and to date field do not empty!";
                                return errorResponse(res,500,false,message);
                            }
                        }else{
                            let message = "Only .png, .jpg and .jpeg format allowed!";
                            return errorResponse(res,500,false,message);
                        }
                    }
                }else{

                    if(body.from_date !== "" && body.to_date !== "" ){
                        let storeResponse = await leaveService.createLeave(body, imageUrl,userId)                    
                        if(storeResponse){
                            return res.status(201).json({
                                statusCode:201,
                                success:true,
                                message:"leave has been saved successfully.",
                            });
                        }
                    }else{
                        let message = "from date and to date field do not empty!";
                        return errorResponse(res,500,false,message);
                    }
                }
            }else{
                let message = "leave type name does not exist!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    viewLeave : async(req,res)=>{

        try {
            let id = req.query.id
            let viewResponse = await leaveService.getByLeaveId(id)
            if(viewResponse){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"leave data has been fetched successfully.",
                    data: viewResponse
                });
            }else{
                let message = "Id does not exist!";
                return errorResponse(res,500,false,message); 
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message); 
        }
    },

    listLeave : async(req,res)=>{
        try {
            let listResponse = await leaveService.getLeaves()
            if(listResponse){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"leave data has been fetched successfully.",
                    data: listResponse
                });
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message); 
        }
    },
    editLeave: async(req,res)=>{
        try {
            let body = req.body
            let userId = req.userData.userId
            let checkIdExist = await leaveService.getLeaveType(req.body.leave_type_id)
            if(checkIdExist){
                if(body.from_date !== "" && body.to_date !== "" ){

                    if(req.file){
                        var host = req.get('host');
                        imageUrl = (req.file.filename !== "") ? `${host}/documents/${req.file.filename}` : "null"
                        let storeResponse = await leaveService.updateLeave(body,userId,imageUrl)
                        if(storeResponse){
                            return res.status(201).json({
                                statusCode:201,
                                success:true,
                                message:"leave has been updated successfully.",
                            });
                        }
                    }else{
                        let storeResponse = await leaveService.updateLeave(body,userId)
                        if(storeResponse){
                            return res.status(201).json({
                                statusCode:201,
                                success:true,
                                message:"leave has been updated successfully.",
                            });
                        }
                    }
                   
                }else{
                    let message = "from date and to date field do not empty!";
                    return errorResponse(res,500,false,message);
                }
            }else{
                let message = "leave type name does not exist!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }

    },
    statusChangedLeave: async(req,res)=>{
        try {
            let checkIdexist = await leaveService.getByLeaveId(req.query.id);
            if(checkIdexist){
                let statusChangeResponse = await leaveService.statusUdateLeaves(req.query.id,req.query.value)
                if(statusChangeResponse){
                    return res.status(200).json({
                        statusCode:200,
                        success:true,
                        message:"leave status has been changed successfully.",
                    });
                }
            }else{
                let message = "Id does not exist!";
                return errorResponse(res,500,false,message); 
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message); 
        }
    },
    approveLeave: async(req,res)=>{
        try {
            let query = req.query;
            let checkIdexist = await leaveService.getByLeaveId(query.id);
            if(checkIdexist){
                let userId = req.userData.userId
                let approveResponse = await leaveService.approveByApproverLeaves(query, userId)
                if(approveResponse){
                    return res.status(200).json({
                        statusCode:200,
                        success:true,
                        message:"leave has been approved successfully.",
                    });
                }
            }else{
                let message = "Id does not exist!";
                return errorResponse(res,500,false,message); 
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message); 
        }
    },
    testUploadImage : async(req,res)=>{
        try {
            let body = req.file
            let debug = collect(req.file, req.body)
            debug.dd()
            if(body.id){
                let statusUpdateResponse = await leaveService.statusUpdateLeaveType(body)
                if(statusUpdateResponse !== null){
                    return res.status(200).json({
                        statusCode:200,
                        success:true,
                        message:"leave type status has been changed successfully.",
                    });
                }else{
                    let message = "Id does not exist!";
                    return errorResponse(res,500,false,message); 
                }
            }else{
                let message = "Id does not exist!";
                return errorResponse(res,500,false,message); 
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message); 
        }
    },
    userByLeave: async(req,res)=>{

        try {
            let userId = req.userData.userId
            let userLeaveResponse = await leaveService.geUserByLeaves(userId)
            if(userLeaveResponse){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"user leave has been fetched successfully.",
                    data: userLeaveResponse
                });
            }else{
                let message = "Id does not exist!";
                return errorResponse(res,500,false,message); 
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message); 
        }
    },

    deleteLeave: async(req,res)=>{
        try {
            let id = req.query.id
            let userId = req.userData.userId
            let checkIdExist = await leaveService.getByLeaveId(id)
            if(checkIdExist.user_id == userId){
                if(checkIdExist.leave_status == "pending"){
                    let deleteResponse = await leaveService.leaveDelete(id,userId)
                    if(deleteResponse){
                        return res.status(200).json({
                            statusCode:200,
                            success:true,
                            message:"leave has been deleted successfully.",
                        });
                    }
                }else{
                    let message = "You can`t delete the leave after rejected or approved!";
                    return errorResponse(res,500,false,message); 
                }
            }else{
                let message = "Id does not exist!";
                return errorResponse(res,500,false,message); 
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message); 
        }
    }


}