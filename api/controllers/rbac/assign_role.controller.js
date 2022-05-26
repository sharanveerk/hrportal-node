const { json } = require("express/lib/response")
const pool = require("../../../config/database")
const config = require("../../../config/config")
const rbacServices = require("../../services/rbac.service")
const userService = require("../../services/user.service")
const errorResponse = require("../../services/errorResponse.service")
const successResponse = require("../../services/successResponse.service")

const collect = require('collect.js');

module.exports = {

    assignRoleToUser: async(req,res)=>{
        try {
            
            let body = req.body
            if(body.role_id !== 0 && body.user_id !== 0){
                let checkUserIdExist = await userService.userIdExist(body.user_id)
                if(checkUserIdExist){
                    let checkRoleId = await rbacServices.viewRole(body.role_id)
                    if(checkRoleId){

                        const saveResponse = await rbacServices.assignRoleToUserService(body)
                        if(saveResponse){
                            return res.status(201).json({
                                statusCode:201,
                                success:true,
                                message: "Role has been asssigned successfully.",
                            });   
                        }else{
                            const message = "Something went wrong!";
                            return errorResponse(res,500,false,message); 
                        }
                    }else{
                        const message = "Role id does not exit!";
                        return errorResponse(res,500,false,message); 
                    }
                }else{
                    const message = "User does not exist!";
                    return errorResponse(res,500,false,message); 
                }
            }
        } catch (error) {
            const message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },
    editAssignRole: async(req,res)=>{

        try {
            let body = req.body
            if(body.role_id !== 0 && body.user_id !== 0){
                let checkUserIdExist = await userService.userIdExist(body.user_id)
                if(checkUserIdExist){
                    let checkRoleId = await rbacServices.viewRole(body.role_id)
                    if(checkRoleId){
                        const saveResponse = await rbacServices.assignRoleToUserService(body)
                        if(saveResponse){
                            return res.status(201).json({
                                statusCode:201,
                                success:true,
                                message: "Role has been asssigned successfully.",
                            });   
                        }else{
                            const message = "Something went wrong!";
                            return errorResponse(res,500,false,message);
                        }
                    }else{
                        const message = "Role id does not exist!";
                        return errorResponse(res,500,false,message);
                    }
                }else{
                    const message = "User id does not exist!";
                    return errorResponse(res,500,false,message);
                }        
            }
        } catch (error) {
            const message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    }
}