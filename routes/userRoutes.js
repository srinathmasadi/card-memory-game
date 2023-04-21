const userCntrl = require('../controllers/userController')
const express = require('express');
const {verifyUser} = require('../middleware/authMiddleware')
const requireAdmin = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/register',userCntrl.addUser);
router.post('/login',userCntrl.logInUser);
router.post('/createAdmin',userCntrl.addAdmin);
router.get('/getresults',verifyUser,requireAdmin,userCntrl.getAllUsers);
module.exports= router;