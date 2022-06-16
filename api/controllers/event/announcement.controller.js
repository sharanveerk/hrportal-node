const eventService = require("../../services/event.service")
const errorResponse = require("../../services/errorResponse.service")
const express = require('express')
const collect = require('collect.js');

module.exports = {

    storeAnnouncement: async(req,res)=>{
        try {
            let body = req.body
            if(body.title == null && body.description == null){
                let message = "all field is required!";
                return errorResponse(res,500,false,message);
            }else{
                let storeResponse = await eventService.createTAnnouncement(body)
                if(storeResponse){
                    return res.status(201).json({
                        statusCode:201,
                        success:true,
                        message:"Announcement has been saved successfully.",
                    });
                }
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    listAnnouncement: async(req,res)=>{
        try {
            let listResponse = await eventService.getAnnouncement()
            if(listResponse){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"Announcement has been fetched successfully.",
                    data: listResponse
                });
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    viewAnnouncement: async(req,res)=>{
        try {
            let id = req.query.id
            let viewResponse = await eventService.getAnnouncementById(id)
            if(viewResponse){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"Announcement has been fetched successfully.",
                    data: viewResponse
                });
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    editAnnouncement: async(req,res)=>{

        try {
            let body = req.body
            let viewResponse = await eventService.getAnnouncementById(body.id)
            if(viewResponse){
                if(body.title == null && body.description == null){
                    let message = "all field is required!";
                    return errorResponse(res,500,false,message);
                }else{
                    let storeResponse = await eventService.updateAnnouncement(body)
                    if(storeResponse){
                        return res.status(201).json({
                            statusCode:201,
                            success:true,
                            message:"Announcement has been updated successfully.",
                        });
                    }
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
    deleteAnnouncement: async(req,res)=>{
        try {
            let id = req.query.id
            let deleteResponse = await eventService.deleteAnnouncementById(id)
            if(deleteResponse){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"Announcement has been deleted successfully.",
                });
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    }
}