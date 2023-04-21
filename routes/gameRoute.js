const gameCntrl = require('../controllers/gameController')
const express = require('express');
const {verifyUser} = require('../middleware/authMiddleware')

const router = express.Router();

router.get('/history',verifyUser,gameCntrl.gameHistory);
router.post('/creategame',verifyUser,gameCntrl.createGame);

 module.exports= router;