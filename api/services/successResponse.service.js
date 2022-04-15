const express = require('express');
const { json } = require("express/lib/response");
const collect = require('collect.js');


function success(res,statusCode,success,message,data){
    // let collection = collect(res);
    // collection.dd();
    return res.status(statusCode).json({
        statusCode:200,
        success:success,
        message:message,
        data:data,
    });
}

module.exports = success;