const express = require('express');
const { json } = require("express/lib/response");


function success(res,statusCode,success,message,data){

    return res.status(statusCode).json({
        statusCode:statusCode,
        success:success,
        message:message,
        data:data,
    });
}

module.exports = success;