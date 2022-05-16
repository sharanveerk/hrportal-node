const router = require("express").Router()
const role = require("../controllers/rbac/role.controller")
const permission = require("../controllers/rbac/permission.controller")
const collect = require('collect.js')
const userMiddleware = require('../middleware/auth')
// let collection = collect(permission.storePermission);
// collection.dd();



// router.get("/fetch-users", fetchAllUser)


//Route for  roles 
router.post('/role/store',userMiddleware.isAdmin,role.createRole)
router.get('/role/list',userMiddleware.isAdmin,role.getAllRole)
router.post('/role/edit',userMiddleware.isAdmin,role.roleEdit)
router.get('/role/view',userMiddleware.isAdmin,role.viewRoleById)
router.put('/role/update-status',userMiddleware.isAdmin,role.changeStatus)
// router.delete('/role/delete',userMiddleware.isAdmin,deleteRole)

// //Route for permissions 
router.post('/permission/store', userMiddleware.isAdmin, permission.storePermission)
router.get('/permission/list', userMiddleware.isAdmin, permission.permissionList)
router.get('/permission/get-by-id', userMiddleware.isAdmin, permission.permissionViewById)
router.post('/permission/edit', userMiddleware.isAdmin, permission.permissionEdit)
router.put('/permission/update-status', userMiddleware.isAdmin, permission.permissionUpdateStatus)

// //Route allow role permisssion
// router.get('/allow-role-permission',userMiddleware.isAdmin,allowRolePermission);
// router.post('/allow-role-permission/store',userMiddleware.isAdmin,storeAllowRolePermission);
// router.post('/allow-role-permission/edit',userMiddleware.isAdmin,editAllowRolePermission);
// router.get('/allow-role-permission/view',userMiddleware.isAdmin,viewAllowRolePermission);
// router.delete('/allow-role-permission/delete',userMiddleware.isAdmin,deleteAllowRolePermission);

// //Route for assign role of users
// router.post("/assign", userMiddleware.isAdmin,assignRole)
// router.get("/edit-role", userMiddleware.isAdmin,editRole)
// router.delete("/remove-role", userMiddleware.isAdmin,removeRole)


module.exports = router; 