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
            let imageUrl = `${host}/public/document/${req.file.filename}`
            let userId = req.userData.userId;
            let checkIdExist = await leaveService.getLeaveType(req.body.leave_type_id)
            if(checkIdExist){
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
                let message = "leave type name does not exist";
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
    }
}