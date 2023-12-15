const router = require('express').Router();
var UserTypeController =require('../../controllers/user/userType') 


router.route('/')
.post(UserTypeController.createUserTypeController)
.get(UserTypeController.getAllUserTypeController)

router.route('/:id')
// .get(UserTypeController.getClassByIdController)
.put(UserTypeController.updateUserTypeController)
.delete(UserTypeController.deleteUserTypeController);



module.exports = router;