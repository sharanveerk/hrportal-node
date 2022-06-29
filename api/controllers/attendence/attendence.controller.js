
const errorResponse = require("../../services/errorResponse.service");
const successResponse = require("../../services/successResponse.service");
const userService = require("../../services/user.service")
const collect = require('collect.js');

module.exports = {
    
    userAttendence: async(req,res) =>{

        try {

            const userId = req.userData.userId
            const filterData = req.query
            var filters = '';
            switch (filterData.filter) {
                case "day":
                    var filters = "one day"
                    break;
                case "week":
                    var filters = "one week"
                    break;
                case "month":
                    var filters = "one month"
                    break;
                case "three_month":
                    var filters = "three month"
                    break;
                case "six_month":
                    var filters = "six month"
                    break;
                case "year":
                    var filters = "one year"
                    break;
                default:
                    var filters = "default all records"
                    break;
            }
            // collect(filters).dd()
    
            let results = await userService.AttendencePerUser(userId)
            var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            var arrpush = [];
            if(results){
                results.forEach((ele, index, array) => {
                    var session = ele.dd1

                    var hours = 0;
                    var checkinSplit = ele.checkin.split(',');
                    var checkoutSplit  = ele.checkout.split(',');
                    // let date = new Date();
                    let dayName = session.toLocaleString(undefined, { weekday:'long'});
                    let checkIndex = weekday.indexOf(dayName)
                    var attendence = ''

                    if(checkIndex !== -1){
                        attendence = "present"
                    }else{
                        attendence = "absent"
                    }
                    for(let i=0;i<checkinSplit.length;i++){
                        if(checkoutSplit[i]!=undefined){
                            // seconds = Math.floor((date1 - (date2))/1000);
                            // minutes = Math.floor(seconds/60);
                            // hours = Math.floor(minutes/60);
                            let seconds = Math.floor((new Date(checkoutSplit[i]) - new Date(checkinSplit[i]))/1000);
                            let minutes = Math.floor(seconds/60);
                            hours += Math.floor(minutes/60);
                        }
                    }

                    let entry = {
                        date: session,
                        checkin: checkinSplit[0],
                        checkout: checkoutSplit.at(-1),
                        hours: hours+':00:00',
                        attendence: "present",
                        day: dayName
                    }
                    
                    //completeArr.push("date"+":"+session,"checkinTime"+":"+checkinSplit[0],"checkoutTime"+":"+checkoutSplit.at(-1));
                    //let completeObj = {...completeArr};
                    arrpush.push(entry);
                    // console.log(arrpush);
                });
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"users attendence",
                    data: arrpush,
                });
            }else{
                const message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
            
        } catch (error) {
            const message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },

    listAttendence : async(req,res)=>{

        try {
    
            let results = await userService.getAttendenceList()
            var arrpush = [];
            if(results){
                results.forEach((ele, index, array) => {
                    var session = ele.dd1

                    var hours = 0;
                    var checkinSplit = ele.checkin.split(',');
                    var checkoutSplit  = ele.checkout.split(',');
            
                    for(let i=0;i<checkinSplit.length;i++){
                        if(checkoutSplit[i]!=undefined){
                          
                            let seconds = Math.floor((new Date(checkoutSplit[i]) - new Date(checkinSplit[i]))/1000);
                            let minutes = Math.floor(seconds/60);
                            hours += Math.floor(minutes/60);
                        }
                    }

                    let entry = {
                        date: session,
                        checkin: checkinSplit[0],
                        checkout: checkoutSplit.at(-1),
                        hours: hours+':00:00',
                        attendence: "present",
                    }
                    
                    arrpush.push(entry);
                });
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"users attendence",
                    data: arrpush,
                });
            }else{
                const message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
            
        } catch (error) {
            const message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    }
};
