const route = require('express').Router();
const auth_middleware = require('../middlewares/auth.middleware');
const user_controller =require('../controllers/user.controller')

route.get('/user', auth_middleware.verifyToken,user_controller.getUser);
route.get('/users',auth_middleware.verifyToken,user_controller.getAllUsers)
route.patch('/user',auth_middleware.verifyToken,user_controller.updateUser);
route.delete('/user',auth_middleware.verifyToken,user_controller.deleteUser);

module.exports = route;