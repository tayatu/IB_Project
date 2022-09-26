const express = require('express');
const router = express.Router();
const {getParticipants} = require('../controllers/participant.controller');

router.get('/getParticipants' , getParticipants);

module.exports = router;