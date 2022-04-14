const express = require('express');
const { json } = require("express/lib/response");
const collect = require('collect.js');
function error(res,statusCode,success,message){
    // let collection = collect(statusCode);
    // collection.dd();
    return res.status(statusCode).json({
        statusCode:success,
        success:false,
        message:message
    });

    
}
module.exports = error();