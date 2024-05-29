const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../Auth')

 
const user = require('../controllers/userController')
 
router.post('/login',user.login)
router.post('/register',user.register)
router.get('/allusers/:id',user.getAllUsers)
router.post('/setavatar/:id',user.setAvatar)
router.get("/logout/:id", user.logOut);


module.exports = router;