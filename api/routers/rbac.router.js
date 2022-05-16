const router = require("express").Router()
const role = require("../controllers/rbac/role.controller")
const permission = require("../controllers/rbac/permission.controller")
const rolePermission = require("../controllers/rbac/role_permission.controller")
const assignRole = require("../controllers/rbac/assign_role.controller")
const userMiddleware = require('../middleware/auth')

//Route for  roles 
router.post('/role/store',userMiddleware.isAdmin,role.createRole)
router.get('/role/list',userMiddleware.isAdmin,role.getAllRole)
router.post('/role/edit',userMiddleware.isAdmin,role.roleEdit)
router.get('/role/view',userMiddleware.isAdmin,role.viewRoleById)
router.put('/role/update-status',userMiddleware.isAdmin,role.changeStatus)
// router.delete('/role/delete',userMiddleware.isAdmin,deleteRole)

 //Route for permissions 
router.post('/permission/store', userMiddleware.isAdmin, permission.storePermission)
router.get('/permission/list', userMiddleware.isAdmin, permission.permissionList)
router.get('/permission/get-by-id', userMiddleware.isAdmin, permission.permissionViewById)
router.post('/permission/edit', userMiddleware.isAdmin, permission.permissionEdit)
router.put('/permission/update-status', userMiddleware.isAdmin, permission.permissionUpdateStatus)

// //Rout role permisssion
router.get('/allow-role-permission',userMiddleware.isAdmin,rolePermission.ListRolePermission);
router.post('/allow-role-permission/store',userMiddleware.isAdmin,rolePermission.storeRolePermission);
router.get('/allow-role-permission/view',userMiddleware.isAdmin,rolePermission.viewRolePermission);
router.post('/allow-role-permission/edit',userMiddleware.isAdmin,rolePermission.editRolePermission);
router.put('/allow-role-permission/update-status',userMiddleware.isAdmin,rolePermission.updateStatusRolePermission);
// router.delete('/allow-role-permission/delete',userMiddleware.isAdmin,deleteAllowRolePermission);


// //Route for assign role of users
router.post("/assign-role/assign", userMiddleware.isAdmin,assignRole.assignRoleToUser)
router.get("/assign-role/edit-role", userMiddleware.isAdmin,assignRole.editAssignRole)
// router.delete("/remove-role", userMiddleware.isAdmin,removeRole)


module.exports = router; 