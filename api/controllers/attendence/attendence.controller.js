
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
    
            // let result = await userService.AttendencePerUser(userId)
            // collect(results).dd()
            // var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            // var arrpush = [];
            let array = {
                "data": [{
                        "id": 1,
                        "user_id": 8,
                        "timestamp": "2022-05-20T10:25:01.000Z",
                        "status": 1
                    },
                    {
                        "id": 18,
                        "user_id": 8,
                        "timestamp": "2022-05-20T11:07:12.000Z",
                        "status": 2
                    },
                    {
                        "id": 19,
                        "user_id": 8,
                        "timestamp": "2022-06-01T11:07:12.000Z",
                        "status": 1
                    },
                    {
                        "id": 20,
                        "user_id": 8,
                        "timestamp": "2022-06-01T11:07:12.000Z",
                        "status": 2
                    },
                    {
                        "id": 21,
                        "user_id": 8,
                        "timestamp": "2022-06-03T11:07:12.000Z",
                        "status": 1
                    },
                    {
                        "id": 22,
                        "user_id": 8,
                        "timestamp": "2022-06-03T11:07:12.000Z",
                        "status": 2
                    },
                    {
                        "id": 23,
                        "user_id": 8,
                        "timestamp": "2022-06-04T11:07:12.000Z",
                        "status": 1
                    },
                    {
                        "id": 24,
                        "user_id": 8,
                        "timestamp": "2022-06-04T11:07:12.000Z",
                        "status": 2
                    },
                    {
                        "id": 25,
                        "user_id": 8,
                        "timestamp": "2022-06-06T11:07:12.000Z",
                        "status": 1
                    },
                    {
                        "id": 26,
                        "user_id": 8,
                        "timestamp": "2022-06-06T11:07:12.000Z",
                        "status": 2
                    },
                    {
                        "id": 27,
                        "user_id": 8,
                        "timestamp": "2022-06-06T11:07:12.000Z",
                        "status": 2
                    },
                    {
                        "id": 28,
                        "user_id": 8,
                        "timestamp": "2022-06-06T11:07:12.000Z",
                        "status": 1
                    },
                    {
                        "id": 29,
                        "user_id": 8,
                        "timestamp": "2022-06-06T11:07:12.000Z",
                        "status": 2
                    },
                    {
                        "id": 30,
                        "user_id": 8,
                        "timestamp": "2022-06-07T04:47:02.000Z",
                        "status": 1
                    },
                    {
                        "id": 31,
                        "user_id": 8,
                        "timestamp": "2022-06-07T04:47:02.000Z",
                        "status": 2
                    },
                    {
                        "id": 32,
                        "user_id": 8,
                        "timestamp": "2022-06-07T04:47:02.000Z",
                        "status": 1
                    },
                    {
                        "id": 33,
                        "user_id": 8,
                        "timestamp": "2022-06-07T04:47:02.000Z",
                        "status": 2
                    },
                    {
                        "id": 34,
                        "user_id": 8,
                        "timestamp": "2022-06-07T04:47:02.000Z",
                        "status": 1
                    },
                    {
                        "id": 35,
                        "user_id": 8,
                        "timestamp": "2022-06-07T04:47:02.000Z",
                        "status": 2
                    },
                    
                    {
                        "id": 38,
                        "user_id": 8,
                        "timestamp": "2022-06-08T04:47:02.000Z",
                        "status": 1
                    },
                    {
                        "id": 39,
                        "user_id": 8,
                        "timestamp": "2022-06-08T04:47:02.000Z",
                        "status": 2
                    },
                    {
                        "id": 40,
                        "user_id": 8,
                        "timestamp": "2022-06-08T04:47:02.000Z",
                        "status": 1
                    },
                    {
                        "id": 41,
                        "user_id": 8,
                        "timestamp": "2022-06-08T04:47:02.000Z",
                        "status": 2
                    },
                    {
                        "id": 42,
                        "user_id": 8,
                        "timestamp": "2022-06-08T04:47:02.000Z",
                        "status": 1
                    },
                    {
                        "id": 43,
                        "user_id": 8,
                        "timestamp": "2022-06-08T04:47:02.000Z",
                        "status": 2
                    }
                ]
            }
            // if(result){
                var results = array.data
                var arrayPush = []
                results.forEach((ele, index, array) => {
                 
                    let status = ele.status
                    var data;
                    var datetime = ele.timestamp
                    var dateSplit = datetime.split('T')
                    var checkoutObj = (results[index+1]!=undefined)?results[index+1]:'';
                    if(status == 1){        
                        data = {
                        "date": dateSplit[0],
                            "checkin": datetime,
                        "checkout": (checkoutObj)?checkoutObj.timestamp:'',
                            "hours": "4:34:10",
                            "attendence": "present"
                        }
                        arrayPush.push(data)
                    }
                });

                // results.forEach((ele, index, array) => {
                //     var session = ele.dd1

                //     var hours = 0;
                //     var checkinSplit = ele.checkin.split(',');
                //     var checkoutSplit  = ele.checkout.split(',');
                //     // let date = new Date();
                //     let dayName = session.toLocaleString(undefined, { weekday:'long'});
                //     let checkIndex = weekday.indexOf(dayName)
                //     var attendence = ''

                //     if(checkIndex !== -1){
                //         attendence = "present"
                //     }else{
                //         attendence = "absent"
                //     }
                //     for(let i=0;i<checkinSplit.length;i++){
                //         if(checkoutSplit[i]!=undefined){
                //             // seconds = Math.floor((date1 - (date2))/1000);
                //             // minutes = Math.floor(seconds/60);
                //             // hours = Math.floor(minutes/60);
                //             let seconds = Math.floor((new Date(checkoutSplit[i]) - new Date(checkinSplit[i]))/1000);
                //             let minutes = Math.floor(seconds/60);
                //             hours += Math.floor(minutes/60);
                //         }
                //     }

                //     let entry = {
                //         date: session,
                //         checkin: checkinSplit[0],
                //         checkout: checkoutSplit.at(-1),
                //         hours: hours+':00:00',
                //         attendence: "present",
                //         day: dayName
                //     }
                    
                //     //completeArr.push("date"+":"+session,"checkinTime"+":"+checkinSplit[0],"checkoutTime"+":"+checkoutSplit.at(-1));
                //     //let completeObj = {...completeArr};
                //     arrpush.push(entry);
                //     // console.log(arrpush);
                // });
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"users attendence",
                    data: arrayPush,
                });
            // }else{
            //     const message = "Something went wrong!";
            //     return errorResponse(res,500,false,message);
            // }
            
        } catch (error) {
            const message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    },

    listAttendence : async(req,res)=>{

        try {
    
            // let result = await userService.getAttendenceList()
            // var arrpush = [];
            // if(result){
                let array = {
                    "data": [{
                            "id": 1,
                            "user_id": 8,
                            "timestamp": "2022-05-20T10:25:01.000Z",
                            "status": 1
                        },
                        {
                            "id": 18,
                            "user_id": 8,
                            "timestamp": "2022-05-20T11:07:12.000Z",
                            "status": 2
                        },
                        {
                            "id": 19,
                            "user_id": 8,
                            "timestamp": "2022-06-01T11:07:12.000Z",
                            "status": 1
                        },
                        {
                            "id": 20,
                            "user_id": 8,
                            "timestamp": "2022-06-01T11:07:12.000Z",
                            "status": 2
                        },
                        {
                            "id": 21,
                            "user_id": 8,
                            "timestamp": "2022-06-03T11:07:12.000Z",
                            "status": 1
                        },
                        {
                            "id": 22,
                            "user_id": 8,
                            "timestamp": "2022-06-03T11:07:12.000Z",
                            "status": 2
                        },
                        {
                            "id": 23,
                            "user_id": 8,
                            "timestamp": "2022-06-04T11:07:12.000Z",
                            "status": 1
                        },
                        {
                            "id": 24,
                            "user_id": 8,
                            "timestamp": "2022-06-04T11:07:12.000Z",
                            "status": 2
                        },
                        {
                            "id": 25,
                            "user_id": 8,
                            "timestamp": "2022-06-06T11:07:12.000Z",
                            "status": 1
                        },
                        {
                            "id": 26,
                            "user_id": 8,
                            "timestamp": "2022-06-06T11:07:12.000Z",
                            "status": 2
                        },
                        {
                            "id": 27,
                            "user_id": 8,
                            "timestamp": "2022-06-06T11:07:12.000Z",
                            "status": 2
                        },
                        {
                            "id": 28,
                            "user_id": 8,
                            "timestamp": "2022-06-06T11:07:12.000Z",
                            "status": 1
                        },
                        {
                            "id": 29,
                            "user_id": 8,
                            "timestamp": "2022-06-06T11:07:12.000Z",
                            "status": 2
                        },
                        {
                            "id": 30,
                            "user_id": 8,
                            "timestamp": "2022-06-07T04:47:02.000Z",
                            "status": 1
                        },
                        {
                            "id": 31,
                            "user_id": 8,
                            "timestamp": "2022-06-07T04:47:02.000Z",
                            "status": 2
                        },
                        {
                            "id": 32,
                            "user_id": 8,
                            "timestamp": "2022-06-07T04:47:02.000Z",
                            "status": 1
                        },
                        {
                            "id": 33,
                            "user_id": 8,
                            "timestamp": "2022-06-07T04:47:02.000Z",
                            "status": 2
                        },
                        {
                            "id": 34,
                            "user_id": 8,
                            "timestamp": "2022-06-07T04:47:02.000Z",
                            "status": 1
                        },
                        {
                            "id": 35,
                            "user_id": 8,
                            "timestamp": "2022-06-07T04:47:02.000Z",
                            "status": 2
                        },
                        
                        {
                            "id": 38,
                            "user_id": 8,
                            "timestamp": "2022-06-08T04:47:02.000Z",
                            "status": 1
                        },
                        {
                            "id": 39,
                            "user_id": 8,
                            "timestamp": "2022-06-08T04:47:02.000Z",
                            "status": 2
                        },
                        {
                            "id": 40,
                            "user_id": 8,
                            "timestamp": "2022-06-08T04:47:02.000Z",
                            "status": 1
                        },
                        {
                            "id": 41,
                            "user_id": 8,
                            "timestamp": "2022-06-08T04:47:02.000Z",
                            "status": 2
                        },
                        {
                            "id": 42,
                            "user_id": 8,
                            "timestamp": "2022-06-08T04:47:02.000Z",
                            "status": 1
                        },
                        {
                            "id": 43,
                            "user_id": 8,
                            "timestamp": "2022-06-08T04:47:02.000Z",
                            "status": 2
                        }
                    ]
                }
                var results = array.data
                var arrayPush = []
                results.forEach((ele, index, array) => {
                 
                    let status = ele.status
                    var data;
                    var datetime = ele.timestamp
                    var dateSplit = datetime.split('T')
                    var checkoutObj = (results[index+1]!=undefined)?results[index+1]:'';
                    if(status == 1){        
                        data = {
                        "date": dateSplit[0],
                            "checkin": datetime,
                        "checkout": (checkoutObj)?checkoutObj.timestamp:'',
                            "hours": "4:34:10",
                            "attendence": "present"
                        }
                        arrayPush.push(data)
                    }
                });
                // results.forEach((ele, index, array) => {
                //     var session = ele.dd1

                //     var hours = 0;
                //     var checkinSplit = ele.checkin.split(',');
                //     var checkoutSplit  = ele.checkout.split(',');
            
                //     for(let i=0;i<checkinSplit.length;i++){
                //         if(checkoutSplit[i]!=undefined){
                          
                //             let seconds = Math.floor((new Date(checkoutSplit[i]) - new Date(checkinSplit[i]))/1000);
                //             let minutes = Math.floor(seconds/60);
                //             hours += Math.floor(minutes/60);
                //         }
                //     }

                //     let entry = {
                //         date: session,
                //         checkin: checkinSplit[0],
                //         checkout: checkoutSplit.at(-1),
                //         hours: hours+':00:00',
                //         attendence: "present",
                //     }
                    
                //     arrpush.push(entry);
                // });
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"users attendence",
                    data: arrayPush,
                });
            // }else{
            //     const message = "Something went wrong!";
            //     return errorResponse(res,500,false,message);
            // }
            
        } catch (error) {
            const message = "Something went wrong!";
            return errorResponse(res,500,false,message);
        }
    }
};
