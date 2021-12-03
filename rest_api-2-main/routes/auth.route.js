const route = require('express').Router();
const auth_controller = require('../controllers/auth.controller');
const auth_middleware = require('../middlewares/auth.middleware');

route.post('/register', auth_controller.Register);
route.post('/login', auth_controller.Login);
route.post('/token', auth_middleware.verifyRefreshToken, auth_controller.GetAccessToken);
route.get('/logout', auth_middleware.verifyToken, auth_controller.Logout);

module.exports = route;