const { json } = require("express/lib/response");
const {create}= require("../../services/users/user.service");
const config = require('../../../config/config');
const jwt = require('jsonwebtoken');

const collect = require('collect.js');

const bcrypt = require('bcrypt');

const token = jwt.sign({ sub: 1 }, config.secret, { expiresIn: '7d' });
// let collection = collect(token);
// collection.dd();
module.exports = {
    createUser: (req,res)=>{
    
        const body = req.body;
        // const salt = bcrypt.genSaltSync();
        // body.password = bcrypt.hashSync(req.body.password, salt);
        
        create(body,token,(err,results)=>{
            
            if(err){
                return res.status(500).json({
                    success:0,
                    message:"Database connection  failed"
                });
            }
            return res.status(200).json({
                success:201,
                message:"success",
                data:body,
                token: token
            });
        });
    }

};