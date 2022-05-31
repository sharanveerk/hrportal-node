// const errorResponse = require("../../services/errorResponse.service");
// const successResponse = require("../../services/successResponse.service");
// const collect = require('collect.js');

// module.exports = {
    
//     storeInterview: (req,res) =>{
//         const id = req.userData.userId;
//         // 1 is a check in status value 
//         checkIn(id, 1,(err,results) => {
          
//             if(err){
//                 const message = "Something went wrong!";
//                 return errorResponse(res,500,false,message);
               
//             }
//             return res.status(201).json({
//                 statusCode:201,
//                 success:true,
//                 message:"checkin successfully"
//             });
//         })
//     },
  
// };
