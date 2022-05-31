
const errorResponse = require("../../services/errorResponse.service");
const successResponse = require("../../services/successResponse.service");
const userService = require("../../services/user.service")
const collect = require('collect.js');

module.exports = {
    
    userAttendence: async(req,res) =>{
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

        let userAttResponse = await userService.AttendencePerUser(userId)
        collect(userAttResponse).dd()
    },
};
