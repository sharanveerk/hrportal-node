// const jwt = require("jsonwebtoken");
// const collect = require('collect.js');
// const config = require("../../config/config");
// const pool = require("../../config/database");
// module.exports = {
 

//     /**
//      * 
//      * @param {req} req 
//      * @param {res} res 
//      * @param {next} next 
//      * @returns authorized  admin 
//      * check url for admin by auth token 
//      * @author sharanveer kannaujiya
//      */

//     roleBaseAccessController: (req, res, next) => {

//       try {

//             pool.query(
//                 `selects * from roles`,
//                 (error,results)=>{
//                     if(error){
//                         return callback(error)
//                     }
//                     var data = results  
//                 }
//             )
//           //   const token = req.headers.authorization.split(' ')[1];
            
//           //   const decoded = jwt.verify(
//           //       token,
//           //       'SECRETKEY'
//           //       );
//           //       req.userData = decoded;
//           //       let authEmail = decoded.email;
//           //       let  configEmail = config.admin_emmail;
//           //       if(configEmail != authEmail){
//           //         return res.status(401).send({
//           //           msg: 'Not authorized!'
//           //         });
//           //       }
//                 // let collection = collect(adminEmail);
//                 // collection.dd();
//                 next();
//           } catch (err) {
//             return res.status(401).send({
//               msg: 'Your session is not valid!'
//             });
//           }
//     }


// };