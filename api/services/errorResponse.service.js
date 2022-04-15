const express = require('express');
const { json } = require("express/lib/response");


function error(res,statusCode,success,message){

    return res.status(statusCode).json({
        statusCode:statusCode,
        success:success,
        message:message

    });
}

module.exports = error;