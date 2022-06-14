const eventService = require("../../services/event.service")
const errorResponse = require("../../services/errorResponse.service")
const express = require('express')
const collect = require('collect.js');

module.exports = {

    storeEventType: async(req,res)=>{
        try {
            let body = req.body
            if(body.name){
                let checkExist = await eventService.checkEvent(body)
                if(checkExist){
                    let message = "event type is already exist!";
                    return errorResponse(res,500,false,message);
                }else{
                    let storeResponse = await eventService.createEventType(body)
                    if(storeResponse){
                        return res.status(201).json({
                            statusCode:201,
                            success:true,
                            message:"event type has been saved successfully.",
                        });
                    }
                }
            }else{
                let message = "event type name field does not empty!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },

    viewById: async(req,res)=>{
        try {
            let id = req.query.id
            if(id){
                let checkId = await eventService.getLeaveTypeById(id)
                if(checkId){
                    return res.status(200).json({
                        statusCode:200,
                        success:true,
                        message:"event type has been fetched successfully.",
                        data:checkId
                    });
                }else{  
                    let message = "Somethiing went wrong!";
                    return errorResponse(res,500,false,message);
                }
            }else{
                let message = "event type id does not empty!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    eventTypeList: async(req,res)=>{
        try {
            let response = await eventService.getLeaveTypeList()
            if(response){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"event type has been fetched successfully.",
                    data:response
                });
            }else{  
                let message = "Somethiing went wrong!";
                return errorResponse(res,500,false,message);
            }
           
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    editTypeList: async(req,res)=>{
        
        try {
            let body = req.body
            if(body.name){
                let checkExist = await eventService.getLeaveTypeById(body.id)
                if(checkExist){
                    let storeResponse = await eventService.updateEventType(body)
                    if(storeResponse){
                        return res.status(201).json({
                            statusCode:201,
                            success:true,
                            message:"event type has been updated successfully.",
                        });
                    }
                }else{
                    let message = "event type id does not exist!";
                    return errorResponse(res,500,false,message);
                }
            }else{
                let message = "event type name does not empty!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    activeDeactiveTypeList: async(req,res)=>{
        
        try {
            let query = req.query
            let id = req.query.id
            let checkExist = await eventService.getLeaveTypeById(id)
            if(checkExist){
                let deleteResponse = await eventService.makeActiveDeactiveEventType(query)
                if(deleteResponse){
                    return res.status(200).json({
                        statusCode:200,
                        success:true,
                        message:"event type has been deleted successfully.",
                    });
                }
            }else{
                let message = "event type does not exist!";
                return errorResponse(res,500,false,message);
            }
            
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    
}