const leaveService = require("../../services/leave.service")
const errorResponse = require("../../services/errorResponse.service")
const collect = require('collect.js');


module.exports = {

    storeLeaveType: async(req,res)=>{
        try {
            let body = req.body
            if(body.leave_type_name !== "" && body.is_paid !== ""){
                let storeResponse = await leaveService.createLeaveType(body)
               
                if(storeResponse){
                    return res.status(201).json({
                        statusCode:201,
                        success:true,
                        message:"leave type has been saved successfully.",
                    });
                }
            }else{
                let message = "leave type name and is paid field does not empty!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    viewLeaveType : async(req,res)=>{
        try {
            let id = req.query.id
            if(id !== null){
                let viewLeaveTypeResponse = await leaveService.getLeaveType(id)
               
                if(viewLeaveTypeResponse){
                    return res.status(200).json({
                        statusCode:200,
                        success:true,
                        message:"leave type has been fetched successfully.",
                        data: viewLeaveTypeResponse
                    });
                }else{
                    let message = "Id does not exist!";
                    return errorResponse(res,500,false,message); 
                }
            }else{
                let message = "Id does not empty!";
                return errorResponse(res,500,false,message); 
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message); 
        }
    },
    editLeaveType: async(req,res)=>{
        try {
            let body = req.body
            if(body.leave_type_name !== "" && body.is_paid !== ""){
                let checkIdExist = await leaveService.getLeaveType(body.id)
                if(checkIdExist){
                    let editLeaveTypeResponse = await leaveService.updateLeaveType(body)
                    if(editLeaveTypeResponse){
                        return res.status(201).json({
                            statusCode:201,
                            success:true,
                            message:"leave type has been updated successfully.",
                        });
                    }else{
                        let message = "Something went wrong!";
                        return errorResponse(res,500,false,message); 
                    }
                }else{
                    let message = "Something went wrong!";
                    return errorResponse(res,500,false,message); 
                }
            }

        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message); 
        }
    },
    listLeaveType : async(req,res)=>{
    try {
            let viewLeaveTypeResponse = await leaveService.getLeaveType()
            if(viewLeaveTypeResponse){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"leave type has been fetched successfully.",
                    data: viewLeaveTypeResponse
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
    statusChangeLeaveType : async(req,res)=>{
        try {
                let body = req.body
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