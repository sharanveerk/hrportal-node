const eventService = require("../../services/event.service")
const errorResponse = require("../../services/errorResponse.service")
const express = require('express')
const collect = require('collect.js');

module.exports = {

    storeEvent: async(req,res)=>{
        try {
            let body = req.body
            if(body.title == null || body.event_type_id == null){
                let message = "event type name field does not empty!";
                return errorResponse(res,500,false,message);
            }else{
                var imageUrl=null
                if(req.file){
                    var host = req.get('host');
                    imageUrl = `${host}/events/${req.file.filename}`

                    let imageAcceptedType = req.file.mimetype
                    if(imageAcceptedType){
                        if(imageAcceptedType == "image/png" || imageAcceptedType == "image/jpeg" || imageAcceptedType == "image/jpg" ){
                        
                            let checkEventTypeExist = await eventService.getLeaveTypeById(body.event_type_id)
                            if(checkEventTypeExist){
            
                                let storeResponse = await eventService.createEvent(body,imageUrl)
                                if(storeResponse){
                                    return res.status(201).json({
                                        statusCode:201,
                                        success:true,
                                        message:"event has been saved successfully.",
                                    });
                                }
            
                            }else{
                                let message = "event type name does not empty exist!";
                                return errorResponse(res,500,false,message); 
                            }
                        }else{
                            let message = "Only .png, .jpg and .jpeg format allowed!";
                            return errorResponse(res,500,false,message);
                        }
                    }
                }else{   
                    let checkEventTypeExist = await eventService.getLeaveTypeById(body.event_type_id)
                    if(checkEventTypeExist){
    
                        let storeResponse = await eventService.createEvent(body,imageUrl)
                        if(storeResponse){
                            return res.status(201).json({
                                statusCode:201,
                                success:true,
                                message:"event has been saved successfully.",
                            });
                        }
    
                    }else{
                        let message = "event type name does not empty exist!";
                        return errorResponse(res,500,false,message); 
                    }
                }
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },

    viewEvent: async(req,res)=>{
        try {
            let id = req.query.id
            if(id){
                let checkId = await eventService.getEventById(id)
                if(checkId){
                    return res.status(200).json({
                        statusCode:200,
                        success:true,
                        message:"event has been fetched successfully.",
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
    listEvent: async(req,res)=>{
        try {
            let response = await eventService.getLeaveList()
            if(response){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"event has been fetched successfully.",
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
    editEvent: async(req,res)=>{
        
        try {
            let body = req.body
            if(body.title == null || body.event_type_id == null){
                let message = "event type name field does not empty!";
                return errorResponse(res,500,false,message);
            }else{
                let checkEventTypeExist = await eventService.getLeaveTypeById(body.event_type_id)
                if(checkEventTypeExist){

                    var imageUrl=null
                    if(req.file){

                        var host = req.get('host');
                        imageUrl = `${host}/events/${req.file.filename}`

                        let imageAcceptedType = req.file.mimetype
                        if(imageAcceptedType){

                            if(imageAcceptedType == "image/png" || imageAcceptedType == "image/jpeg" || imageAcceptedType == "image/jpg" ){
                                let storeResponse = await eventService.updateEvent(body,imageUrl)
                                if(storeResponse){
                                    return res.status(201).json({
                                        statusCode:201,
                                        success:true,
                                        message:"event has been updated successfully.",
                                    });
                                }
                            }else{
                                let message = "Only .png, .jpg and .jpeg format allowed!";
                                return errorResponse(res,500,false,message);
                            }

                        }
                    }else{  

                        let storeResponse = await eventService.updateEvent(body,imageUrl)
                        if(storeResponse){
                            return res.status(201).json({
                                statusCode:201,
                                success:true,
                                message:"event has been updated successfully.",
                            });
                        }

                    }
                }else{
                    let message = "event type name does not exist!";
                    return errorResponse(res,500,false,message); 
                }
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },

    deleteEvent: async(req,res)=>{
        try {
            let id = req.query.id
            let checkEvent = await eventService.getEventById(id)
            if(checkEvent){
                let deleteResponse = await eventService.deleteEventById(id)
                if(deleteResponse){
                    return res.status(200).json({
                        statusCode:200,
                        success:true,
                        message:"event has been deleted successfully.",
                        data:checkId
                    });
                }
            }else{
                let message = "event id does not exist!";
                return errorResponse(res,500,false,message);
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    }
    
}