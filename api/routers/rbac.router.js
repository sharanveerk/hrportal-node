const router = require("express").Router()
const role = require("../controllers/rbac/role.controller")
const collect = require('collect.js')
const userMiddleware = require('../middleware/auth')
// let collection = collect(User.createUser);
// collection.dd();



// router.get("/fetch-users", fetchAllUser)


//Route for  roles 
router.post('/role/store',userMiddleware.isAdmin,role.createRole)
router.get('/role/list',userMiddleware.isAdmin,role.getAllRole)
router.post('/role/edit',userMiddleware.isAdmin,role.roleEdit)
router.get('/role/view',userMiddleware.isAdmin,role.viewRoleById)

// router.delete('/role/delete',userMiddleware.isAdmin,deleteRole)

// //Route for permissions 
// router.post('/permission/store', userMiddleware.isAdmin, permissionStore);
// router.get('/permission/get-by-id', userMiddleware.isAdmin, viewPermissionById);
// router.get('/permission/list', userMiddleware.isAdmin, listPermission);
// router.post('/permission/edit', userMiddleware.isAdmin, editPermission);
// router.delete('/permission/delete', userMiddleware.isAdmin, deletePermission);

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